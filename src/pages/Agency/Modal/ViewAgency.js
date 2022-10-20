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
function ViewAgency({ showViewAgencyModal, setShowViewAgencyModal }) {
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showViewAgencyModal}
      onHide={() => setShowViewAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowViewAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">View</h5>
      </Modal.Body>
    </Modal>
  );
}

export default ViewAgency;
