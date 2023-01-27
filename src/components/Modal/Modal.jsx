import { useEffect } from "react";
import { Overlay, ModalWindow, CloseModalBtn } from "./Modal.styled";
import PropTypes from "prop-types";

export function Modal({ closeModal, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick} tabIndex={0}>
      <ModalWindow>{children}</ModalWindow>

      <CloseModalBtn type="button" onClick={closeModal}>
        X
      </CloseModalBtn>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};
