import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv, ModalDivImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleClick}>
      <ModalDiv>
        <ModalDivImg src={image.largeImageURL} alt={image.tags} />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
