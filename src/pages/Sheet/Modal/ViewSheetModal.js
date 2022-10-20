//**React imports */
import React, { useState, useEffect } from "react";
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
//----------------------------------------------------------------
function ViewSheetModal({
  showViewSheetModal,
  setShowViewSheetModal,
  selectedSheet,
}) {
  //----------------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //----------------------------------------------------------------
  const [sheet, setSheet] = useState({});
  const getSheet = async () => {
    setSpinningButton(true);
    await axios
      .get(ApiLinks.Sheet.getOne + selectedSheet, {})
      .then((res) => {
        console.log(res);
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
  }, [showViewSheetModal, selectedSheet]);
  //----------------------------------------------------------------
  let Value;
  if (sheet.kmAt !== null) {
    Value = `${sheet.kmAt} km`;
  } else if (sheet.numberMonths !== null) {
    Value = `${sheet.numberMonths} mois`;
  } else if (sheet.minKm !== null && sheet.maxKm !== null) {
    Value = `Entre ${sheet.minKm} et ${sheet.maxKm} km`;
  }
  //----------------------------------------------------------------
  return (
    <Modal
      centered
      show={showViewSheetModal}
      onHide={() => setShowViewSheetModal(false)}
      animation
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowViewSheetModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        {spinningButton === true ? (
          <Spinner />
        ) : (
          <>
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
                            {/* <span className="icon icon-md">
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="me-3"
                          />
                        </span> */}
                            <input type="file" disabled={true} />
                            {/* <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">
                            Choose Image
                          </div>
                          <div className="text-gray small">
                            JPG, GIF or PNG. Max size of 800K
                          </div>
                        </div> */}
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
                  <Form.Control value={sheet?.name} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows="7"
                    value={sheet?.description}
                    disabled={true}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={
                      sheet?.type === "1"
                        ? "kilométrage"
                        : sheet?.type === "2"
                        ? "Nombre de mois"
                        : sheet?.type === "3"
                        ? "kilométrage min et max"
                        : null
                    }
                    disabled={true}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <InputGroup>
                  <Form.Control value={Value} disabled={true} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col /* md={6} */ className="mb-3">
              <Form.Group>
                <Form.Label>Quand a été crée</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={new Date(sheet?.createdAt).toDateString()}
                    disabled={true}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewSheetModal;
