import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryUl>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onItemClick={onClick} />
      ))}
    </ImageGalleryUl>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
