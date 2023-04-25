import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };
  render() {
    const { image } = this.props;
    return (
      <li className={css['gallery-item']}>
        <img
          src={image.webformatURL}
          alt=""
          className={css['gallery-item-image']}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal imageURL={image.largeImageURL} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.objectOf(PropTypes.string),
};

export default ImageGalleryItem;
