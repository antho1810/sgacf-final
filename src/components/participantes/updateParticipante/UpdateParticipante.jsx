import React, { useState, useEffect } from "react";
import ParticipantesService from "../../../services/ParticipantesDataServices";

const UpdateParticipante = () => {
  //   const [participantes, setParticipantes] = useState([]);

  // Actualizar Participante
  const [participante, setPartici] = useState({
    nombre: "",
    apellido: "",
    cargo: "",
  });

  const handleInputChange = (e) => {
    setPartici({
      ...participante,
      [e.target.name]: e.target.value,
    });
  };

  const updateParticipante = async (req) => {
    ParticipantesService.updateParticipante(participante)
      .then((response) => {
        console.log("Participante actualizado exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el participante:", error);
      });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  useEffect((req, res) => {
    ParticipantesService.getParticipante(participante);
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleChangeStatusModalFalse = () => {
    setIsUpdateModalOpen(false);
  };

  const handleShowConfirmModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleConfirmExitBtn = () => {
    setIsUpdateModalOpen(false);
    window.location.href = "/";
  };

  const handleConfirmUpdate = () => {
    updateParticipante();
  };

  return (
    <div>
      {/* MODAL CERRAR */}
      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea actualizar el participante?
            </h2>

            <div className="ct-btn d-flex justify-content-evenly">
              <button
                className="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button className="btn btn-primary" onClick={handleConfirmUpdate}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ct-header-ca">
        <div className="title">
          <h2>Actalizando el participante</h2>
        </div>
        <div className="subtitle">
          <span>Rellene los campos y actualice el participante</span>
        </div>
      </div>

      <div className="container-fluid">
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
                required
                placeholder="Nombres"
                name="nombre"
                value={participante.nombre}
                onChange={handleInputChange}
              />
            </div>
            {/* Apellidos */}
            <div className="form-group">
              <label htmlFor="apellido">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                required
                placeholder="Apellidos"
                name="apellido"
                value={participante.apellido}
                onChange={handleInputChange}
              />
            </div>
            {/* Cargo */}
            <div className="form-group">
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                className="form-control"
                id="cargo"
                required
                placeholder="Cargo"
                name="cargo"
                value={participante.cargo}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ct-btn d-flex mt-2 justify-content-evenly">
        <button className="btn btn-warning" onClick={handleConfirmExitBtn}>
          Atrás
        </button>
        <button className="btn btn-primary" onClick={handleShowConfirmModal}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UpdateParticipante;
