import React, { useEffect, useState } from "react";
import ActaService from "../../../services/ActasDataService";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { HiPlus, HiX } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ParticipantesTableCreate from "./ParticipantesTableCreate";
import votosData from "./votosData";

import "./CreateActa.css";

// Componente Cronograma
const Row = ({ id, onAddRow, onDeleteRow }) => {
  const handleClick = () => {
    onAddRow()
  }

  const handleDeteleClick = () => {
    onDeleteRow(id)
  }

  return (
    <div className="row mb-4 d-flex align-items-center">
    
      <div className="col-auto" style={{ display: "flex", flexDirection: "column" }}>
        <Form.Label>Hora</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker />
        </LocalizationProvider>
      </div>
      <div className="col-auto">
        <Form.Label>Actividad</Form.Label>
        <Form.Control as="textarea" style={{height: "70px"}} />
      </div>
      <div className="col-auto">
        <Button variant="success" className="me-2" onClick={handleClick}>
          <HiPlus />
        </Button>

        {id > 0 && (
          <Button variant="danger" onClick={handleDeteleClick}>
            <HiX />
          </Button>
        )}
      </div>
    </div>
  )
}

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

  const [rows, setRows] = useState([])

  const handleAddRow = () => { 
    setRows([...rows, {id: Date.now()}])
  }

  const handleDeleteRow = (id) => { 
    setRows(rows.filter((row) => row.id !== id))
  }

  const [votoSeleccionado, setVotoSeleccionado] = useState("")
  const [formulario, setFormulario] = useState({});

  const handleChangeVotos = (event) => {
    const voto = event.target.value;
    setVotoSeleccionado(voto);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActa({ ...acta, [name]: value });
  };

  const handleChangeCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((prevFormulario)=> ({ ...formulario, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // se realiza la logica del envio de acta
    console.log(formulario);
  }

  const renderCampos = () => {
    const voto = votosData.find((voto) => voto.nombre === votoSeleccionado);

    if (!voto) return null;

    return voto.campos.map((campo) => {
      if (campo.subElementos) {
        return (
          <div className="col-auto mb-2" key={campo.nombre}>
            <Form.Label className="select-label">{campo.etiqueta}:</Form.Label>
            <Form.Select id={campo.nombre} name={campo.nombre} value={formulario[campo.nombre] || ""} onChange={handleChangeCampo}>
              <option value="">-- Seleccionar --</option>
              {campo.subElementos.map((subElementos) => (
                <option key={subElementos} value={subElementos}>
                  {subElementos}
                </option>
              ))}
            </Form.Select>
          </div>
        )
      } else {
        return (
          <div className="col-auto mb-2" key={campo.nombre}>
            <Form.Label>{campo.etiqueta}:</Form.Label>
            <Form.Control type={campo.tipo} id={campo.nombre} name={campo.nombre}  value={formulario[campo.nombre] || ""} onChange={handleChangeCampo} />
          </div>
        )
      }
    })
  }

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
      <div className="container-fluid">
        <div className="ct-header-ca">
          <div className="title">
            <h2>Crear una nueva Acta</h2>
          </div>
          <div className="subtitle">
            <span>Rellene los campos y cree un nuevo participante</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-auto">
            <Form.Label>Numero de referencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="# Ref"
              className="w-100 form-control-custom"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-auto">
            <Form.Label>Lugar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lugar"
              className="w-100 form-control-custom"
            />
          </div>
          <div className="col-auto">
            <Form.Label>Modalidad</Form.Label>
            <Form.Select aria-label="Tipo de modalidad">
              <option>Seleccione</option>
              <option value="virtual">Virtual</option>
              <option value="presencial">Presencial</option>
              <option value="mixta">Mixta</option>
            </Form.Select>
          </div>
          <div className="col-auto d-flex flex-column">
            <Form.Label>Hora inicio</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </div>
          <div className="col-auto d-flex flex-column">
            <Form.Label>Hora final</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </div>
        </div>

        {/* Cronograma */}
        <div className="container-fluid">
          <div className="row mb-4">
            <h3>Cronograma del acta</h3>
          </div>
          {/* Multi Task space */}
          {rows.map((row) => (
            <Row
              key={row.id}
              id={row.id}
              onAddRow={handleAddRow}
              onDeleteRow={handleDeleteRow}
            />
          ))}
          <Row
            id={Date.now()}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
          />
        </div>
        {/* Table Participante */}
        <div className="container-fluid">
          <div className="row mb-4">
            <ParticipantesTableCreate />
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ gap: "30px" }}
          >
            <Button variant="primary">Añadir a miembros presentes</Button>
            <Button variant="warning">Añadir a miembros invitados</Button>
            <Button variant="danger">Añadir a miembros ausentes</Button>
          </div>
        </div>

        {/* Votos */}
        <div className="container-fluid">
          <div className="row mb-4">
            <h3>Votos:</h3>
          </div>
          <div className="row mb-3">
            <div className="col-auto">
              <Form.Label>Seleccione el tipo de voto:</Form.Label>
              <Form.Select
                id="votos"
                name="votos"
                value={votoSeleccionado}
                onChange={handleChangeVotos}
              >
                <option value="">-- Seleccionar --</option>
                {votosData.map((voto) => (
                  <option key={voto.nombre} value={voto.nombre}>
                    {voto.nombre}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">{renderCampos()}</div>
          <div className="row">
            <button onClick={saveActa} className="btn btn-success">
              Registrar acta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateActa;
