//**React imports */
import React, { useEffect, useState } from "react";
import { Routes } from "../../routes";
import { Link } from "react-router-dom";
//**Bootsrap imports */
import {
  Col,
  Row,
  Nav,
  Card,
  Button,
  Table,
  Pagination,
  InputGroup,
  Form,
  Tooltip,
  OverlayTrigger,
} from "@themesberg/react-bootstrap";
//**Font awesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faTrashAlt,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

//**Api config imports */
import ApiLinks from "./../../Axios/ApiLinks";
import axios from "../../Axios/Axios";
//**Modals */
import CreateSheetModal from "./Modal/CreateSheetModal";
import DeleteSheetModal from "./Modal/DeleteSheetModal";
import UpdateSheetModal from "./Modal/UpdateSheetModal";
import ViewSheetModal from "./Modal/ViewSheetModal";
function SheetTable() {
  //-----------------------------------------------------------
  const [sheets, setSheets] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(30);
  //-----------------------------------------------------------
  const getAllSheets = async () => {
    await axios
      .get(ApiLinks.Sheet.getAll)
      .then((res) => {
        if (res?.status === 200) {
          setSheets((prev) => res?.data?.items);
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
  for (let i = 1; i < sheets.length / limitPerPage + 1; i++) {
    pagesNumber.push(i);
  }
  const PaginatePage = (pageNumber) => {
    setRowPerPage((prev) => pageNumber);
    getAllSheets();
  };
  const prevPage = (pageNumber) => {
    if (pageNumber !== 1) {
      setRowPerPage((prev) => prev - 1);
    }
  };
  const nextPage = (pageNumber) => {
    if (pageNumber < sheets.length / limitPerPage) {
      setRowPerPage((prev) => prev + 1);
    }
  };
  //------------------------------------------------------------
  const [showCreateSheetModal, setShowCreateSheetModal] = useState(false);
  const [showViewSheetModal, setShowViewSheetModal] = useState(false);
  const [showDeleteSheetModal, setShowDeleteSheetModal] = useState(false);
  const [showUpdateSheetModal, setShowUpdateSheetModal] = useState(false);
  //-----------------------------------------------------------
  const [selectedSheet, setSelectedSheet] = useState(0);
  const handleOpenViewSheetModal = (id) => {
    setShowViewSheetModal(true);
    setSelectedSheet((prev) => id);
  };
  const handleOpenDeleteSheetModal = (id) => {
    setShowDeleteSheetModal(true);
    setSelectedSheet((prev) => id);
  };
  const handleOpenUpdateSheetModal = (id) => {
    setShowUpdateSheetModal(true);
    setSelectedSheet((prev) => id);
  };
  //-----------------------------------------------------------
  useEffect(() => {
    getAllSheets();
  }, [
    showCreateSheetModal,
    showDeleteSheetModal,
    showViewSheetModal,
    showUpdateSheetModal,
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
                onClick={() => setShowCreateSheetModal(true)}
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
                <th className="border-bottom">Avatar</th>
                <th className="border-bottom">Type</th>
                <th className="border-bottom">name</th>
                <th className="border-bottom">Value</th>
                <th className="border-bottom">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sheets.map((sheet) => {
                const {
                  id,
                  avatar,
                  type,
                  name,
                  kmAt,
                  numberMonths,
                  minKm,
                  maxKm,
                } = sheet;
                let Value;
                if (kmAt !== null) {
                  Value = <span className="fw-normal"> {kmAt + " km"} </span>;
                } else if (numberMonths !== null) {
                  Value = (
                    <span className="fw-normal">
                      {" "}
                      {numberMonths + " mois"}{" "}
                    </span>
                  );
                } else if (minKm !== null && maxKm !== null) {
                  Value = (
                    <span className="fw-normal">{`Entre ${minKm} et ${maxKm} km`}</span>
                  );
                }
                return (
                  <tr>
                    <td>
                      <span className="fw-normal">{id}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{avatar}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{type}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{Value}</span>
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
                          onClick={() => handleOpenViewSheetModal(id)}
                        >
                          <FontAwesomeIcon icon={faEye} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Supprimer
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="danger"
                          className="p-2 m-1"
                          onClick={() => handleOpenDeleteSheetModal(id)}
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
                            Mettre à jour
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="success"
                          className="p-2 m-1"
                          onClick={() => handleOpenUpdateSheetModal(id)}
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
              Showing <b>{sheets.length}</b> out of
              <b>{" " + sheets.length + " "}</b>
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CreateSheetModal
        showCreateSheetModal={showCreateSheetModal}
        setShowCreateSheetModal={setShowCreateSheetModal}
      />
      <DeleteSheetModal
        showDeleteSheetModal={showDeleteSheetModal}
        setShowDeleteSheetModal={setShowDeleteSheetModal}
        selectedSheet={selectedSheet}
      />
      <UpdateSheetModal
        showUpdateSheetModal={showUpdateSheetModal}
        setShowUpdateSheetModal={setShowUpdateSheetModal}
        selectedSheet={selectedSheet}
      />
      <ViewSheetModal
        showViewSheetModal={showViewSheetModal}
        setShowViewSheetModal={setShowViewSheetModal}
        selectedSheet={selectedSheet}
      />
    </>
  );
}

export default SheetTable;
