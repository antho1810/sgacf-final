import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./CreateParticipante.css"

const CreateParticipante = () => {
  const initialParticipanteState = {
    nombre: "",
    apellido: "",
    cargo: "",
  };
  
  const [participante, setPartici] = useState(initialParticipanteState);
  const [submitted, setSubmitted] = useState(false);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartici({ ...participante, [name]: value });
      };

  const saveParticipante = () => {
    var data = {
      nombre: participante.nombre,
      apellido: participante.apellido,
      cargo: participante.cargo,
    };
  }

  const newParticipante = () => {
      setPartici(initialParticipanteState);
      setSubmitted(false);
  };
  
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
              {/* Numero REF */}
              <div className="form-group">
                <label htmlFor="numeroRef">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="numeroRef"
                  required
                  onChange={handleInputChange}
                  name="numeroRef"
                />
              </div>
              {/* Modalidad */}
              <div className="form-group">
                <label htmlFor="modalidad">Apellidos</label>
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
                <label htmlFor="lugar">Cargo</label>
                <input
                  type="text"
                  className="form-control"
                  id="lugar"
                  required
                  onChange={handleInputChange}
                  name="lugar"
                />
              </div>
            </div>
          </div>
        </Container>
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newParticipante}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <button onClick={saveParticipante} className="btn btn-success">
                Registrar participante
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

export default CreateParticipante;
