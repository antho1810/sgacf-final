import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import jwtDecode from "jwt-decode";

import Container from "react-bootstrap/Container";

import { Sidenav, Nav, Avatar, Button } from "rsuite";

import logo from "./UNACazul.png";

import { FaUserPlus } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { HiDocumentAdd, HiDocumentText } from "react-icons/hi";

import "./Navbarside.css";

function Navbarside() {
  const [userInfo, setUserInfo] = useState({});

  const loadUserData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUserInfo(decodedUser);
      } catch (e) {
        console.log("Error al decodificar el token:", e);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    // window.location.reload();
  };

  return (
    <>
      <div className="main">
        <Container fluid className="grid-global-content">
          <div className="ct-sidenav">
            <div className="flex-container">
              <div className="flex-items">
                <Container className="ct-logo">
                  <img src={logo} className="logo-navbar" alt="logo-unac" />
                </Container>
              </div>

              <div className="flex-items">
                <Sidenav style={{ marginLeft: "0", height: "100%" }}>
                  <Sidenav.Body>
                    <Nav activeKey="1">
                      <Nav.Item
                        as={NavLink}
                        active
                        eventKey="1"
                        icon={<MdCategory />}
                        to="/"
                      >
                        <span>Dashboard</span>
                      </Nav.Item>
                      <Nav.Menu
                        eventKey="3"
                        title={<span>Actas</span>}
                        icon={<HiDocumentText />}
                      >
                        <Nav.Item
                          as={NavLink}
                          eventKey="3-1"
                          icon={<HiDocumentAdd />}
                          to="/crear-acta"
                        >
                          <span>Crear acta</span>
                        </Nav.Item>
                        <Nav.Item
                          as={NavLink}
                          eventKey="3-2"
                          icon={<FaUserPlus />}
                          to="/crear-participante"
                        >
                          <span>Crear participante</span>
                        </Nav.Item>
                      </Nav.Menu>
                      <Nav.Item
                        as={NavLink}
                        onClick={handleLogout}
                        eventKey="4"
                        icon={<ImExit />}
                      >
                        <span>Login out</span>
                      </Nav.Item>
                    </Nav>
                  </Sidenav.Body>
                </Sidenav>
              </div>

              <div className="flex-items">
                <div className="ct-user">
                  <Avatar
                    circle
                    src="https://avatars.githubusercontent.com/u/12592949"
                    alt="@SevenOutman"
                    style={{ width: "45px" }}
                  />
                  <div className="ct-info-user">
                    <h4> {userInfo.nombre + " " + userInfo.apellido} </h4>
                    <span> {userInfo.cargo} - UNAC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ct-main-content">
            <Outlet></Outlet>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Navbarside;
