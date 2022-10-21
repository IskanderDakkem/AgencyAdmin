//** React imports */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//**Bootsrap imports */
import { Button, Modal, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//**Api config imports */
import axios from "./../../../Axios/Axios";
import ApiLinks from "./../../../Axios/ApiLinks";
import { Routes } from "./../../../routes";
function ViewModels({ showViewCar, setShowViewCar, selectedBrand }) {
  //-----------------------------------------------------------------
  const initialeState = [];
  const navigate = useHistory();
  //-----------------------------------------------------------------
  const [models, setModels] = useState(initialeState);
  const getModels = async () => {
    await axios
      .get(ApiLinks.Brands.getModels + selectedBrand, {})
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setModels((prev) => res?.data?.items);
        }
      })
      .catch((err) => {
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
  };
  useEffect(() => {
    if (
      selectedBrand !== null &&
      selectedBrand !== undefined &&
      selectedBrand !== 0
    ) {
      getModels();
    }
  }, [showViewCar, selectedBrand, window.opener]);
  //-----------------------------------------------------------------
  const handleDeleteModel = async (id) => {
    const confirmation = window.confirm("Confirmez la suppression ?");
    if (confirmation) {
      await axios
        .delete(ApiLinks.Brands.deleteModal + id)
        .then((res) => {
          if (res?.status === 200) {
            window.alert("Le modèle a été supprimé");
            getModels();
          }
        })
        .catch((err) => {
          if (err?.response?.status === 400) {
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
    }
  };
  const handleUpdateModel = async (id) => {};
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
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="p-0 m-0"
                        />
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
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ViewModels;
