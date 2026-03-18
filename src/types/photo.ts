// 相册元数据
export interface PhotoMetadata {
  id: string;
  url: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  width?: number;
  height?: number;
}

// 照片集
export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  photos: PhotoMetadata[];
  tags: string[];
  date: string;
}

// 相册索引数据
export interface PhotoIndex {
  albums: PhotoAlbum[];
  allTags: string[];
  totalPhotos: number;
}

// 布局类型
export type LayoutType = 'grid' | 'vertical';

// 筛选条件
export interface FilterOptions {
  selectedTags: string[];
  selectedDate: string | null;
}
