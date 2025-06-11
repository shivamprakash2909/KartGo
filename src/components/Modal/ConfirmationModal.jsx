import React from "react";
import "./Modal.css";

const DeleteModal = ({
  isOpen,
  modalTitle,
  modalDescription,
  onCancelClick,
  onConfirmClick,
  confirmBtnText = "Delete",
  confirmBtnType = "danger",
  cancelBtnDisabled = false,
  confirmBtnDisabled = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{modalTitle}</h3>
        </div>
        <div className="modal-body">
          <p>{modalDescription}</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onCancelClick} disabled={cancelBtnDisabled}>
            Cancel
          </button>
          <button className={`confirm-btn ${confirmBtnType}`} onClick={onConfirmClick} disabled={confirmBtnDisabled}>
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
