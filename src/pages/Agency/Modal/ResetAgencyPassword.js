//**React imports */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//**Bootstrap imports */
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
//**Api config */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "../../../routes";
//---------------------------------------------------------------------------
function ResetAgencyPassword({
  showResetPasswordModal,
  setShowResetPasswordModal,
  selectedAgency,
}) {
  //-----------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const sendResetLink = async (req, res) => {
    setSpinningButton(true);
    await axios
      .post(ApiLinks.Agency.sendResetLink + selectedAgency, {}, {})
      .then((res) => {
        if (res?.status === 200) {
          setShowResetPasswordModal(false);
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
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showResetPasswordModal}
      onHide={() => setShowResetPasswordModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowResetPasswordModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">
          Confirmer envoyer un lien de réinitialisation du mot de passe à
          l'e-mail de l'agence ?
        </h5>
      </Modal.Body>
      {backErrors.failedToCreate && (
        <Alert variant="danger">{backErrors.failedToCreate}</Alert>
      )}
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowResetPasswordModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={sendResetLink}
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

export default ResetAgencyPassword;
