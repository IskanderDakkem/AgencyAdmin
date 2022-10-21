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
//**Modals import */
import CreateCar from "./Modal/CreateCar"; //Create a new modal
import ViewModels from "./Modal/ViewModels"; //View the brands models
import ViewBrand from "./Modal/ViewBrand"; //View single brand
import DeleteBrand from "./Modal/DeleteBrand"; //Delete a brand
import UpdateBrand from "./Modal/UpdateBrand"; //update a single brand
import CreateBrandModel from "./Modal/CreateBrandModel"; //Create a brand model
function CarsTable() {
  //-----------------------------------------------------------
  const [brands, setBrands] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(30);
  //-----------------------------------------------------------
  const getAllBrands = async () => {
    await axios
      .get(ApiLinks.Brands.getAll)
      .then((res) => {
        if (res?.status === 200) {
          setBrands((prev) => res?.data?.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------------------------------------
  let pagesNumber = [];
  for (let i = 1; i < brands.length / limitPerPage + 1; i++) {
    pagesNumber.push(i);
  }
  const PaginatePage = (pageNumber) => {
    setRowPerPage((prev) => pageNumber);
    getAllBrands();
  };
  const prevPage = (pageNumber) => {
    if (pageNumber !== 1) {
      setRowPerPage((prev) => prev - 1);
    }
  };
  const nextPage = (pageNumber) => {
    if (pageNumber < brands.length / limitPerPage) {
      setRowPerPage((prev) => prev + 1);
    }
  };
  //------------------------------------------------------------
  const [showCreateCarModal, setShowCreateCarModal] = useState(false);
  const [showViewCar, setShowViewCar] = useState(false);
  const [showViewBrand, setShowViewBrand] = useState(false);
  const [showDeleteBrand, setShowDeleteBrand] = useState(false);
  const [showUpdateBrand, setShowUpdateBrand] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  //-----------------------------------------------------------
  const [selectedBrand, setSelectedBrand] = useState(0);
  const handleOpenViewModelModal = (id) => {
    setShowViewCar(true);
    setSelectedBrand((prev) => id);
  };
  const handleOpenViewBrandModal = (id) => {
    setShowViewBrand(true);
    setSelectedBrand((prev) => id);
  };
  const handleOpenDeleteBrandModal = (id) => {
    setShowDeleteBrand(true);
    setSelectedBrand((prev) => id);
  };
  const handleOpenUpdateBrandModal = (id) => {
    setShowUpdateBrand(true);
    setSelectedBrand((prev) => id);
  };
  const handleOpenCreateBrandModal = (id) => {
    setShowCreateModel(true);
    setSelectedBrand((prev) => id);
  };
  //-----------------------------------------------------------
  useEffect(() => {
    getAllBrands();
  }, [
    showCreateCarModal,
    showViewCar,
    showViewBrand,
    showDeleteBrand,
    showUpdateBrand,
    showCreateModel,
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
                onClick={() => setShowCreateCarModal(true)}
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
                <th className="border-bottom">Marque</th>
                <th className="border-bottom">Logo</th>
                <th className="border-bottom">Modèle</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                const { id, name, logo } = brand;
                return (
                  <tr>
                    <td>
                      <span className="fw-normal">{id}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{logo}</span>
                    </td>
                    <td>
                      <span className="fw-normal">
                        <OverlayTrigger
                          key="example"
                          placement="bottom"
                          overlay={
                            <Tooltip id="top" className="m-0">
                              Voir les modèles
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="warning"
                            className="p-2 m-1"
                            onClick={() => handleOpenViewModelModal(id)}
                          >
                            <FontAwesomeIcon icon={faEye} className="p-0" />
                          </Button>
                        </OverlayTrigger>
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
                          variant="secondary"
                          className="p-2 m-1"
                          onClick={() => handleOpenViewBrandModal(id)}
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
                          onClick={() => handleOpenDeleteBrandModal(id)}
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
                          onClick={() => handleOpenUpdateBrandModal(id)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="p-0" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="example"
                        placement="bottom"
                        overlay={
                          <Tooltip id="top" className="m-0">
                            Ajouter modèle
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="info"
                          className="p-2 m-1"
                          onClick={() => handleOpenCreateBrandModal(id)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="p-0" />
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
              Showing <b>{brands.length}</b> out of
              <b>{" " + brands.length + " "}</b>
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CreateCar
        showCreateCarModal={showCreateCarModal}
        setShowCreateCarModal={setShowCreateCarModal}
        selectedBrand={selectedBrand}
      />
      <ViewModels
        showViewCar={showViewCar}
        setShowViewCar={setShowViewCar}
        selectedBrand={selectedBrand}
      />
      <ViewBrand
        showViewBrand={showViewBrand}
        setShowViewBrand={setShowViewBrand}
        selectedBrand={selectedBrand}
      />
      <DeleteBrand
        showDeleteBrand={showDeleteBrand}
        setShowDeleteBrand={setShowDeleteBrand}
        selectedBrand={selectedBrand}
      />
      <UpdateBrand
        showUpdateBrand={showUpdateBrand}
        setShowUpdateBrand={setShowUpdateBrand}
        selectedBrand={selectedBrand}
      />
      <CreateBrandModel
        showCreateModel={showCreateModel}
        setShowCreateModel={setShowCreateModel}
        selectedBrand={selectedBrand}
      />
    </>
  );
}

export default CarsTable;
