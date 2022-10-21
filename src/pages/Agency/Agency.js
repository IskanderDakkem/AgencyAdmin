import React from "react";
import { Button, ButtonGroup } from "@themesberg/react-bootstrap";
import AgencyTable from "./AgencyTable";
import RouteWithSideBar from "./../../components/RouteWithSideBar";
function Agency() {
  return (
    <RouteWithSideBar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Les Agences</h4>
          <p className="mb-0">Liste de toutes les agences</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <AgencyTable />
    </RouteWithSideBar>
  );
}

export default Agency;
