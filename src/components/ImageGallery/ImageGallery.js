import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = props => {
  return (
    <ul className={css.gallery}>
      {props.gallery.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.exact({
      image: PropTypes.objectOf(PropTypes.string).isRequired,
    })
  ),
};

export default ImageGallery;
