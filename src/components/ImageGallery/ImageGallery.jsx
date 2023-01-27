import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { GalleryWraper, GalleryList } from "./ImageGallery.styled";
import PropTypes from "prop-types";

export function ImageGallery({ images, getImgUrl, loader }) {
  return (
    <GalleryWraper>
      <GalleryList>
        {images &&
          images.map((image) => (
            <ImageGalleryItem
              getImgUrl={getImgUrl}
              key={image.id}
              previewUrl={image.webformatURL}
              largeUrl={image.largeImageURL}
            />
          ))}
      </GalleryList>

      {loader && <Loader />}
    </GalleryWraper>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  getImgUrl: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};
