//**React imports */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//**Bootstrap imports */
import { Button, Modal, Spinner } from "react-bootstrap";
//**Front awesome */
//**Assets import */
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";
//**Api config */
import ApiLinks from "./../../../Axios/ApiLinks";
import axios from "./../../../Axios/Axios";
import { Routes } from "../../../routes";
function DeleteBrand({ showDeleteBrand, setShowDeleteBrand, selectedBrand }) {
  //-----------------------------------------------------------
  const navigate = useHistory();
  const [spinningButton, setSpinningButton] = useState(false);
  const [backErrors, setBackErrors] = useState({}); //**Back errors */
  //-----------------------------------------------------------
  const deleteThisBrand = async () => {
    setSpinningButton(true);
    await axios
      .delete(ApiLinks.Brands.delete + selectedBrand, {})
      .then((res) => {
        if (res?.status === 200) {
          setShowDeleteBrand(false);
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
        //**Cant be deleted */
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
    setSpinningButton(false);
  };
  //-----------------------------------------------------------
  return (
    <Modal
      backdrop="static"
      centered
      show={showDeleteBrand}
      onHide={() => setShowDeleteBrand(false)}
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowDeleteBrand(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Supprimer cette marque ?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className="text-white ms-auto"
          onClick={() => setShowDeleteBrand(false)}
        >
          Annuler
        </Button>
        <Button
          variant="success"
          className="text-white"
          onClick={deleteThisBrand}
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

export default DeleteBrand;
