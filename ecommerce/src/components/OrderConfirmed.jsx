import React from "react";
import { Modal, Button } from "react-bootstrap";

const OrderConfirmation = ({ show, handleClose, errorMessage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage ? (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <p>Your order has been confirmed!</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmation;
