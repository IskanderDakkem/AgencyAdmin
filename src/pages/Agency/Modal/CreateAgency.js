//**React imports */
import React, { useState } from "react";
//**Bootsrap imports */
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
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
//**Assets import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
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
    firstName: "",
    lastName: "",
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
    setInputErrors((prev) => validate(newAgency));
    if (Object.keys(inputErrors).length === 0) {
      await axios
        .post(ApiLinks.create, newAgency, {})
        .then((res) => {
          //** means the brand was successfully created */
          if (res?.status === 201) {
            //**Empty state */
            setNewAgency(initialeState);
            //**Close modal */
            setShowCreateAgencyModal(false);
            //**empty previous back errors */
            setBackErrors({});
          }
        })
        .catch((err) => {
          console.log(err);
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
    setShowCreateAgencyModal(false);
    setSpinningButton(false);
  };
  const validate = (value) => {
    const errors = {};
    if (value.libelle.length === 0) {
      errors.name = "Libelle est requise!";
    }
    if (value.address.length === 0) {
      errors.brand = "Addresse est requise:";
    }
    if (value.firstName.length === 0) {
      errors.brand = "Nom est requise!";
    }
    if (value.lastName.length === 0) {
      errors.brand = "Prénom est requise!";
    }
    if (value.email.length === 0) {
      errors.brand = "Email est requise!";
    }
    if (value.phoneNumber.length === 0) {
      errors.brand = "Numéro de téléphone est requise!";
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
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Libelle</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="libelle"
                  value={newAgency.libelle}
                  onChange={onChangeNewAgency}
                  placeholder="Libelle..."
                  required
                  isInvalid={inputErrors?.libelle.length !== 0 ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors?.libelle}
                </Form.Control.Feedback>
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
        </Form>
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
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAgency;
