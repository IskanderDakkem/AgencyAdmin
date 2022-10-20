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
function CreateAgencyUser({
  showCreateAgencyAdminModal,
  setShowCreateAgencyAdminModal,
}) {
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showCreateAgencyAdminModal}
      onHide={() => setShowCreateAgencyAdminModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowCreateAgencyAdminModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Affecter un directeur</h5>
        <Form>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>N° CIN</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Numéro CIN..."
                  required /* isInvalid */
                />
                {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <InputGroup id="email">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Nom..." required />
                {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Prénom</Form.Label>
              <InputGroup id="email">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Prénom ..."
                  required /* isInvalid */
                />
                {/*  <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  /* isInvalid */
                  required
                  placeholder="Email..."
                />
                {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowCreateAgencyAdminModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={() => setShowCreateAgencyAdminModal(false)}
        >
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAgencyUser;
