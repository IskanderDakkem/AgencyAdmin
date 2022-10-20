import React from "react";
import SheetTable from "./SheetTable";

function SheetMain() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          {/* <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb> */}
          <h4>Fiche technique par défaut</h4>
          <p className="mb-0">
            Listes de tous les fiches techniques par défaut.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          {/* <ButtonGroup>
        <Button variant="outline-primary" size="sm">
          Share
        </Button>
        <Button variant="outline-primary" size="sm">
          Export
        </Button>
      </ButtonGroup> */}
        </div>
      </div>
      <SheetTable />
    </>
  );
}

export default SheetMain;
