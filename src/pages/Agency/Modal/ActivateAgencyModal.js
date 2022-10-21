//**React imports */
import React, { useState } from "react";
//**Bootstrap imports */
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
//**Api config */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
//---------------------------------------------------------------------------
function ActivateAgencyModal({
  showActivateAgencyModal,
  setShowActivateAgencyModal,
  selectedAgency,
}) {
  //-----------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const activateAgencyAccount = async () => {
    setSpinningButton(true);
    setSpinningButton(false);
  };
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showActivateAgencyModal}
      onHide={() => setShowActivateAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowActivateAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Activer l'abonnement de cette agence</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowActivateAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={activateAgencyAccount}
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

export default ActivateAgencyModal;
