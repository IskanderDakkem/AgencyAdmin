//**React imports */
import React, { useState, useEffect } from "react";
//**Bootstrap imports */
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
  Col,
  Image,
  Spinner,
  Alert,
} from "react-bootstrap";
//**Font awesome import */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
//** Upload img import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
//**Api config */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";
//--------------------------------------------------------------
function UpdateAgency({
  showUpdateAgencyModal,
  setShowUpdateAgencyModal,
  selectedAgency,
}) {
  //--------------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); //**Front errors */
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //--------------------------------------------------------------
  const initialeState = {};
  const [agency, setAgency] = useState({});
  const onChangeUpdateAgencyProfile = (event) => {
    const { name, value } = event.target;
    setAgency((prev) => ({ ...prev, [name]: value }));
  };
  //--------------------------------------------------------------
  const getAgency = async () => {
    await axios
      .get(ApiLinks.Agency.getOne + selectedAgency, {})
      .then((res) => {
        if (res?.status === 200) {
          setAgency((prev) => res?.data?.item);
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
        //**Invalid token */
        if (err?.response?.status === 401) {
          navigate.push(Routes.Signin.path);
        }
        //**404 */
        if (err?.response?.status === 404) {
          navigate.push(Routes.Signin.NotFound);
        }
        //**server error */
        if (err?.response?.status === 500) {
          navigate.push(Routes.Signin.ServerError);
        }
      });
  };
  useEffect(() => {
    if (
      selectedAgency !== null &&
      selectedAgency !== undefined &&
      selectedAgency !== 0
    ) {
      getAgency();
    }
  }, [showUpdateAgencyModal, selectedAgency]);
  //--------------------------------------------------------------
  const updateAgency = async (event) => {
    event.preventDefault();
    setInputErrors(validate(agency));
    setSpinningButton(true);
    if (Object.keys(inputErrors).length === 0) {
      await axios
        .put(ApiLinks.Agency.update + selectedAgency, agency, {})
        .then((res) => {
          //** means the brand was successfully created */
          if (res.status === 200) {
            //**Close modal */
            setShowUpdateAgencyModal(false);
            //**Empty state */
            setAgency(initialeState);
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
          //**Invalid token */
          if (err?.response?.status === 401) {
            navigate.push(Routes.Signin.path);
          }
          //**404 */
          if (err?.response?.status === 404) {
            navigate.push(Routes.Signin.NotFound);
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
          //**server error */
          if (err?.response?.status === 500) {
            navigate.push(Routes.Signin.ServerError);
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
  //----------------------------------------------------------------
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
                  value={agency.libelle}
                  onChange={onChangeUpdateAgencyProfile}
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
                  value={agency?.address}
                  onChange={onChangeUpdateAgencyProfile}
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
                  value={agency?.fullName}
                  onChange={onChangeUpdateAgencyProfile}
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
                  value={agency?.email}
                  onChange={onChangeUpdateAgencyProfile}
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
                  value={agency?.phoneNumber}
                  onChange={onChangeUpdateAgencyProfile}
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
          onClick={() => setShowUpdateAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button variant="success" className="text-white" onClick={updateAgency}>
          {spinningButton ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Mettre à jour"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAgency;
