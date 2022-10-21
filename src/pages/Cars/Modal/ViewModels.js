//** React imports */
import React, { useEffect, useState } from "react";
//**Bootsrap imports */
import { Button, Modal, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//**Api config imports */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
function ViewModels({ showViewCar, setShowViewCar, selectedBrand }) {
  //-----------------------------------------------------------------
  const initialeState = [];
  const [models, setModels] = useState(initialeState);
  const getModels = async () => {
    await axios
      .get(ApiLinks.Brands.getModels, {})
      .then((res) => {
        if (res?.status === 200) {
          setModels((prev) => res?.data?.items);
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
  };
  useEffect(() => {
    if (
      selectedBrand !== null &&
      selectedBrand !== undefined &&
      selectedBrand !== 0
    ) {
      getModels();
    }
  }, [showViewCar, selectedBrand]);
  //-----------------------------------------------------------------
  const handleDeleteModel = async (id) => {};
  const handleUpdateModel = async (id, event) => {};
  //-----------------------------------------------------------------
  return (
    <Modal
      /* as={Modal.Dialog} */
      backdrop="static"
      centered
      show={showViewCar}
      onHide={() => setShowViewCar(false)}
      animation
    >
      <Modal.Header className="border-0">
        <Button
          variant="close"
          aria-label="Close"
          onClick={() => setShowViewCar(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Les modèles de cette marque</h5>
        <Table>
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Marque</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
        </Table>
        <tbody>
          {models.map((model) => {
            const { id, name } = model;
            return (
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <OverlayTrigger
                    key="example"
                    placement="bottom"
                    overlay={
                      <Tooltip id="top" className="m-0">
                        Supprimer cette modéle
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="danger"
                      className="p-2 m-1"
                      onClick={() => handleDeleteModel(id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="p-0 m-0" />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key="example"
                    placement="bottom"
                    overlay={
                      <Tooltip id="top" className="m-0">
                        Mettre à jour cette modéle
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="success"
                      className="p-2 m-1"
                      onClick={(e) => handleUpdateModel(id, e)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="p-0" />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Modal.Body>
    </Modal>
  );
}

export default ViewModels;
