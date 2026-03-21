import { PhotoMetadata } from '@/types/photo';

interface PhotoViewerProps {
  photo: PhotoMetadata | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const PhotoViewer = ({ photo, onClose, onPrev, onNext }: PhotoViewerProps) => {
  if (!photo) return null;

  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="viewer-image-wrapper">
          <img src={photo.url} alt={photo.title} />
        </div>
        <div className="viewer-info">
          <h3>{photo.title}</h3>
          {photo.description && <p>{photo.description}</p>}
          <div className="viewer-meta">
            <span>{photo.date}</span>
            {photo.tags.length > 0 && (
              <div className="viewer-tags">
                {photo.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {onPrev && (
          <button className="nav-btn prev" onClick={onPrev}>
            ‹
          </button>
        )}
        {onNext && (
          <button className="nav-btn next" onClick={onNext}>
            ›
          </button>
        )}
      </div>
    </div>
  );
};
