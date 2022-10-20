import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
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
function CreateBrandModel({ showCreateModel, setShowCreateModel }) {
  const hanldeSubmitNewCar = async () => {};
  return (
    <Modal
      centered
      show={showCreateModel}
      onHide={() => setShowCreateModel(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowCreateModel(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Créer une marque</h5>
        <Form>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nom de marque..."
                  required /* isInvalid */
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
          onClick={() => setShowCreateModel(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={hanldeSubmitNewCar}
        >
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBrandModel;
