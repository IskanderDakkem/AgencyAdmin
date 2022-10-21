//**React imports */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//**React imports */
import {
  Form,
  Button,
  Modal,
  InputGroup,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
//**Api config imports */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "../../../routes";
//----------------------------------------------------------------
function CreateBrandModel({
  showCreateModel,
  setShowCreateModel,
  selectedBrand,
}) {
  //----------------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [inputErrors, setInputErrors] = useState("");
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //----------------------------------------------------------------
  const initialeState = "";
  const [model, setModel] = useState(initialeState);
  const onChangeNewModel = (event) => {
    const { value } = event.target;
    setModel((prev) => value);
  };
  //----------------------------------------------------------------
  const SubmitNewBrandModel = async (event) => {
    event.preventDefault();
    setBackErrors({});
    setInputErrors(validate(model));
    setSpinningButton(true);
    if (Object.keys(inputErrors).length === 0) {
      await axios
        .post(ApiLinks.Brands.createModel + selectedBrand, { name: model }, {})
        .then((res) => {
          if (res?.status === 201) {
            setShowCreateModel(false);
            setModel(initialeState);
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
  const validate = (values) => {
    let errors = "";
    if (values.length === 0) {
      errors = "Le nom du modèle est requis";
    }
    return errors;
  };
  //----------------------------------------------------------------
  return (
    <Modal
      backdrop="static"
      centered
      show={showCreateModel}
      onHide={() => setShowCreateModel(false)}
      animation
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
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Nom de modéle..."
                  value={model?.name}
                  onChange={onChangeNewModel}
                  required
                  isInvalid={inputErrors.length > 0 ? true : false}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {inputErrors}
              </Form.Control.Feedback>
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
          onClick={() => setShowCreateModel(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={SubmitNewBrandModel}
        >
          {spinningButton ? <Spinner animation="border" size="sm" /> : "Créer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBrandModel;
