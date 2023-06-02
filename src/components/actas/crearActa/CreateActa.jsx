import React, { useEffect, useMemo, useState } from "react";

import GlobalParticipantesFilter from "./GlobalFilter";
import { votosData } from "./votosData";

import "./CreateActa.css";
import "./Modal.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { HiPlus, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ActaService from "../../../services/ActasDataService";
import ParticipantesService from "../../../services/ParticipantesDataServices";

import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";

const CreateActa = () => {
  // ESTADO DEL ACTA INICIAL
  const [actaInicial, setActaInicial] = useState({
    lugar: "",
    modalidad: "",
    horaInicio: "",
    horaFinal: "",
    cronograma: "",
    miembrosPresentes: [],
    miembrosAusentes: [],
    miembrosInvitados: [],
    articulos: [],
    docsSoporte: [],
  });

  // ENVIAR EL FORMULARIO LOCALHOST:4000/API/ACTAS
  const handleSubmitted = () => {
    ActaService.createActa(actaInicial)
      .then((response) => {
        console.log("Acta enviada exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar el acta:", error);
      });

    window.location.href = "/";
  };

  // MODALES

  const [isOpen, setIsOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleChangeStatusModalOk = () => {
    setIsOpen(true);
  };

  const handleChangeStatusModalFalse = () => {
    setIsOpen(false);
    setIsSendModalOpen(false);
  };

  const handleShowConfirmModal = () => {
    setIsSendModalOpen(true);
  };

  const handleConfirmExitBtn = () => {
    setIsOpen(false);
    window.location.href = "/";
  };

  const handleConfirmSend = () => {
    ActaService.createActa(actaInicial)
      .then((response) => {
        console.log("Acta enviada exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar el acta:", error);
      });

    setTimeout(() => {
      // window.location.href = "/";
    }, 2000);
  };

  // FUNCIONALIDAD PASO A PASO
  const [currentStep, setCurrentStep] = useState(1);

  const handleIncrementStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleDecrementStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // PARTE 1 : INFORMACIÓN BÁSICA
  // -----------------------------------------------------------------------
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

  // PARTE 2: MIEMBROS DEL ACTA
  // -----------------------------------------------------------------------------

  // ESTADO INICIAL PARA LA SELECCIÓN DEL PARTICIPANTE CON EL CHECKBOX
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // ARREGLOS Y OBJETOS INICIALES PARA LA INDEXACIÓN DE LOS MIEMBROS
  const [groupPresentes, setGroupPresentes] = useState([]);
  const [groupAusentes, setGroupAusentes] = useState([]);
  const [groupInvitados, setGroupInvitados] = useState([]);

  // ESTADO QUE MUESTRA EL TEXTO INICIAL DE UNA ALERTA PARA INFORMAR SI UN MIEMBRO YA FUE
  // AÑADIDO
  const [isAdded, setIsAdded] = useState(false);

  // ARREGLO DE OBJETOS QUE RECOPILA LOS _ID DE CADA PARTICIPANTE PARA ENVIAR
  // AL BODY REQUEST MEDIANTE onSubmitted()
  const [objIdPresentes, setObjIdPresentes] = useState([{ _id: "" }]);
  const [objIdAusentes, setObjIdAusentes] = useState([{ _id: "" }]);
  const [objIdInvitados, setObjIdInvitados] = useState([{ _id: "" }]);

  // ESTADO INICIAL PARA LOS DATOS DE LA TABLA <<PARTICIPANTES>>
  const [participantes, setParticipantes] = useState([]);

  // OBTENER DATOS DE LA TABLA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ParticipantesService.getAllParticipantes();
        setParticipantes(response.data);
      } catch (e) {
        console.error("Error al obtener los datos:", e);
      }
    };

    fetchData();
  }, []);

  const data = useMemo(
    () =>
      participantes.map((participante) => ({
        _id: participante._id,
        nombre: participante.nombre,
        apellido: participante.apellido,
        cargo: participante.cargo,
      })),
    [participantes]
  );

  // CAMBIA EL ESTADO DEL CHECKBOX EN ESE MOMENTO
  const handleCheckboxChange = (participantId) => {
    setSelectedParticipant(participantId);
  };

  // AQUÍ HAY TRES FUNCIONES PARA LOS TRES BOTONES
  // EL FUNCIONAMIENTO DE ESTOS BOTONES YA ESTÁ VERIFICADO, SÓLO ES PARA MEJORAR EL CONTEXTO
  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS PRESENTES
  const handleBtnPresClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { _id, nombre, apellido } = selectedParticipantData;
        const fullName = `${nombre} ${apellido}`;

        if (!groupPresentes.includes(fullName)) {
          setTimeout(() => {
            setGroupPresentes((prevGroupPresentes) => [
              ...prevGroupPresentes,
              fullName,
            ]);
          }, 2);

          setObjIdPresentes((prevObjIdPresentes) => [
            ...prevObjIdPresentes,
            { _id: _id },
          ]);

          console.log(objIdPresentes);
          setIsAdded(false);
        } else {
          setIsAdded(true);
        }
      }
    }
  };

  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS INVITADOS
  const handleBtnInvClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { nombre, apellido } = selectedParticipantData;
        const fullName = `${nombre} ${apellido}`;

        if (groupInvitados.includes(fullName)) {
          setIsAdded(true);
        } else {
          setIsAdded(false);
          setGroupInvitados((prevGroupInvitados) => [
            ...prevGroupInvitados,
            fullName,
          ]);
        }
      }
    }
  };

  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS AUSENTES
  const handleBtnAusClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { nombre, apellido } = selectedParticipantData;
        const fullName = `${nombre} ${apellido}`;

        if (groupAusentes.includes(fullName)) {
          setIsAdded(true);
        } else {
          setIsAdded(false);
          setGroupAusentes((prevGrouAusentes) => [
            ...prevGrouAusentes,
            fullName,
          ]);
        }
      }
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "_id",
        disableSortBy: true,
        Cell: ({ value }) => (
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(value)}
            checked={value === selectedParticipant}
            onClick={(e) => e.stopPropagation}
          />
        ),
      },
      { Header: "nombre", accessor: "nombre" },
      { Header: "apellido", accessor: "apellido" },
      { Header: "cargo", accessor: "cargo" },
    ],
    [selectedParticipant]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Estado inicial de la paginación
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  // PARTE 4: VOTOS
  // --------------------------------------------------------------------------------------------

  const [votoSeleccionado, setVotoSeleccionado] = useState("");
  const [formulario, setFormulario] = useState({});

  const handleChangeVotos = (event) => {
    const voto = event.target.value;
    setVotoSeleccionado(voto);
  };

  const handleChangeCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const renderCampos = () => {
    const voto = votosData.find((voto) => voto.nombre === votoSeleccionado);

    if (!voto) return null;

    return voto.campos.map((campo) => {
      if (campo.subElementos) {
        return (
          <div className="col-auto mb-2" key={campo.nombre}>
            <Form.Label className="select-label">{campo.etiqueta}:</Form.Label>
            <Form.Select
              id={campo.nombre}
              name={campo.nombre}
              value={formulario[campo.nombre] || ""}
              onChange={handleChangeCampo}
            >
              <option value="">-- Seleccionar --</option>
              {campo.subElementos.map((subElemento) => (
                <option key={subElemento} value={subElemento}>
                  {subElemento}
                </option>
              ))}
            </Form.Select>
          </div>
        );
      } else {
        return (
          <div className="col-auto mb-2" key={campo.nombre}>
            <label>{campo.etiqueta}:</label>
            <Form.Control
              type={campo.tipo}
              id={campo.nombre}
              name={campo.nombre}
              className="form-control-custom w-75"
              value={formulario[campo.nombre] || ""}
              onChange={handleChangeCampo}
            />
          </div>
        );
      }
    });
  };

  return (
    <>
      {/* MODAL CERRAR */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea salir?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button
                className="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmExitBtn}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL Enviar CERRAR */}
      {isSendModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea enviar el acta?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button
                className="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button className="btn btn-primary" onClick={handleConfirmSend}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid">
        {/* PAGE HEADER */}
        <div className="create-acta-main-header mb-2">
          <div className="title-actas">
            <h1 className="h1">Crear un acta</h1>
          </div>
        </div>

        {/* PARTE 1: INFORMACIÓN BÁSICA */}
        {/* -------------------------------------------------------------------------------- */}
        <div className={`formulario ${currentStep !== 1 && "oculto"}`}>
          {currentStep === 1 && (
            <>
              <div className="create-acta-header mb-4">
                <h3 className="h3 mt-2">Información básica</h3>
              </div>
              <div className="row mb-4">
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
              </div>
              <div className="create-acta-header mb-4">
                <h2 className="h2">Cronograma del acta</h2>
              </div>

              <div className="row mb-4">
                <textarea
                  name="cronograma"
                  id="cronograma"
                  value={actaInicial.cronograma}
                  onChange={handleInputChange}
                  className="cronograma-textarea"
                  cols="50"
                  rows="10"
                  placeholder="Introduza las actividades realizadas durante el acta"
                ></textarea>
              </div>
            </>
          )}
        </div>

        {/* PARTE 2: MIEMBROS DEL ACTA */}
        <div className={`formulario ${currentStep !== 2 && "oculto"}`}>
          {currentStep === 2 && (
            <>
              <div className="create-acta-header mb-4">
                <h3 className="h3 mt-2">Seleccionar miembros del acta</h3>
              </div>
              <div className="row" style={{ gap: "20px" }}>
                <div className="col h-auto d-flex flex-column justify-content-center">
                  <div className="container-fluid tabla-participantes-header mb-4">
                    <h2 className="h2 fw-bold">Tabla de participantes</h2>
                  </div>

                  <div className="container-fluid">
                    <GlobalParticipantesFilter
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                    />
                    <Table style={{ maxWidth: "480px" }} {...getTableProps()}>
                      <thead className="table-header">
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                key={column.numeroRef}
                                className="head-column"
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                              >
                                {column.render("Header")}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <HiChevronDown />
                                    ) : (
                                      <HiChevronUp />
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <>
                              <tr className="row-column" {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr>
                                <td colSpan="10" className="no-borders"></td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>

                  <div
                    className="container-fluid d-flex justify-content-end mb-4"
                    style={{ gap: "10px" }}
                  >
                    <div>
                      <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      >
                        {"<<"}
                      </button>{" "}
                      <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      >
                        {"<"}
                      </button>{" "}
                      <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        {">"}
                      </button>{" "}
                      <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {">>"}
                      </button>{" "}
                      <span>
                        Página{" "}
                        <strong>
                          {pageIndex + 1} de {pageOptions.length}
                        </strong>{" "}
                      </span>
                      <span>
                        | Ir a la página:{" "}
                        <input
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={(e) => {
                            const page = e.target.value
                              ? Number(e.target.value) - 1
                              : 0;
                            gotoPage(page);
                          }}
                          style={{ width: "50px" }}
                        />
                      </span>{" "}
                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                        }}
                      >
                        {[5, 10, 15, 20].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-center"
                    style={{ gap: "30px" }}
                  >
                    <Button
                      onClick={(e) => handleBtnPresClick(e)}
                      className="custom-btn custom-primary"
                    >
                      <HiPlus />
                      <span className="small-btn-text">Miembros presentes</span>
                    </Button>

                    <Button
                      className="custom-btn custom-secondary"
                      onClick={(e) => handleBtnInvClick(e)}
                    >
                      <HiPlus />
                      <span className="small-btn-text">Miembros invitados</span>
                    </Button>

                    <Button
                      className="custom-btn custom-third"
                      onClick={(e) => handleBtnAusClick(e)}
                    >
                      <HiPlus />
                      <span className="small-btn-text">Miembros ausentes</span>
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    {isAdded && (
                      <div className="alert-is-added is-added-ok">
                        El miembro ya fue añadido
                      </div>
                    )}
                  </div>
                </div>
                <div className="col h-auto d-flex flex-column justify-content-center">
                  <div className="row d-flex flex-column">
                    <div className="col">
                      <div className="container-fluid tabla-participantes-header mb-4">
                        <h2 className="h2 fw-bold">
                          Participantes seleccionados
                        </h2>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        className="row d-flex flex-column"
                        style={{ gap: "30px" }}
                      >
                        <div className="col-auto">
                          <h3 className="h3">Miembros presentes</h3>
                          <div
                            className="container-fluid mt-3 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupPresentes.map((presente) => (
                              <div className="tag-miembro tag-pres">
                                {presente}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-auto">
                          <h3 className="h3">Miembros invitados</h3>
                          <div
                            className="container-fluid mt-3 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupInvitados.map((invitado) => (
                              <div className="tag-miembro tag-inv">
                                {invitado}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-auto">
                          <h3 className="h3">Miembros ausentes</h3>
                          <div
                            className="container-fluid mt-3 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupAusentes.map((ausente) => (
                              <div className="tag-miembro tag-aus">
                                {ausente}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* PARTE 3: VOTOS DEL ACTA */}
        {/* -------------------------------------------------------------------------------- */}
        <div className={`formulario ${currentStep !== 3 && "oculto"}`}>
          {currentStep === 3 && (
            <>
              <div className="create-acta-header mb-4">
                <h3 className="h3 mt-2">Seleccionar los votos del acta</h3>
              </div>
              <div className="row mb-3">
                <div className="col-auto">
                  <Form.Label>Seleccionar votos:</Form.Label>
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

              <div className="row mb-4">{renderCampos()}</div>
            </>
          )}
        </div>

        {/* PARTE 4: DOCUMENTOS DE SOPORTE */}
        {/* -------------------------------------------------------------------------------- */}
        <div className={`formulario ${currentStep !== 4 && "oculto"}`}>
          {currentStep === 4 && (
            <>
              <div className="create-acta-header mb-4">
                <h3 className="h3 mt-2">Adjuntar documentos de soporte</h3>
              </div>
              <div className="row mb-4"></div>
            </>
          )}
        </div>

        {/* BOTONES DE ACCIONES (CANCELAR, ATRÁS, SIGUIENTE) */}
        {/* -------------------------------------------------------------------------------- */}
        <div
          className="container-fluid mt-4 d-flex justify-content-between"
          style={{ gap: "15px" }}
        >
          <button
            className="btn btn-danger"
            role="button"
            onClick={handleChangeStatusModalOk}
          >
            Salir
          </button>
          <div className="container-fluid d-flex justify-content-end">
            {currentStep > 1 && (
              <button
                className="btn btn-secondary me-2"
                onClick={handleDecrementStep}
              >
                Atrás
              </button>
            )}
            {currentStep < 4 && (
              <button className="btn btn-primary" onClick={handleIncrementStep}>
                Siguiente
              </button>
            )}

            {currentStep >= 4 && (
              <button
                className="btn btn-success"
                onClick={handleShowConfirmModal}
              >
                Enviar acta
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActa;