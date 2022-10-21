//**React imports */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//**Bootstrap imports */
import { Button, Modal, Alert } from "react-bootstrap";
//**Api config */
import Axios from "../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "./../../../routes";
//-----------------------------------------------------------
function BlockAgency({
  showSuspendAgencyModal,
  setShowSuspendAgencyModal,
  selectedAgency,
}) {
  //-----------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const blockThisAgency = async () => {
    setSpinningButton(true);
    await Axios.put(
      ApiLinks.Agency.block + selectedAgency.id,
      { suspended: !selectedAgency.status },
      {}
    )
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
        <h5 className="mb-4">
          {selectedAgency.status ? "Unblock" : "Block"} cette agence ?
        </h5>
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
//-----------------------------------------------------------
export default BlockAgency;
