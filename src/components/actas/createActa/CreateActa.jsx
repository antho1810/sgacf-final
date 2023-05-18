import React, { useEffect, useState } from "react";
import ActaService from "../../../services/ActasDataService";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { HiPlus } from "react-icons/hi";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import ParticipantesTableCreate from "./ParticipantesTableCreate";
import votosData from "./votosData";

import "./CreateActa.css";

function CreateActa() {
  const initialActaState = {
    numeroRef: "",
    arrMiembrosPresentes: [],
    lugar: "",
    modalidad: "",
    estado: "",
    horaInicio: "",
    horaFinal: "",
  };

  const [acta, setActa] = useState(initialActaState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActa({ ...acta, [name]: value });
  };

  const saveActa = () => {
    var data = {
      numeroRef: acta.numeroRef,
      fechaCreacion: acta.fechaCreacion,
      miembrosPresentes: acta.miembrosPresentes,
      lugar: acta.lugar,
      modalidad: acta.modalidad,
      estado: acta.estado,
      horaInicio: acta.horaInicio,
      horaFinal: acta.horaFinal,
    };

    ActaService.createActa(data)
      .then((response) => {
        setActa({
          numeroRef: response.data.numeroRef,
          fechaCreacion: new Date(),
          miembrosPresentes: response.data.miembrosPresentes.split(","),
          lugar: response.data.lugar,
          modalidad: response.data.modalidad,
          estado: response.data.estado,
          horaInicio: response.data.horaInicio,
          horaFinal: response.data.horaFinal,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newActa = () => {
    setActa(initialActaState);
    setSubmitted(false);
  };

  return (
    <>
      <div className="ct-header-ca">
        <div className="title">
          <h2>Crear una nueva acta</h2>
        </div>
        <div className="subtitle">
          <span>Rellene los campos y comience a construit una nueva acta</span>
        </div>
      </div>

      <Container fluid>
        <Row className="mb-3">
          <Col
            style={{
              height: "80px",
            }}
          >
            <Form.Group>
              <Form.Label>Número de referencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese numero de referencia"
              />
            </Form.Group>
          </Col>
          <Col
            style={{
              height: "80px",
            }}
          >
            <Form.Group>
              <Form.Label>Lugar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el lugar de la reunión"
              />
            </Form.Group>
          </Col>
          <Col
            style={{
              height: "80px",
            }}
          >
            <Form.Label>Modalidad</Form.Label>
            <Form.Select aria-label="Tipo de modalidad">
              <option>Seleccione</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="mixta">Mixta</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100px",
            }}
          >
            <Form.Label>Hora de inicio</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className="time-picker-small" />
            </LocalizationProvider>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100px",
            }}
          >
            <Form.Label>Hora de finalización</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className="time-picker-small" />
            </LocalizationProvider>
          </Col>
        </Row>
        <Row className="mb-3">
          <h3>Cronograma del acta</h3>
        </Row>
      </Container>
      <Container>
        <Row className="mb-3">
          <Col
            style={{
              height: "200px",
            }}
            xs={3}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Hora" className="time-picker-small" />
            </LocalizationProvider>
          </Col>
          <Col
            style={{
              height: "200px",
            }}
            xs={8}
          >
            <Form.Group>
              <textarea
                name="actividad"
                id="actividad"
                cols="75"
                rows="4"
                placeholder="Actividad realizada"
              ></textarea>
            </Form.Group>
          </Col>
          <Col xs={1}>
            <Button size="lg">
              <HiPlus></HiPlus>
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        {/* TABLA PARTICIPANTES */}
        <Row>
          <ParticipantesTableCreate></ParticipantesTableCreate>
        </Row>
        <Row style={{textAlign: "center"}}>
          <Col>
            <Button variant="primary">Añadir a miembros presentes</Button>
          </Col>
          <Col>
            <Button variant="danger">Añadir a miembros ausentes</Button>
          </Col>
          <Col>
            <Button variant="warning">Añadir a miembros invitados</Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Form.Label>Voto</Form.Label>
            <Form.Select aria-label="Tipo de voto a seleccionar">

              <option value="">Seleccione</option>
              {votosData.map((voto) => {

                return voto.elementos.map(elemento => {
                  console.log(elemento.tipo)
                  return (
                    <option value={elemento.tipo}>{elemento.tipo}</option>
                  )
                  })
                
              })}
            </Form.Select>
          </Col>
        </Row>
      </Container>

      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newActa}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <button onClick={saveActa} className="btn btn-success">
              Registrar acta
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateActa;
