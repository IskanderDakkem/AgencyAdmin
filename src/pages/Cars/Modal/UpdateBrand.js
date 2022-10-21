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
//--------------------------------------------------------------
function UpdateBrand({ showUpdateBrand, setShowUpdateBrand, selectedBrand }) {
  //--------------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); //**Front errors */
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //--------------------------------------------------------------
  const initialeState = {};
  const [updateBrand, setUpdateBrand] = useState(initialeState);
  const onChangeUpdateBrand = (event) => {
    const { name, value } = event.target;
    setUpdateBrand((prev) => ({ ...prev, [name]: value }));
  };
  //--------------------------------------------------------------
  const getBrand = async () => {
    await axios
      .get(ApiLinks.Brands.getOne + selectedBrand, {})
      .then((res) => {
        if (res?.status === 200) {
          setUpdateBrand((prev) => res?.data?.item);
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
        //**Server error */
        if (err?.response?.status === 500) {
          //redirect to server error page
        }
      });
  };
  useEffect(() => {
    if (
      selectedBrand !== null &&
      selectedBrand !== undefined &&
      selectedBrand !== 0
    ) {
      getBrand();
    }
  }, [showUpdateBrand, selectedBrand]);
  //--------------------------------------------------------------
  const handleUpdateBrand = async () => {
    setInputErrors((prev) => validate(updateBrand));
    setSpinningButton(true);
    //**If object errors is empty: send request */
    if (Object.keys(inputErrors).length === 0) {
      axios
        .put(ApiLinks.Brands.update + selectedBrand, updateBrand, {})
        .then((res) => {
          //** means the brand was successfully created */
          if (res?.status === 200) {
            //**Empty state */
            setUpdateBrand(initialeState);
            setBackErrors({});
            //**Close modal */
            setShowUpdateBrand(false);
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
      show={showUpdateBrand}
      onHide={() => setShowUpdateBrand(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowUpdateBrand(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Mettre à jour la marque</h5>
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
                  value={updateBrand?.name}
                  onChange={onChangeUpdateBrand}
                  name="name"
                  placeholder="Nom de marque..."
                  required
                  isInvalid={inputErrors.name ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.name}
                </Form.Control.Feedback>
              </InputGroup>
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
          onClick={() => setShowUpdateBrand(false)}
          disabled={spinningButton}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={handleUpdateBrand}
        >
          {spinningButton ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Mettre à jour la marque"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateBrand;
