//**React imports */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//**Bootstrap imports */
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
//**Font awesome import */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
//**Api config imports */
import axios from "../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
//**Assets import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
import { Routes } from "../../../routes";
//---------------------------------------------------------------------------
function UpdateSheetModal({
  showUpdateSheetModal,
  setShowUpdateSheetModal,
  selectedSheet,
}) {
  //--------------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); //**Front errors */
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //--------------------------------------------------------------
  const initialeState = {
    avatar: "XX",
    name: "",
    type: "",
    name: "",
    description: "",

    kmAt: null,
    numberMonths: null,
    minKm: null,
    maxKm: null,
  };
  const [newSheet, setSheet] = useState(initialeState);
  const getSheet = async () => {
    setSpinningButton(true);
    await axios
      .get(ApiLinks.Sheet.getOne + selectedSheet, {})
      .then((res) => {
        if (res?.status === 200) {
          setSheet((prev) => res?.data?.item);
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
    setSpinningButton(false);
  };
  useEffect(() => {
    if (
      selectedSheet !== null &&
      selectedSheet !== undefined &&
      selectedSheet !== 0
    ) {
      getSheet();
    }
  }, [showUpdateSheetModal, selectedSheet]);
  const onChangeNewSheet = (event) => {
    const { name, value } = event.target;
    setSheet((prev) => ({ ...prev, [name]: value }));
  };
  //--------------------------------------------------------------
  const handleSubmitUpdateSheet = async (event) => {
    event.preventDefault();
    setSpinningButton(true);
    setInputErrors((prev) => validate(newSheet));
    if (Object.keys(inputErrors).length === 0) {
      await axios
        .put(ApiLinks.Sheet.update + selectedSheet, newSheet, {})
        .then((res) => {
          if (res?.status === 200) {
            //**Empty state */
            setSheet(initialeState);
            //**Close modal */
            setShowUpdateSheetModal(false);
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
              alreadyExist: "Un nom similaire existe d??j??",
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
    if (value.avatar.length === 0) {
      errors.name = "Logo est requise!";
    }
    if (value.name.length === 0) {
      errors.brand = "Nom est requise:";
    }
    if (value.type.length === 0) {
      errors.brand = "Type est requise!";
    }
    if (value.description.length === 0) {
      errors.brand = "Description est requise!";
    }
    return errors;
  };
  //--------------------------------------------------------------
  return (
    <Modal
      backdrop="static"
      centered
      show={showUpdateSheetModal}
      onHide={() => setShowUpdateSheetModal(false)}
      animation
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowUpdateSheetModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Mettre ?? jour cette fiche technique</h5>
        <Form>
          <Col>
            <Form.Group>
              <Form.Label>Icon de fiche</Form.Label>
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
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={newSheet?.name}
                  onChange={onChangeNewSheet}
                  name="name"
                  placeholder="Nom de fiche..."
                  required
                  isInvalid={false}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {inputErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows="3"
                  type="text"
                  value={newSheet?.description}
                  onChange={onChangeNewSheet}
                  name="description"
                  placeholder="Description de fiche technique..."
                  required
                  isInvalid={false}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {inputErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>S??lectionner un type</Form.Label>
              <Form.Select
                name="type"
                value={newSheet?.type}
                onChange={onChangeNewSheet}
              >
                <option disabled defaultValue>
                  Ouvrir ce menu de s??lection
                </option>
                <option disabled value={"1"}>
                  kilom??trage
                </option>
                <option disabled value={"2"}>
                  Nombre de mois
                </option>
                <option disabled value={"3"}>
                  kilom??trage min et max
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
          {newSheet.type.length !== 0 && newSheet.type === "1" ? (
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>kilom??trage</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    value={newSheet?.kmAt}
                    onChange={onChangeNewSheet}
                    name="kmAt"
                    placeholder="kilom??trage..."
                    required
                    isInvalid={false}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {inputErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          ) : newSheet.type === "2" ? (
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Nombre de mois</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    value={newSheet?.numberMonths}
                    onChange={onChangeNewSheet}
                    name="numberMonths"
                    placeholder="Nombre de mois..."
                    required
                    isInvalid={false}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {inputErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          ) : newSheet.type === "3" ? (
            <>
              <Col /* md={6} */ className="mt-3 mb-3">
                <Form.Group>
                  <Form.Label>kilom??trage Minimum</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      value={newSheet?.minKm}
                      onChange={onChangeNewSheet}
                      name="minKm"
                      placeholder="kilom??trage minimum..."
                      required
                      isInvalid={false}
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {inputErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col /* md={6} */ className="mb-3">
                <Form.Group>
                  <Form.Label>kilom??trage Maximum</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      value={newSheet?.maxKm}
                      onChange={onChangeNewSheet}
                      name="maxKm"
                      x
                      placeholder="kilom??trage maximum..."
                      required
                      isInvalid={false}
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {inputErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          ) : null}
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
          onClick={() => setShowUpdateSheetModal(false)}
          disabled={spinningButton}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={handleSubmitUpdateSheet}
        >
          {spinningButton ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Mettre ?? jour"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateSheetModal;
