import React, { useState } from "react";
import ActaService from "../../../services/ActasDataService";
import { DateRangePicker, SelectPicker } from "rsuite";
import { HiPlus } from "react-icons/hi";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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
  const data = ["presencial", "virtual", "mixta"].map((item) => ({
    label: item,
    value: item,
  }));

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
        <div className="ct-form">
          {/* Container Informacion */}
          <div className="ct-form-inputs">
            {/* Numero REF */}
            <div className="form-group">
              <label htmlFor="numeroRef">Numero Ref</label>
              <input
                type="Number"
                className="form-control"
                id="numeroRef"
                required
                onChange={handleInputChange}
                name="numeroRef"
              />
            </div>
            {/* Modalidad */}
            <div className="form-group">
              <label htmlFor="modalidad">Modalidad</label>
              <input
                type="text"
                className="form-control"
                id="modalidad"
                required
                onChange={handleInputChange}
                name="modalidad"
              />
            </div>
            {/* Lugar */}
            <div className="form-group">
              <label htmlFor="lugar">Lugar</label>
              <input
                type="text"
                className="form-control"
                id="lugar"
                required
                onChange={handleInputChange}
                name="lugar"
              />
            </div>
            {/* Hora Inicio - Fin */}
            <div className="form-group">
              <p>Hora inicio - fin</p>
              <DateRangePicker
                format="HH:mm"
                ranges={[]}
                defaultCalendarValue={[
                  new Date("2023-02-01 00:00"),
                  new Date("2023-12-01 23:59"),
                ]}
              />
            </div>
          </div>
          {/* Container Ejecucion Acta */}
          <div className="container-fluid ct-ejec-acta">
            <h4 className="mb-4">Cronograma del dia</h4>
            <div className="ct-form-inputs">
              <div className="form-group">
                <label htmlFor="HORA">Hora</label>
                <input
                  type=""
                  className="form-control"
                  id="HORA"
                  required
                  onChange={handleInputChange}
                  name="HORA"
                />
              </div>
              <div className="form-group">
                <label htmlFor="actividad">Actividad</label>
                <textarea
                  className="form-control"
                  id="actividad"
                  required
                  onChange={handleInputChange}
                  name="actividad"
                />
              </div>
              <div className="form-group">
                <Button className="plus-item">
                  <HiPlus/>
                </Button>
              </div>
            </div>
          </div>
          {/* Container Tabla Participante */}
          <div className="table"></div>

          {/* Container VOTOS */}
          <div className="ct-group-votos"></div>

          {/* Container Adjuntar documentos */}
          <div className="ct-form-doc"></div>
        </div>
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
            {/*
          estado: response.estado, */}

            {/* AQUI VA UNA TABLA PARA SELECCIONAR LOS MIEMBROS*/}
            {/* <div className="form-group">
            <label htmlFor="miembrosPresentes">miembrosPresentes</label>
            <input
              type="text"
              className="form-control"
              id="miembrosPresentes"
              required
              value={acta.miembrosPresentes}
              onChange={handleInputChange}
              name="miembrosPresentes"
            />
          </div> */}

            {/* AQUI VA UNA TABLA PARA SELECCIONAR LOS MIEMBROS*/}
            {/* <div className="form-group">
            <label htmlFor="miembrosPresentes">miembrosPresentes</label>
            <input
              type="text"
              className="form-control"
              id="miembrosPresentes"
              required
              value={acta.miembrosPresentes}
              onChange={handleInputChange}
              name="miembrosPresentes"
            />
          </div> */}

            {/* AQUI VA UNA TABLA PARA SELECCIONAR LOS MIEMBROS*/}
            {/* <div className="form-group">
            <label htmlFor="miembrosPresentes">miembrosPresentes</label>
            <input
              type="text"
              className="form-control"
              id="miembrosPresentes"
              required
              value={acta.miembrosPresentes}
              onChange={handleInputChange}
              name="miembrosPresentes"
            />
          </div> */}

            <button onClick={saveActa} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateActa;
