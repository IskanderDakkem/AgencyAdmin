//**React imports */
import React, { useState } from "react";
//**Bootsrap imports */
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
  Col,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
//**Assets import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
//**Api config imports */
import axios from "../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
//-----------------------------------------------------------------------------
function CreateAgency({ showCreateAgencyModal, setShowCreateAgencyModal }) {
  //--------------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); //**Front errors */
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //--------------------------------------------------------------
  const initialeState = {
    logo: "",
    libelle: "",
    address: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  };
  const [newAgency, setNewAgency] = useState(initialeState);
  const onChangeNewAgency = (event) => {
    const { name, value } = event.target;
    setNewAgency((prev) => ({ ...prev, [name]: value }));
  };
  //--------------------------------------------------------------
  const handleSubmitNewAgency = async (event) => {
    event.preventDefault();
    setSpinningButton(true);
    setInputErrors(validate(newAgency));
    if (Object.keys(inputErrors).length === 0) {
      await axios
        .post(ApiLinks.Agency.create, newAgency, {})
        .then((res) => {
          //** means the brand was successfully created */
          if (res.status === 201) {
            //**Close modal */
            setShowCreateAgencyModal(false);
            //**Empty state */
            setNewAgency(initialeState);
            //**empty previous back errors */
            setBackErrors({});
          }
        })
        .catch((err) => {
          //**Failed to create */
          if (err?.response?.status === 400) {
            setBackErrors((prev) => ({
              ...prev,
              failedToCreate: "une erreur s'est produite",
            }));
          }
          //**Token is invalide */
          if (err?.response?.status === 401) {
            //redirect user to login page
          }
          //**Server returning 404 for any reason */
          if (err?.response?.status === 404) {
            //redirect to not found page
          }
          //**Some entite is missing */
          if (err?.response?.status === 406) {
            setBackErrors((prev) => ({
              ...prev,
              missingSomething:
                "Veuillez fournir toutes les informations requises",
            }));
          }
          //**Already exist */
          if (err?.response?.status === 409) {
            setBackErrors((prev) => ({
              ...prev,
              alreadyExist: "Un nom similaire existe déjà",
            }));
          }
          //**Server error */
          if (err?.response?.status === 500) {
            //redirect to server error page
          }
        });
    }
    setSpinningButton(false);
  };
  const validate = (value) => {
    const errors = {};
    if (!value.libelle) {
      errors.libelle = "Libelle est requise!";
    }
    if (!value.address) {
      errors.address = "Addresse est requise:";
    }
    if (!value.fullName) {
      errors.fullName = "Nom de responsable est requise!";
    }
    if (!value.email) {
      errors.email = "Email est requise!";
    }
    if (!value.phoneNumber) {
      errors.phoneNumber = "Numéro de téléphone est requise!";
    }
    return errors;
  };
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showCreateAgencyModal}
      onHide={() => setShowCreateAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowCreateAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Créer une agence</h5>
        <Form>
          <Col>
            <Form.Group>
              <Form.Label>Logo de l'agence</Form.Label>
              <Card border="light" className="bg-white shadow-sm mb-2">
                <Card.Body>
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
                              Choisissez le logo
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
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Libelle</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="libelle"
                  value={newAgency.libelle}
                  onChange={onChangeNewAgency}
                  placeholder="Libelle..."
                  required
                  isInvalid={inputErrors.libelle ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.libelle}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="address"
                  value={newAgency?.address}
                  onChange={onChangeNewAgency}
                  placeholder="Adresse..."
                  required
                  isInvalid={inputErrors.address ? true : false}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {inputErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Nom de responsable</Form.Label>
              <InputGroup id="email">
                <Form.Control
                  type="text"
                  name="fullName"
                  value={newAgency?.fullName}
                  onChange={onChangeNewAgency}
                  placeholder="Nom ..."
                  required
                  isInvalid={inputErrors.fullName ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.fullName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup id="email">
                <Form.Control
                  type="text"
                  name="email"
                  value={newAgency?.email}
                  onChange={onChangeNewAgency}
                  placeholder="Email ..."
                  required
                  isInvalid={inputErrors.email ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Numéro de téléphone</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={newAgency?.phoneNumber}
                  onChange={onChangeNewAgency}
                  placeholder="+216-XX-XXX-XXX"
                  required
                  isInvalid={inputErrors.phoneNumber ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.phoneNumber}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Form>
        {backErrors.failedToCreate && (
          <Alert variant="danger">{backErrors.failedToCreate}</Alert>
        )}
        {backErrors.missingSomething && (
          <Alert variant="danger">{backErrors.missingSomething}</Alert>
        )}
        {backErrors.alreadyExist && (
          <Alert variant="danger">{backErrors.alreadyExist}</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowCreateAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={handleSubmitNewAgency}
        >
          {spinningButton ? <Spinner animation="border" size="sm" /> : "Créer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAgency;
