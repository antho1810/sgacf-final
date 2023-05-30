import { useState } from 'react';
import './CreateActa.css';

import Form from 'react-bootstrap/Form';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ActaService from '../../../services/ActasDataService';

const CreateActa = () => {
  // ESTADO DEL ACTA INICIAL
  const [actaInicial, setActaInicial] = useState({
    lugar: '',
    modalidad: '',
    horaInicio: '',
    horaFinal: '',
    cronograma: '',
    miembrosPresentes: [],
    miembrosAusentes: [],
    miembrosInvitados: [],
    articulos: [],
    docsSoporte: [],
  });

  // PARTE 1 : INFORMACIÓN BÁSICA

  const handleInputChange = (e) => {
    setActaInicial({
      ...actaInicial,
      [e.target.name]: e.target.value,
    });
  };

  const handleHoraInicioChange = (horaInicio) => {
    setActaInicial({
      ...actaInicial,
      horaInicio,
    });
  };

  const handleHoraFinalChange = (horaFinal) => {
    setActaInicial({
      ...actaInicial,
      horaFinal,
    });
  };

  const handleNextBtn = () => {
    console.log(actaInicial);
  };

  // ENVIAR EL FORMULARIO LOCALHOST:4000/API/ACTAS

  const handleSubmitted = () => {

    ActaService.createActa(actaInicial)
      .then((response) => {
        console.log('Acta enviada exitosamente:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar el acta:', error);
      });
  };

  return (
    <>
      <div className="container fluid">
        <div className="row">
          <div className="form-group">
            {/* LUGAR */}
            <div className="col-auto">
              <Form.Label>Lugar</Form.Label>
              <Form.Control
                type="text"
                name="lugar"
                placeholder="Lugar"
                value={actaInicial.lugar}
                onChange={handleInputChange}
                className="w-100 form-control-custom"
              />
            </div>
            {/* MODALIDAD */}
            <div className="col-auto">
              <Form.Label>Modalidad</Form.Label>
              <Form.Select
                name="modalidad"
                value={actaInicial.modalidad}
                onChange={handleInputChange}
                aria-label="Tipo de modalidad"
              >
                <option>-- Seleccionar --</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
                <option value="mixta">Mixta</option>
              </Form.Select>
            </div>
            {/* HORA INICIO */}
            <div className="col-auto d-flex flex-column">
              <Form.Label>Hora inicio</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  name="horaInicio"
                  value={actaInicial.horaInicio}
                  onChange={handleHoraInicioChange}
                />
              </LocalizationProvider>
            </div>
            {/* HORA FINAL */}
            <div className="col-auto d-flex flex-column">
              <Form.Label>Hora final</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  name="horaFinal"
                  value={actaInicial.horaFinal}
                  onChange={handleHoraFinalChange}
                />
              </LocalizationProvider>
            </div>
            <div className="col-auto">
              <div className="form-group">
                <textarea
                  name="cronograma"
                  id="cronograma"
                  cols="60"
                  rows="10"
                  onChange={handleInputChange}
                  value={actaInicial.cronograma}
                ></textarea>
              </div>
            </div>
            <div className="container d-flex">
              <button onClick={handleNextBtn} className="btn btn-primary">
                Siguiente
              </button>
              <br />
              <button onClick={handleSubmitted} className="btn btn-success">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActa;
