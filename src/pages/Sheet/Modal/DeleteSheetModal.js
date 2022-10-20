//**React imports */
import React, { useState } from "react";
//**Bootstrap imports */
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
//**Api config imports */
import ApiLinks from "./../../../Axios/ApiLinks";
import axios from "./../../../Axios/Axios";
function DeleteSheetModal({
  showDeleteSheetModal,
  setShowDeleteSheetModal,
  selectedSheet,
}) {
  //-----------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const deleteThisSheet = async () => {
    setSpinningButton(true);
    await axios
      .delete(ApiLinks.Sheet.delete + selectedSheet, {})
      .then((res) => {
        if (res?.status === 200) {
          setShowDeleteSheetModal(false);
        }
      })
      .catch((err) => {
        //**Failed to delete */
        if (err?.response?.status === 400) {
          setBackErrors((prev) => ({
            ...prev,
            failedToCreate: "une erreur s'est produite",
          }));
        }
        //**Invalid token */
        if (err?.response?.status === 401) {
          //Redirect to login oage
        }
        //**404 */
        if (err?.response?.status === 404) {
          //redirect to not found page
        }
        //**server error */
        if (err?.response?.status === 500) {
          //redirect to server error page
        }
      });
    setSpinningButton(false);
  };
  return (
    <Modal
      backdrop="static"
      centered
      show={showDeleteSheetModal}
      onHide={() => setShowDeleteSheetModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowDeleteSheetModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Supprimer cette fiche technique ?</h5>
      </Modal.Body>
      {backErrors.failedToCreate && (
        <Alert variant="danger">{backErrors.failedToCreate}</Alert>
      )}
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowDeleteSheetModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={deleteThisSheet}
          disabled={spinningButton}
        >
          {spinningButton ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Confirmer"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteSheetModal;
