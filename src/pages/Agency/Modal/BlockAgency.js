//**React imports */
import React, { useState } from "react";
//**Bootstrap imports */
import { Button, Modal, Alert } from "react-bootstrap";
//**Api config */
import Axios from "../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
function BlockAgency({
  showSuspendAgencyModal,
  setShowSuspendAgencyModal,
  selectedAgency,
}) {
  //-----------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const blockThisAgency = async () => {
    setSpinningButton(true);
    await Axios.put(ApiLinks.Agency.block + selectedAgency)
      .then((res) => {
        if (res?.status === 200) {
          setShowSuspendAgencyModal(false);
        }
      })
      .catch((err) => {
        //**Failed to block */
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
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showSuspendAgencyModal}
      onHide={() => setShowSuspendAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowSuspendAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Blocker cette agence ?</h5>
      </Modal.Body>
      {backErrors.failedToCreate && (
        <Alert variant="danger">{backErrors.failedToCreate}</Alert>
      )}
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowSuspendAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={blockThisAgency}
          disabled={spinningButton}
        >
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlockAgency;