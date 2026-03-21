import { PhotoMetadata } from '@/types/photo';

interface MasonryLayoutProps {
  photos: PhotoMetadata[];
  onPhotoClick: (photo: PhotoMetadata) => void;
}

export const GridLayout = ({ photos, onPhotoClick }: MasonryLayoutProps) => {
  return (
    <div className="photo-masonry">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="masonry-item"
          onClick={() => onPhotoClick(photo)}
        >
          <div className="image-wrapper">
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
            />
          </div>
          <div className="photo-overlay">
            <h4>{photo.title}</h4>
            {photo.description && <p>{photo.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
