import React, {
  useState,
  // useMemo,
  useEffect,
} from "react";
import ActaService from "../../../services/ActasDataService";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
// import '../../dashboard/Table.css'
import "./ActaDetails.css";

const ActaDetails = () => {
  const [acta, setActa] = useState([]);

  const { ref } = useParams();

  const handleConfirmExitBtn = () => {
    window.location.href = "/sgacfi/";
  };

  const fechaCreacion = acta.fechaCreacion;
  const fechaFormateada = moment(fechaCreacion).format("DD/MM/YYYY");

  useEffect(() => {
    const fetchData = async () => {
      const response = await ActaService.getActa(ref);
      setActa(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="ct-header-details">
        <div className="title">
          <h2>Detalles del acta</h2>
        </div>
      </div>
      {/* Container Informacion */}
      <div className="ct-informacion mt-3">
        <div className="d-flex text-center">
          <div className="me-4">
            <h3 className="h4">Nro. Referencia</h3>
            <p>{acta.numeroRef}</p>
          </div>
          <div className="me-4">
            <h3 className="h4">Fecha</h3>
            <p>{fechaFormateada}</p>
          </div>
          <div className="me-4">
            <h3 className="h4">Estado</h3>
            <p>
              {acta.estado === "En proceso" ? (
                <Badge className="inProcess">
                  {" "}
                  <span className="fw-400">{acta.estado}</span>{" "}
                </Badge>
              ) : (
                <Badge className="confirmed">
                  <span className="fw-400">{acta.estado}</span>
                </Badge>
              )}
            </p>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="me-4 text-center">
            <h1 className="h4">Lugar</h1>
            <p> {acta.lugar} </p>
          </div>
          <div className="me-4 text-center">
            <h1 className="h4">Modalidad</h1>
            <p> {acta.modalidad} </p>
          </div>
          <div className="me-4 text-center">
            <h1 className="h4">Hora inico</h1>
            <p> {moment(acta.horaInicio).format("h:mm a")} </p>
          </div>
          <div className="me-4 text-center">
            <h1 className="h4">Hora final</h1>
            <p> {moment(acta.horaFinal).format("h:mm a")} </p>
          </div>
        </div>
        <div className="mt-2">
          <div className="me-4 mb-3 text-center">
            <h1 className="h4">Miembros presentes</h1>
            {acta.miembrosPresentes ? (
              acta.miembrosPresentes.map((item) => (
                <div key={item._id}>
                  <p>
                    {item.nombre} {item.apellido} | {item.cargo}
                  </p>
                </div>
              ))
            ) : (
              <span>No hay miembros presentes</span>
            )}
          </div>
          <div className="me-4 mb-3 text-center">
            <h1 className="h4">Miembros Ausentes</h1>
            {acta.miembrosAusentes ? (
              acta.miembrosAusentes.map((item) => (
                <div key={item._id}>
                  <p>
                    {item.nombre} {item.apellido} | {item.cargo}
                  </p>
                </div>
              ))
            ) : (
              <span>No hay miembros Ausentes</span>
            )}
          </div>
          <div className="me-4 mb-3 text-center">
            <h1 className="h4">Miembros Invitados</h1>
            {acta.miembrosInvitados ? (
              acta.miembrosInvitados.map((item) => (
                <div key={item._id}>
                  <p>
                    {item.nombre} {item.apellido} | {item.cargo}
                  </p>
                </div>
              ))
            ) : (
              <span>No hay miembros Invitados</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="me-4 ">
          <h1 className="h4 text-center">Cronograma</h1>
          {/* <p className="text-justify">{acta.cronograma}</p> */}
          {acta &&
            acta.cronograma &&
            acta.cronograma.split("\n").map((parrafo, index) => (
              <p key={index} className="text-justify">
                {parrafo.trim()}
              </p>
            ))}
        </div>
      </div>
      {/* Container Articulos */}
      <Container className="ct-articulos mt-2 mb-2">
        <span className="h4 text-center">Articulos</span>
        <Row>
          {acta.articulos ? (
            acta.articulos.map((voto, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Detalle de Voto</Card.Title>
                    {/* <Card.Title>
                      {voto.titulo}_{voto.nombreAspirante}
                    </Card.Title> */}
                    <div
                      style={{
                        maxWidth: "95%",
                        overflowY: "hidden",
                      }}
                      className="container-fluid p-0 m-0"
                    >
                      <ul className="list-group">
                        {Object.keys(voto).map((votoInd, index) => (
                          <li key={index} className="list-group-item">
                            <strong>{votoInd}</strong>: {voto[votoInd]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <span>No hay Artículos</span>
            </Col>
          )}
        </Row>
      </Container>
      <Container fluid>
        <Row className="mb-3">
          <Col style={{ height: "80px" }}></Col>
        </Row>
      </Container>
      <div className="ct-btn d-flex mt-2 justify-content-evenly">
        <button className="btn btn-warning" onClick={handleConfirmExitBtn}>
          Atrás
        </button>
        <NavLink
          className="btn btn-success"
          to={`/sgacfi/actualizar-acta/referencia/${acta.numeroRef}`}
        >
          Editar
        </NavLink>
      </div>
    </div>
  );
};

export default ActaDetails;
