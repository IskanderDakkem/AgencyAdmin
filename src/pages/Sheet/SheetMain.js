import React from "react";
import SheetTable from "./SheetTable";
import RouteWithSideBar from "./../../components/RouteWithSideBar";

function SheetMain() {
  return (
    <RouteWithSideBar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Fiche technique par défaut</h4>
          <p className="mb-0">
            Listes de tous les fiches techniques par défaut.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <SheetTable />
    </RouteWithSideBar>
  );
}

export default SheetMain;
