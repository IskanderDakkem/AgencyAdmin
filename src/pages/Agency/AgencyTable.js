//**React imports */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//**Bootsrap imports */
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
  InputGroup,
  Form,
  OverlayTrigger,
  Tooltip,
} from "@themesberg/react-bootstrap";
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
  faSearch,
  faCog,
  faCheck,
  faPlus,
  faUser,
  faLock,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
//**Api config imports */
import ApiLinks from "./../../Axios/ApiLinks";
import axios from "../../Axios/Axios";
import { Routes } from "../../routes";
//**Modals imports */
import CreateAgency from "./Modal/CreateAgency";
import DeleteAgency from "./Modal/DeleteAgency";
import UpdateAgency from "./Modal/UpdateAgency";
import ViewAgency from "./Modal/ViewAgency";

import transactions from "../../data/transactions";
import BlockAgency from "./Modal/BlockAgency";
import ResetAgencyPassword from "./Modal/ResetAgencyPassword";
function AgencyTable() {
  const totalTransactions = transactions.length;
  //--------------------------------------------------------------
  const [agencies, setAgencies] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(30);
  //-----------------------------------------------------------
  const getAllAgencies = async () => {
    await axios
      .get(ApiLinks.Agency.getAll, {})
      .then((res) => {
        if (res?.status === 200) {
          setAgencies((prev) => res?.data?.items);
        }
      })
      .catch((err) => {
        console.log(err);
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
  //-----------------------------------------------------------
  let pagesNumber = [];
  for (let i = 1; i < agencies.length / limitPerPage + 1; i++) {
    pagesNumber.push(i);
  }
  const PaginatePage = (pageNumber) => {
    setRowPerPage((prev) => pageNumber);
    getAllAgencies();
  };
  const prevPage = (pageNumber) => {
    if (pageNumber !== 1) {
      setRowPerPage((prev) => prev - 1);
    }
  };
  const nextPage = (pageNumber) => {
    if (pageNumber < agencies.length / limitPerPage) {
      setRowPerPage((prev) => prev + 1);
    }
  };
  //--------------------------------------------------------------
  const [showCreateAgencyModal, setShowCreateAgencyModal] = useState(false);
  const [showDeleteAgencyModal, setShowDeleteAgencyModal] = useState(false);
  const [showUpdateAgencyModal, setShowUpdateAgencyModal] = useState(false);
  const [showViewAgencyModal, setShowViewAgencyModal] = useState(false);
  const [showSuspendAgencyModal, setShowSuspendAgencyModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showActivateAgencyModal, setShowActivateAgencyModal] = useState(false);
  //--------------------------------------------------------------
  const [selectedAgency, setSelectedAgency] = useState(0);
  //--------------------------------------------------------------
  const handleDeleteAgency = (id) => {
    setShowDeleteAgencyModal(true);
    setSelectedAgency((prev) => id);
  };
  const handleUpdateAgency = (id) => {
    setShowUpdateAgencyModal(true);
    setSelectedAgency((prev) => id);
  };
  const handleShowAgency = (id) => {
    setShowViewAgencyModal(true);
    setSelectedAgency((prev) => id);
  };
  const handleSuspendAgencyModal = (id) => {
    setShowSuspendAgencyModal(true);
    setSelectedAgency((prev) => id);
  };
  const handleResetPasswordAgencyModal = (id) => {
    setShowResetPasswordModal(true);
    setSelectedAgency((prev) => id);
  };
  const handleActivateAgencyModal = (id) => {
    setShowActivateAgencyModal(true);
    setSelectedAgency((prev) => id);
  };
  //-----------------------------------------------------------
  useEffect(() => {
    getAllAgencies();
  }, [
    showCreateAgencyModal,
    showDeleteAgencyModal,
    showUpdateAgencyModal,
    showViewAgencyModal,
    showSuspendAgencyModal,
    showResetPasswordModal,
    showActivateAgencyModal,
  ]);
  //-----------------------------------------------------------
  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <OverlayTrigger
              key="example"
              placement="bottom"
              overlay={
                <Tooltip id="top" className="m-0">
                  Créer
                </Tooltip>
              }
            >
              <Button
                className="btn btn-primary"
                onClick={() => setShowCreateAgencyModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">Logo</th>
                <th className="border-bottom">Libelle</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Phone Number</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency) => {
                const {
                  id,
                  logo,
                  libelle,
                  email,
                  phoneNumber,
                  activated,
                  suspended,
                } = agency;
                const status = {};
                if (suspended) {
                  status.description = "L'agence est suspendue";
                  status.class = "text-danger";
                } else if (activated) {
                  status.description = "Le compte n'est pas activé";
                  status.class = "text-primary";
                } else if (!activated) {
                  status.description = "Le compte est activé";
                  status.class = "text-success";
                }
                return (
                  <tr key={id}>
                    <td>
                      <span className="fw-normal">{id}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{logo}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{libelle}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{email}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{phoneNumber}</span>
                    </td>
                    <td>
                      <span className={`fw-normal ${status.class}`}>
                        {status.description}
                      </span>
                    </td>
                    <td>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Voir les détails
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="warning"
                          className="p-2 m-1"
                          onClick={() => handleShowAgency(id)}
                        >
                          <FontAwesomeIcon icon={faEye} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Supprimer l'agence
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="danger"
                          className="p-2 m-1"
                          onClick={() => handleDeleteAgency(id)}
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
                            Blocker l'agence
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="danger"
                          className="p-2 m-1"
                          onClick={() => handleSuspendAgencyModal(id)}
                          disabled={suspended}
                        >
                          <FontAwesomeIcon icon={faBan} className="p-0 m-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Mettre à jour
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="success"
                          className="p-2 m-1"
                          onClick={() => handleUpdateAgency(id)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Envoyer le lien de réinitialisation du mot de passe
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="success"
                          className="p-2 m-1"
                          onClick={() => handleResetPasswordAgencyModal(id)}
                        >
                          <FontAwesomeIcon icon={faLock} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Activer l'abonnement
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="info"
                          className="p-2 m-1"
                          onClick={() => handleActivateAgencyModal(id)}
                        >
                          <FontAwesomeIcon icon={faCheck} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev onClick={() => prevPage(rowPerPage)}>
                  Previous
                </Pagination.Prev>
                {pagesNumber.map((pageNumber) => {
                  if (rowPerPage === pageNumber) {
                    return (
                      <Pagination.Item
                        key={pagesNumber.indexOf(pageNumber)}
                        active
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  }
                  return (
                    <Pagination.Item
                      key={pagesNumber.indexOf(pageNumber)}
                      onClick={() => PaginatePage(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next onClick={() => nextPage(rowPerPage)}>
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{agencies.length}</b> out of
              <b>{" " + agencies.length + " "}</b>
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CreateAgency
        showCreateAgencyModal={showCreateAgencyModal}
        setShowCreateAgencyModal={setShowCreateAgencyModal}
      />
      <DeleteAgency
        showDeleteAgencyModal={showDeleteAgencyModal}
        setShowDeleteAgencyModal={setShowDeleteAgencyModal}
        selectedAgency={selectedAgency}
      />
      <UpdateAgency
        showUpdateAgencyModal={showUpdateAgencyModal}
        setShowUpdateAgencyModal={setShowUpdateAgencyModal}
        selectedAgency={selectedAgency}
      />
      <ViewAgency
        showViewAgencyModal={showViewAgencyModal}
        setShowViewAgencyModal={setShowViewAgencyModal}
        selectedAgency={selectedAgency}
      />
      <BlockAgency
        showSuspendAgencyModal={showSuspendAgencyModal}
        setShowSuspendAgencyModal={setShowSuspendAgencyModal}
        selectedAgency={selectedAgency}
      />
      <ResetAgencyPassword
        showResetPasswordModal={showResetPasswordModal}
        setShowResetPasswordModal={setShowResetPasswordModal}
        selectedAgency={selectedAgency}
      />
    </>
  );
}

export default AgencyTable;
