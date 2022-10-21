//**React imports */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//**Bootsrap imports */
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
//**Assets imports */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
//**Api config imports */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "../../../routes";
//----------------------------------------------------------------
function ViewAgency({
  showViewAgencyModal,
  setShowViewAgencyModal,
  selectedAgency,
}) {
  //----------------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //----------------------------------------------------------------
  const initialeState = {};
  const [agency, setAgency] = useState(initialeState);
  const getAgency = async () => {
    setSpinningButton(true);
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
    setSpinningButton(false);
  };
  useEffect(() => {
    if (
      selectedAgency !== null &&
      selectedAgency !== undefined &&
      selectedAgency !== 0
    ) {
      getAgency();
    }
  }, [showViewAgencyModal, selectedAgency]);
  //----------------------------------------------------------------
  return (
    <Modal
      backdrop="static"
      centered
      show={showViewAgencyModal}
      onHide={() => setShowViewAgencyModal(false)}
      animation
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowViewAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        {spinningButton === true ? (
          <>
            <Spinner />
            Loading
          </>
        ) : (
          <>
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
                            <input type="file" disabled={true} />
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
                <Form.Label>libelle</Form.Label>
                <InputGroup>
                  <Form.Control value={agency?.libelle} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Addresse</Form.Label>
                <InputGroup>
                  <Form.Control value={agency?.address} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Nom de responsable</Form.Label>
                <InputGroup>
                  <Form.Control value={agency?.fullName} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control value={agency?.email} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Numéro de téléphone</Form.Label>
                <InputGroup>
                  <Form.Control value={agency?.phoneNumber} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewAgency;
