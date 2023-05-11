import React from "react";
import Container from "react-bootstrap/esm/Container";

import logo from "./logo-unac.png";

import { Sidenav, Nav, Avatar } from "rsuite";

import { FaUserPlus } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { HiDocumentAdd, HiDocumentText } from "react-icons/hi";

import "./Navbarside.css";

function Navbarside() {
  return (
    <>
      <div className="flex-container">
        {/* Logo */}
        <div className="flex-items">
          <Container className="ct-logo">
            <img src={logo} alt="logo-unac" className="logo-navbar" />
          </Container>
        </div>
        {/* Navside */}
        <div className="flex-items">
          <Sidenav style={{marginLeft: "0", height: "100%"}}>
            <Sidenav.Body>
              <Nav activeKey={1}>
                <Nav.Item eventKey="1" icon={<MdCategory />}>
                  <span>Dashboard</span>
                </Nav.Item>
                <Nav.Menu
                  eventKey="2"
                  title={<span>Actas</span>}
                  icon={<HiDocumentText />}
                >
                  <Nav.Item eventKey="2-1" icon={<HiDocumentAdd />}>
                    <span>Crear Acta</span>
                  </Nav.Item>
                  <Nav.Item eventKey="2-2" icon={<FaUserPlus />}>
                    <span>Crear participante</span>
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Item eventKey="3" icon={<ImExit />}>
                  <span>Login out</span>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>

        {/* User info box */}
        <div className="flex-items">
          <div className="ct-user">
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/12592949"
              alt="user-avatar"
              style={{width: "45px"}}
            />
            <div className="ct-info-user">
              <h4>Jhon Niño</h4>
              <span>Decano FI - UNAC</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbarside;
