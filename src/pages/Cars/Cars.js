import React from "react";
import CarsTable from "./CarsTable";
import RouteWithSideBar from "./../../components/RouteWithSideBar";
function Cars() {
  return (
    <RouteWithSideBar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Les marques</h4>
          <p className="mb-0">Listes de tous les marques.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <CarsTable />
    </RouteWithSideBar>
  );
}

export default Cars;
