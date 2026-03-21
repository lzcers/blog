import { useState, useEffect, useCallback, useMemo } from 'react';
import { PhotoMetadata, PhotoIndex, LayoutType, FilterOptions } from '@/types/photo';
import { InfiniteScroll } from './components/InfiniteScroll';
import { GridLayout } from './components/GridLayout';
import { VerticalLayout } from './components/VerticalLayout';
import { Sidebar } from './components/Sidebar';
import { PhotoViewer } from './components/PhotoViewer';
import './styles.less';

// 从 JSON 索引文件加载数据
const loadPhotoIndex = async (): Promise<PhotoIndex> => {
  const response = await fetch('/data/photos.json');
  if (!response.ok) {
    throw new Error('Failed to load photo index');
  }
  return response.json();
};

export default function Akashic() {
  const [photoIndex, setPhotoIndex] = useState<PhotoIndex | null>(null);
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [layout, setLayout] = useState<LayoutType>('grid');
  const [filter, setFilter] = useState<FilterOptions>({
    selectedTags: [],
    selectedDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);
  const [photoIndexInFiltered, setPhotoIndexInFiltered] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const PAGE_SIZE = 12;

  // 初始化加载数据
  useEffect(() => {
    loadPhotoIndex()
      .then((data) => {
        setPhotoIndex(data);
        // 初始加载第一页
        const initialPhotos = data.albums[0]?.photos.slice(0, PAGE_SIZE) || [];
        setPhotos(initialPhotos);
        setHasMore(initialPhotos.length < (data.albums[0]?.photos.length || 0));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // 获取所有日期
  const allDates = useMemo(() => {
    if (!photoIndex) return [];
    const dates = new Set<string>();
    photoIndex.albums.forEach((album) => {
      album.photos.forEach((photo) => {
        const yearMonth = photo.date.slice(0, 7); // YYYY-MM
        dates.add(yearMonth);
      });
    });
    return Array.from(dates).sort().reverse();
  }, [photoIndex]);

  // 筛选照片
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const tagMatch =
        filter.selectedTags.length === 0 ||
        filter.selectedTags.some((tag) => photo.tags.includes(tag));
      const dateMatch =
        filter.selectedDate === null || photo.date.startsWith(filter.selectedDate);
      return tagMatch && dateMatch;
    });
  }, [photos, filter]);

  // 加载更多照片（分页加载）
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !photoIndex) return;

    setLoading(true);

    // 模拟异步加载
    await new Promise((resolve) => setTimeout(resolve, 300));

    const allAlbumPhotos = photoIndex.albums[0]?.photos || [];
    const nextPage = page + 1;
    const start = nextPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const newPhotos = allAlbumPhotos.slice(start, end);

    if (newPhotos.length > 0) {
      setPhotos((prev) => [...prev, ...newPhotos]);
      setPage(nextPage);
    }

    setHasMore(end < allAlbumPhotos.length);
    setLoading(false);
  }, [page, loading, hasMore, photoIndex]);

  // 点击照片
  const handlePhotoClick = (photo: PhotoMetadata) => {
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    setPhotoIndexInFiltered(index);
    setSelectedPhoto(photo);
  };

  // 上一张/下一张
  const handlePrev = () => {
    if (photoIndexInFiltered > 0) {
      const newIndex = photoIndexInFiltered - 1;
      setPhotoIndexInFiltered(newIndex);
      setSelectedPhoto(filteredPhotos[newIndex]);
    }
  };

  const handleNext = () => {
    if (photoIndexInFiltered < filteredPhotos.length - 1) {
      const newIndex = photoIndexInFiltered + 1;
      setPhotoIndexInFiltered(newIndex);
      setSelectedPhoto(filteredPhotos[newIndex]);
    }
  };

  if (error) {
    return (
      <div className="photo-page">
        <div className="photo-error">
          <p>加载失败: {error}</p>
        </div>
      </div>
    );
  }

  if (!photoIndex) {
    return (
      <div className="photo-page">
        <div className="photo-loading">
          <div className="loading-spinner">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-page">
      <div className="photo-wrapper">
        <div className="photo-main">
          <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          >
            {layout === 'grid' ? (
              <GridLayout photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
            ) : (
              <VerticalLayout photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
            )}
          </InfiniteScroll>
        </div>
        <Sidebar
          totalPhotos={filteredPhotos.length}
          allTags={photoIndex.allTags}
          allDates={allDates}
          layout={layout}
          onLayoutChange={setLayout}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      <PhotoViewer
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={photoIndexInFiltered > 0 ? handlePrev : undefined}
        onNext={photoIndexInFiltered < filteredPhotos.length - 1 ? handleNext : undefined}
      />
    </div>
  );
}
