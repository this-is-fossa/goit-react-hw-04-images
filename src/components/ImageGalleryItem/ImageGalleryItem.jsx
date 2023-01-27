import { GalleryItem, GalleryImg } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ previewUrl, largeUrl, getImgUrl }) => {
  return (
    <GalleryItem>
      <GalleryImg onClick={() => getImgUrl(largeUrl)} src={previewUrl} alt="" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  getImgUrl: PropTypes.func.isRequired,
};
