import { PhotoMetadata } from '@/types/photo';

interface VerticalLayoutProps {
  photos: PhotoMetadata[];
  onPhotoClick: (photo: PhotoMetadata) => void;
}

export const VerticalLayout = ({ photos, onPhotoClick }: VerticalLayoutProps) => {
  return (
    <div className="photo-vertical">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="vertical-item"
          onClick={() => onPhotoClick(photo)}
        >
          <div className="image-wrapper">
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
            />
          </div>
          <div className="photo-info">
            <h4>{photo.title}</h4>
            {photo.description && <p>{photo.description}</p>}
            <div className="photo-meta">
              <span className="photo-date">{photo.date}</span>
              {photo.tags.length > 0 && (
                <div className="photo-tags">
                  {photo.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
