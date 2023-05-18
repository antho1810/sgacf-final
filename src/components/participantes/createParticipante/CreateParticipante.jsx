import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CreateParticipante = () => {
      const [participante, setPartici] = useState();
      const [submitted, setSubmitted] = useState(false);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartici({ ...participante, [name]: value });
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
      12
    </div>
  );
};

export default CreateParticipante;
