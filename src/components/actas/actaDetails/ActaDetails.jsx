import React, {
  useState,
  // useMemo,
  useEffect,
} from "react";
import ActaService from "../../../services/ActasDataService";
import { Container, Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
import { votosData } from "./votosData";
// import '../../dashboard/Table.css'

const ActaDetails = () => {
  const [acta, setActa] = useState([]);
  const [groupVotos, setGroupVotos] = useState([]);

  const { ref } = useParams();

  const handleConfirmExitBtn = () => {
    window.location.href = "/";
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
            <h3 className="h4">Numero de referencia</h3>
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
        <div className="d-flex mt-2">
          <div className="me-4 text-center">
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
          <div className="me-4 text-center">
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
          <div className="me-4 text-center">
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
        </div>
      </div>
      <div className="mt-2">
        <div className="me-4 text-center">
          <div className="me-4 text-center">
            <h1 className="h4">Cronograma</h1>
            <p className="center">{acta.cronograma}</p>
          </div>
        </div>
      </div>
      {/* Container Articulos */}
      <Container className="ct-articulos mt-2 mb-2">
        <span className="h4">Articulos</span>
        {acta.articulos ? (
          acta.articulos.map((item) => (
            <div key={item.nombre}>
              <h3>{item.nombre}</h3>
              {votosData.map(
                (voto) =>
                  voto.nombre === item.nombre && (
                    <ul key={voto.nombre}>
                      {voto.campos.map((campo) => (
                        <li key={campo.nombre}>
                          {campo.etiqueta}
                          <input
                            type={campo.tipo}
                            name={campo.nombre}
                            placeholder={campo.etiqueta}
                          />
                          {campo.subElementos && (
                            <select>
                              {campo.subElementos.map((subElem) => (
                                <option key={subElem}>{subElem}</option>
                              ))}
                            </select>
                          )}
                        </li>
                      ))}
                    </ul>
                  )
              )}
            </div>
          ))
        ) : (
          <span>No hay Articulos</span>
        )}
      </Container>
      {/* Container Documentos Soporte */}
      <div className="ct-docsSoprot mt-3">
        <div className="me-4 text-center">
          <span className="h4">Documentos adjuntos</span>
          <span className="center me-1">No hay Documentos de soporte</span>
        </div>
      </div>
      <Container fluid>
        <Row className="mb-3">
          <Col style={{ height: "80px" }}></Col>
        </Row>
      </Container>
      <div className="ct-btn d-flex mt-2 justify-content-evenly">
        <button className="btn btn-warning" onClick={handleConfirmExitBtn}>
          Atrás
        </button>
        <button className="btn btn-success">Editar</button>
      </div>
    </div>
  );
};

export default ActaDetails;

