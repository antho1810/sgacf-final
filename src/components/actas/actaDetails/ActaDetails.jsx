import React, {
  useState,
  // useMemo,
  useEffect
} from "react";
import ActaService from "../../../services/ActasDataService";
import { Container, Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { useParams } from "react-router-dom";

const ActaDetails = () => {
  const [acta, setActa] = useState([]);

  const { ref } = useParams();

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
                  <span>{acta.estado}</span>{" "}
                </Badge>
              ) : (
                <Badge className="confirmed">
                  <span>{acta.estado}</span>
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
            <p> {acta.horaInicia} </p>
          </div>
          <div className="me-4 text-center">
            <h1 className="h4">Hora final</h1>
            <p> {acta.horaFinal} </p>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="me-4 text-center">
            <h1 className="h4">Miembros presentes</h1>
            {acta.miembrosPresentes ? (
              acta.miembrosPresentes.map((item) => (
                <div key={item._id}>
                  <p>
                    {item.nombre} {item.apellido}
                  </p>
                </div>
              ))
            ) : (
              <span>No hay miembros presentes</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex mt-2">
        <div className="me-4 text-center">
          <h1 className="h4">Cronograma</h1>
          <p className="center">{acta.cronograma}</p>
        </div>
      </div>
      {/* </div> */}
      {/* Container Articulos */}
      <Container className="ct-articulos">
        <span className="header">Articulos</span>
      </Container>
      {/* Container Documentos Soporte */}
      <div className="ct-docsSoprot">Documentos adjuntos</div>
      <Container fluid>
        <Row className="mb-3">
          <Col style={{ height: "80px" }}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ActaDetails;
