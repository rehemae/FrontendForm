import React from "react";
import { Modal, ModalBody } from "react-bootstrap";

const ModalTemplate = ({ handleClose }) => {
  return (
    <Modal show onHide={handleClose} centered>
      <ModalBody className="text-center">
        <h5 className="fw-bold">Thank You</h5>
        <i className="bi bi-check-circle text-warning h2"></i>
      </ModalBody>
    </Modal>
  );
};

export default ModalTemplate;
