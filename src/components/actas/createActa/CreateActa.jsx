import React, { useState } from "react";
import ActaService from "../../../services/ActaDataService";

import Container from "react-bootstrap/Container";

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
        <div className="ct-form">
          <div className="ct-form-inputs">
            <div className="form-group">
              <label htmlFor="numeroRef">Número de referencia</label>
              <input
                type="text"
                className="form-control"
                id="numeroRef"
                required
                value={acta.numeroRef}
                onChange={handleInputChange}
                name="numeroRef"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modalidad">modalidad</label>
              <input
                type="text"
                className="form-control"
                id="modalidad"
                required
                value={acta.modalidad}
                onChange={handleInputChange}
                name="modalidad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lugar">lugar</label>
              <input
                type="text"
                className="form-control"
                id="lugar"
                required
                value={acta.lugar}
                onChange={handleInputChange}
                name="lugar"
              />
            </div>
          </div>

          <div className="ct-form-inputs">
            <div className="form-group">
              <label htmlFor="horaInicio">horaInicio</label>
              <input
                type="text"
                className="form-control"
                id="horaInicio"
                required
                value={acta.horaInicio}
                onChange={handleInputChange}
                name="horaInicio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="horaFinal">horaFinal</label>
              <input
                type="text"
                className="form-control"
                id="horaFinal"
                required
                value={acta.horaFinal}
                onChange={handleInputChange}
                name="horaFinal"
              />
            </div>
          </div>

          <div className="ct-form-inputs">
            <div className="form-group">
              <label htmlFor="desarrolloActa">desarrollo del acta</label>
              <input
                type="text"
                className="form-control"
                id="desarrolloActa"
                required
                value={acta.desarrolloActa}
                onChange={handleInputChange}
                name="desarrolloActa"
              />
            </div>
          </div>

          <div className="ct-form-inputs">
            <div className="form-group">
              <label htmlFor="articulos">articulos</label>
              <input
                type="text"
                className="form-control"
                id="articulos"
                required
                value={acta.articulos}
                onChange={handleInputChange}
                name="articulos"
              />
            </div>
          </div>

          <div className="ct-form-inputs">
            <div className="form-group">
              <label htmlFor="docsSoporte">Adjuntar documentos</label>
              <input
                type="text"
                className="form-control"
                id="docsSoporte"
                required
                value={acta.docsSoporte}
                onChange={handleInputChange}
                name="docsSoporte"
              />
            </div>
          </div>
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
