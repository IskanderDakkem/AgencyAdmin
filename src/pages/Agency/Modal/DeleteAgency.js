import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
  FormCheck,
  Col,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
function DeleteAgency({ showDeleteAgencyModal, setShowDeleteAgencyModal }) {
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showDeleteAgencyModal}
      onHide={() => setShowDeleteAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowDeleteAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Supprimer cette agence ?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowDeleteAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={() => setShowDeleteAgencyModal(false)}
        >
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAgency;
