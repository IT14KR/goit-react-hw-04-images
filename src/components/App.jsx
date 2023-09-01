import { useState, useEffect } from 'react';
import * as API from '../service/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { AppDiv } from './App.styled';

export const App = () => {
  const [images, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const data = await API.getImages(query, page);

        if (data.hits.length === 0) {
          toast.error('Sorry, there are no images matching your request...');
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);
        setImage(prevImages => [...prevImages, ...normalizedImages]);
        setIsLastPage(page >= Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(error.message);
        toast.error('Sorry, something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      fetchImage();
    }
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImage([]);
    setError(null);
    setIsLastPage(false);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <AppDiv>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>Error: {error}</p>}

      <ImageGallery images={images} onClick={handleImageClick} />

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && !isLastPage && (
        <Button onClick={loadMore} />
      )}

      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </AppDiv>
  );
};
