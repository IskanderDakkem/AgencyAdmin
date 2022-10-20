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
function UpdateAgency({ showUpdateAgencyModal, setShowUpdateAgencyModal }) {
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showUpdateAgencyModal}
      onHide={() => setShowUpdateAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowUpdateAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Mettre à jour l'agence</h5>
        <Form>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Libelle</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Libelle..."
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
              <Form.Label>Adresse</Form.Label>
              <InputGroup id="email">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Adresse..." required />
                {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup id="email">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email ..."
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
              <Form.Label>Numéro des franchises</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  /* isInvalid */ min={0}
                  required
                  placeholder="Numéro des franchises"
                  value={0}
                />
                {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Card border="light" className="bg-white shadow-sm mb-2">
              <Card.Body>
                <h5 className="mb-4">Logo de l'agence</h5>
                <div className="d-xl-flex align-items-center">
                  <div className="user-avatar xl-avatar">
                    <Image fluid rounded src={Profile3} />
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ms-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="me-3"
                          />
                        </span>
                        <input type="file" />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">
                            Choose Image
                          </div>
                          <div className="text-gray small">
                            JPG, GIF or PNG. Max size of 800K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowUpdateAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={() => setShowUpdateAgencyModal(false)}
        >
          Enregistre
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAgency;
