import React, { useState, useEffect } from "react";
import ParticipantesService from "../../../services/ParticipantesDataServices";
import { useParams } from "react-router-dom";

const UpdateParticipante = () => {
    useEffect(() => {
    const fetchData = async () => {
      const response = await ParticipantesService.getParticipante(id);
      setPartici(response.data);
    };
    fetchData();
  }, []);

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

  const { id } = useParams();

  // useEffect((req, res) => {
  //   ParticipantesService.getParticipante(id);
  // });

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
    ParticipantesService.updateParticipante(id, participante)
      .then((response) => {
        console.log("Participante actualizado correctamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el participante:", error);
      });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
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
        <div>
          <div className="subtitle">
            <span>Rellene los campos y actualice el participante</span>
          </div>
{/*           <div className="subtitle">
            <span className="fw-bold text-danger">
              Nota: Si dejas los campos de vacios, los campos se actualizan
              vacios.
            </span>
          </div> */}
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
