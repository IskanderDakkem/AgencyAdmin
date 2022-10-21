//**React imports */
import React, { useState } from "react";
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
//---------------------------------------------------------------------------
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
import axios from "../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
function CreateCar({ showCreateCarModal, setShowCreateCarModal }) {
  //--------------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); //**Front errors */
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //--------------------------------------------------------------
  const initialState = {
    name: "",
    logo: "XXXXX",
  };
  const [newBrand, setNewBrand] = useState(initialState);
  const onChangeNewBrand = (event) => {
    const { name, value } = event.target;
    setNewBrand((prev) => ({ ...prev, [name]: value }));
  };
  //--------------------------------------------------------------
  const hanldeSubmitNewCar = async () => {
    setSpinningButton(true);
    setInputErrors((prev) => validate(newBrand));
    //**If object errors is empty: send request */
    if (Object.keys(inputErrors).length === 0) {
      axios
        .post(ApiLinks.Brands.create, newBrand, {})
        .then((res) => {
          //** means the brand was successfully created */
          if (res?.status === 201) {
            //**Empty state */
            setNewBrand(initialState);
            //**Close modal */
            setShowCreateCarModal(false);
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
  const validate = (newBrand) => {
    const errors = {};
    if (newBrand.name.length === 0) {
      errors.name = "Name is required!";
    }
    if (newBrand.logo.length === 0) {
      errors.brand = "Logo is required!";
    }
    return errors;
  };
  //--------------------------------------------------------------
  return (
    <Modal
      backdrop="static"
      centered
      show={showCreateCarModal}
      onHide={() => setShowCreateCarModal(false)}
      animation
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowCreateCarModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Créer une marque</h5>
        <Form>
          <Col /* md={6} */ className="mb-3">
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={newBrand?.name}
                  onChange={onChangeNewBrand}
                  name="name"
                  placeholder="Nom de marque..."
                  required
                  isInvalid={inputErrors.name ? true : false}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {inputErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Logo de marque</Form.Label>
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
          onClick={() => setShowCreateCarModal(false)}
          disabled={spinningButton}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={hanldeSubmitNewCar}
        >
          {spinningButton ? <Spinner animation="border" size="sm" /> : "Créer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCar;
