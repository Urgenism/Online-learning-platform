import React from "react";
import ReactModal from "react-modal";
import "./Modal.css";

type TProps = {
  showModal: boolean;
  closeModal: () => void;
  modalTitle: string;
};

const Modal: React.FC<TProps> = ({
  showModal,
  closeModal,
  modalTitle,
  children,
}) => {
  return (
    <ReactModal
      isOpen={showModal}
      overlayClassName={
        "modal__overlay"
        /* String className to be applied to the overlay.
         See the `Styles` section for more details. */
      }
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      // contentLabel='Modal'
      ariaHideApp={false}
      className={"modal__content"}
    >
      <div className='modal__title-wrap'>
        <h3 className='modal__title'>{modalTitle}</h3>
        <span role='button' className='modal__btn-close' onClick={closeModal}>
          X
        </span>
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
