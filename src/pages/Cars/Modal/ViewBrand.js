//**React imports */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//**Bootstrap imports */
import { Form, Button, Modal, InputGroup, Col, Image } from "react-bootstrap";
//**Assets import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
//**Api config */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "./../../../routes";
function ViewBrand({ showViewBrand, setShowViewBrand, selectedBrand }) {
  //----------------------------------------------------------------
  const navigate = useHistory();
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //----------------------------------------------------------------
  const [brand, setBrand] = useState({});
  const getBrand = async () => {
    await axios
      .get(ApiLinks.Brands.getOne + selectedBrand, {})
      .then((res) => {
        if (res?.status === 200) {
          setBrand((prev) => res?.data);
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
      selectedBrand !== null &&
      selectedBrand !== undefined &&
      selectedBrand !== 0
    ) {
      getBrand();
    }
  }, [showViewBrand, selectedBrand]);
  return (
    <Modal
      /* as={Modal.Dialog} */
      centered
      show={showViewBrand}
      onHide={() => setShowViewBrand(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowViewBrand(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Les détails</h5>
        <Col className="mb-3">
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <InputGroup>
              <Form.Control value={brand?.item?.name} disabled />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="mb-3">
          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <InputGroup>
              <Form.Control value={brand?.item?.logo} disabled />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="mb-3">
          <Form.Group>
            <Form.Label>Nombre de modéles</Form.Label>
            <InputGroup>
              <Form.Control value={brand?.sizeModels} disabled />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="mb-3">
          <Form.Group>
            <Form.Label>Nombre de voitures</Form.Label>
            <InputGroup>
              <Form.Control value={brand?.sizeCars} disabled />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="mb-3">
          <Form.Group>
            <Form.Label>Quand a été crée</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={new Date(brand?.item?.createdAt).toDateString()}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Modal.Body>
    </Modal>
  );
}

export default ViewBrand;
