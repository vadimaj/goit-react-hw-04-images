import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = props => {
  const { gallery } = props;
  return (
    <ul className={css.gallery}>
      {gallery.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
