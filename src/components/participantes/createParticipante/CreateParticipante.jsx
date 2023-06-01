import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./CreateParticipante.css"
import ParticipantesService from "../../../services/ParticipantesDataServices"

const CreateParticipante = () => {
  // const participanteInfo = {
  //   nombre: "",
  //   apellido: "",
  //   cargo: "",
  // };

  const [participante, setPartici] = useState ({
    nombre: "",
    apellido: "",
    cargo: "",
  });
  // const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    setPartici({ ...participante, [e.target.name]: e.target.value });
  };

  // const saveParticipante = () => {
  //   var data = {
  //     nombre: participante.nombre,
  //     apellido: participante.apellido,
  //     cargo: participante.cargo,
  //   };
  // };

  // ENVÍO DEL FORMULARIO PARA LA CREACIÓN DE PARTICIPANTE
  const handleSubmitted = () => {
    setPartici({
      ...participante,
    });

    // Aquí puedes hacer uso de axios para enviar la información a la base de datos
    setTimeout(() => {
      ParticipantesService.createParticipante(participante)
        .then((response) => {
          console.log("Participante enviado exitosamente:", response.data);
        })
        .catch((error) => {
          console.error("Error al enviar el participante:", error);
        });
    }, 2);
  };

  // const newParticipante = () => {
  //   setPartici (participanteInfo);
  //   setSubmitted(false);
  // };

  return (
    <div>
      <div className="ct-header-ca">
        <div className="title">
          <h2>Crear un nuevo participante</h2>
        </div>
        <div className="subtitle">
          <span>Rellene los campos y cree un nuevo participante</span>
        </div>
      </div>
      <Container fluid>
        <div className="ct-form">
          {/* Container Informacion */}
          <div className="ct-form-inputs">
            {/* Nombres */}
            <div className="form-group">
              <label htmlFor="nombre">Nombres</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Nombres"
                value={participante.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Apellidos */}
            <div className="form-group">
              <label htmlFor="apellido">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                placeholder="Apellidos"
                value={participante.apellido}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Cargo */}
            <div className="form-group">
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                className="form-control"
                id="cargo"
                name="cargo"
                placeholder="Cargo"
                value={participante.cargo}
                required
                onChange={handleInputChange}
                />
            </div>
          </div>
        </div>
      </Container>
      <div className="submit-form">
        
          <button onClick={handleSubmitted} className="btn btn-success">
            Registrar participante
          </button>
      
        {/* {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newParticipante}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleSubmitted} className="btn btn-success">
              Registrar participante
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreateParticipante;
