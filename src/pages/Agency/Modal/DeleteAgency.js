//**React imports */
import React from "react";
//**Bootstrap imports */
import { Button, Modal } from "react-bootstrap";
//---------------------------------------------------------------------------
function DeleteAgency({
  showDeleteAgencyModal,
  setShowDeleteAgencyModal,
  selectedAgency,
}) {
  //-----------------------------------------------------------
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const deleteThisAgency = async () => {
    setSpinningButton(true);
    await axios
      .delete(ApiLinks.Agency.delete + selectedAgency, {})
      .then((res) => {
        if (res?.status === 200) {
          setShowDeleteAgencyModal(false);
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
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showDeleteAgencyModal}
      onHide={() => setShowDeleteAgencyModal(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowDeleteAgencyModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Supprimer cette agence ?</h5>
      </Modal.Body>
      {backErrors.failedToCreate && (
        <Alert variant="danger">{backErrors.failedToCreate}</Alert>
      )}
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowDeleteAgencyModal(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={deleteThisAgency}
          disabled={spinningButton}
        >
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAgency;
