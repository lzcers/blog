import { useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll = ({
  onLoadMore,
  hasMore,
  loading,
  children,
}: InfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect]);

  return (
    <div className="infinite-scroll">
      {children}
      <div ref={loadMoreRef} className="load-more-trigger">
        {loading && <div className="loading-spinner">加载中...</div>}
        {!hasMore && <div className="no-more">没有更多照片了</div>}
      </div>
    </div>
  );
};
