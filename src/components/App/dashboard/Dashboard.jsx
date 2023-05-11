import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./Dashboard.css";
import Navbarside from "../Layout/Navbarside";

function Dashboard() {
  return (
    <div className="main">
      <Container fluid className="grid-global-content">
        <div className="ct-sidenav">
          <Navbarside></Navbarside>
        </div>
        <div className="ct-main-content">
          <div className="ct-header-actas">
            {/* Header Title */}
            <div className="title-actas">
<h2>Lista de Actas</h2>
            </div>
            {/* Header Buttons */}
            <div>
              <Button className="plush-acta-btn">+ Añadir acta</Button>
            </div>
          </div>
          {/* Table */}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
