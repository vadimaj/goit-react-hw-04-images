import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL } = props.image;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <li className={css['gallery-item']}>
      <img
        src={webformatURL}
        alt=""
        className={css['gallery-item-image']}
        onClick={toggleModal}
      />
      {showModal && <Modal imageURL={largeImageURL} onClose={toggleModal} />}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
