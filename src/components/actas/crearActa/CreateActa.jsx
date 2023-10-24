import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import GlobalParticipantesFilter from "./GlobalFilter";
import { votosData } from "./votosData";

import "./CreateActa.css";
import "./Modal.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import {
  HiPlus,
  HiBadgeCheck,
  HiChevronDown,
  HiChevronUp,
  HiX,
} from "react-icons/hi";

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
import httpCommon from "../../../http-common";

const CreateActa = () => {
  // ESTADO DEL ACTA INICIAL
  const [actaInicial, setActaInicial] = useState({
    lugar: "",
    modalidad: "",
    horaInicio: "",
    horaFinal: "",
    cronograma: "",
    miembrosPresentes: [
      {
        id: "",
      },
    ],
    miembrosAusentes: [
      {
        id: "",
      },
    ],
    miembrosInvitados: [
      {
        id: "",
      },
    ],
    articulos: [],
    documentosSoporte: [],
  });

  const handleConfirmSend = () => {
    if (camposRequeridosLlenos()) {
      console.log(actaInicial);

      ActaService.createActa(JSON.stringify(actaInicial))
        .then((response) => {
          console.log("Acta enviada exitosamente:", response.data);
        })
        .catch((error) => {
          console.error("Error al enviar el acta:", error);
        });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
       Swal.fire({
         icon: "error",
         title: "Campos requeridos vacíos",
         text: "Por favor, complete todos los campos requeridos.",
       });
    }
  };

  const camposRequeridosLlenos = () => {
    if (!actaInicial.lugar) {
      return false;
    }

    if (!actaInicial.modalidad) {
      return false;
    }

    if (!actaInicial.horaInicio) {
      return false;
    }
    if (!actaInicial.horaFinal) {
      return false;
    }

    if (!actaInicial.cronograma) {
      return false;
    }

    return true;
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

  // FUNCIONALIDAD PASO A PASO
  const [currentStep, setCurrentStep] = useState(1);

  const handleIncrementStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleDecrementStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // PASO 2 RECOPILACIONES: MIEMBROS

  const [isMiembrosPresentesModalOpen, setIsMiembrosPresentesModalOpen] =
    useState(false);
  const [isMiembrosInvitadosModalOpen, setIsMiembrosInvitadosModalOpen] =
    useState(false);
  const [isMiembrosAusentesModalOpen, setIsMiembrosAusentesModalOpen] =
    useState(false);

  // REHACER ACCION DE CONFIRMAR MIEMBROS POR CATEGORIA

  const closeModalMiembro = () => {
    setIsMiembrosPresentesModalOpen(false);
    setIsMiembrosInvitadosModalOpen(false);
    setIsMiembrosAusentesModalOpen(false);
  };

  const handleConfirmIdPresentes = () => {
    const miembrosPresentesActa = {
      miembrosPresentes: objIdPresentes,
    };

    const updatePresentesActa = {
      ...actaInicial,
      ...miembrosPresentesActa,
    };

    setActaInicial(updatePresentesActa);
    setIsPresentesAdded(true);
    setIsMiembrosPresentesModalOpen(false);
  };

  const handleConfirmIdInvitados = () => {
    const miembrosInvitadosActa = {
      miembrosInvitados: objIdInvitados,
    };

    const updateInvitadosActa = {
      ...actaInicial,
      ...miembrosInvitadosActa,
    };

    setActaInicial(updateInvitadosActa);
    setIsInvitadosAdded(true);
    setIsMiembrosInvitadosModalOpen(false);
  };

  const handleConfirmIdAusentes = () => {
    const miembrosAusentesActa = {
      miembrosAusentes: objIdAusentes,
    };

    const updateAusentesActa = {
      ...actaInicial,
      ...miembrosAusentesActa,
    };

    setActaInicial(updateAusentesActa);
    setIsAusentesAdded(true);
    setIsMiembrosAusentesModalOpen(false);
  };

  const handleUndoPresentes = () => {
    setIsPresentesAdded(false);
  };

  const handleUndoInvitados = () => {
    setIsInvitadosAdded(false);
  };

  const handleUndoAusentes = () => {
    setIsAusentesAdded(false);
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

  // OBTENER DATOS DE LA TABLA

  // ESTADO INICIAL PARA LOS DATOS DE LA TABLA <<PARTICIPANTES>>
  const [participantes, setParticipantes] = useState([]);

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

  // ESTADO QUE MUESTRA EL TEXTO INICIAL DE UNA ALERTA PARA INFORMAR SI UN MIEMBRO YA FUE
  // AÑADIDO
  const [isAdded, setIsAdded] = useState(false);

  // ESTADO INICIAL PARA LA SELECCIÓN DEL PARTICIPANTE CON EL CHECKBOX
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // CAMBIA EL ESTADO DEL CHECKBOX EN ESE MOMENTO
  const handleCheckboxChange = (participantId) => {
    setSelectedParticipant(participantId);
  };

  // ARREGLOS Y OBJETOS INICIALES PARA LA INDEXACIÓN DE LOS MIEMBROS
  const [groupPresentes, setGroupPresentes] = useState([
    {
      _id: "",
      nombre: "",
      apellido: "",
    },
  ]);

  // ESTADO DE LAS CONFIRMACIONES PARA RECOPILAR LOS MIEMBROS
  const [isPresentesAdded, setIsPresentesAdded] = useState(false);
  const [objIdPresentes, setObjIdPresentes] = useState([]);

  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS PRESENTES
  const handleBtnPresClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { _id, nombre, apellido } = selectedParticipantData;
        const newObject = { _id, nombre, apellido };

        const verifyEntry = groupPresentes.some((presente) => {
          return (
            presente._id === newObject._id &&
            presente.nombre === newObject.nombre &&
            presente.apellido === newObject.apellido
          );
        });

        if (verifyEntry) {
          setIsAdded(true);
        } else {
          setGroupPresentes((prevGroupPresentes) => [
            ...prevGroupPresentes,
            { _id, nombre, apellido },
          ]);

          setIsAdded(false);
        }
      }
    }
  };

  // CREA EL ARREGLO _ID PARA PARTICIPANTES AL ACTA
  const handleConfirmMiembrosPresentes = () => {
    const miembPresentesSeleccionados = groupPresentes.map((presente) => {
      return { _id: presente._id };
    });

    miembPresentesSeleccionados.shift();

    setObjIdPresentes(miembPresentesSeleccionados);

    const miembrosPresentesActa = {
      miembrosPresentes: objIdPresentes,
    };

    const updatePresentesActa = {
      ...actaInicial,
      ...miembrosPresentesActa,
    };

    setActaInicial(updatePresentesActa);
    setIsMiembrosPresentesModalOpen(true);
  };

  // MIEMBROS AUSENTES
  const [groupAusentes, setGroupAusentes] = useState([
    {
      _id: "",
      nombre: "",
      apellido: "",
    },
  ]);

  const [isAusentesAdded, setIsAusentesAdded] = useState(false);
  const [objIdAusentes, setObjIdAusentes] = useState([]);

  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS AUSENTES
  const handleBtnAusClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { _id, nombre, apellido } = selectedParticipantData;

        const newObject = { _id, nombre, apellido };

        const verifyEntry = groupAusentes.some((ausente) => {
          return (
            ausente._id === newObject._id &&
            ausente.nombre === newObject.nombre &&
            ausente.apellido === newObject.apellido
          );
        });

        if (verifyEntry) {
          setIsAdded(true);
        } else {
          setGroupAusentes((prevGroupAusentes) => [
            ...prevGroupAusentes,
            { _id, nombre, apellido },
          ]);

          setIsAdded(false);
        }
      }
    }
  };

  // CREA EL ARREGLO _ID PARA PARTICIPANTES AL ACTA
  const handleConfirmMiembrosAusentes = () => {
    const miembAusentesSeleccionados = groupAusentes.map((ausente) => {
      return { _id: ausente._id };
    });

    miembAusentesSeleccionados.shift();

    setObjIdAusentes(miembAusentesSeleccionados);

    const miembrosAusentesActa = {
      miembrosAusentes: objIdAusentes,
    };

    const updateAusentesActa = {
      ...actaInicial,
      ...miembrosAusentesActa,
    };

    setActaInicial(updateAusentesActa);
    setIsMiembrosAusentesModalOpen(true);
  };

  // MIEMBROS INVITADOS
  const [groupInvitados, setGroupInvitados] = useState([
    {
      _id: "",
      nombre: "",
      apellido: "",
    },
  ]);

  const [isInvitadosAdded, setIsInvitadosAdded] = useState(false);
  const [objIdInvitados, setObjIdInvitados] = useState([]);

  // ESTE ES EL BOTÓN PARA RECOPILAR LOS MIEMBROS INVITADOS
  const handleBtnInvClick = (e) => {
    e.preventDefault();

    if (selectedParticipant) {
      const selectedParticipantData = data.find(
        (participant) => participant._id === selectedParticipant
      );

      if (selectedParticipantData) {
        const { _id, nombre, apellido } = selectedParticipantData;

        const newObject = { _id, nombre, apellido };

        const verifyEntry = groupInvitados.some((invitado) => {
          return (
            invitado._id === newObject._id &&
            invitado.nombre === newObject.nombre &&
            invitado.apellido === newObject.apellido
          );
        });

        if (verifyEntry) {
          setIsAdded(true);
        } else {
          setGroupInvitados((prevGroupInvitados) => [
            ...prevGroupInvitados,
            { _id, nombre, apellido },
          ]);
          console.log(groupInvitados);
          setIsAdded(false);
        }
      }
    }
  };

  // CREA EL ARREGLO _ID PARA PARTICIPANTES AL ACTA
  const handleConfirmMiembrosInvitados = () => {
    const miembInvitadosSeleccionados = groupInvitados.map((invitado) => {
      return { _id: invitado._id };
    });
    miembInvitadosSeleccionados.shift();

    setObjIdInvitados(miembInvitadosSeleccionados);

    const miembrosInvitadosActa = {
      miembrosInvitados: objIdInvitados,
    };

    const updateInvitadosActa = {
      ...actaInicial,
      ...miembrosInvitadosActa,
    };

    setActaInicial(updateInvitadosActa);
    setIsMiembrosInvitadosModalOpen(true);
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
  const [groupVotos, setGroupVotos] = useState([]);

  const addVoto = () => {
    setGroupVotos((prevGroupVotos) => [...prevGroupVotos, formulario]);
    setFormulario({});
    setVotoSeleccionado("");
  };

  const handleRecopilarVotos = () => {
    const finalActa = {
      articulos: groupVotos,
    };

    const definitiveActa = {
      ...actaInicial,
      ...finalActa,
    };

    setActaInicial(definitiveActa);
    setCurrentStep(currentStep + 1);
  };

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

  // PARTE 4 : ADJUNTAR DOCUMENTOS DE SOPORTE
  // -----------------------------------------------------------------------------

  const [files, setFiles] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleFileUpload = () => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append(`soportes`, file);

      const response = await httpCommon.post("/actas/carga", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      console.log(data);

      Swal.fire({
        icon: "success",
        title: data.message,
        text: "Los archivos se han subido correctamente.",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  };

  return (
    <>
      {/* MODAL MIEMBROS PRESENTES */}
      {isMiembrosPresentesModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea confirmar los miembros presentes?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button className="btn btn-warning" onClick={closeModalMiembro}>
                Atrás
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmIdPresentes}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MIEMBROS INVITADOS */}
      {isMiembrosInvitadosModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea confirmar los miembros invitados?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button className="btn btn-warning" onClick={closeModalMiembro}>
                Atrás
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmIdInvitados}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MIEMBROS AUSENTES */}
      {isMiembrosAusentesModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea confirmar los miembros ausentes?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button className="btn btn-warning" onClick={closeModalMiembro}>
                Atrás
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmIdAusentes}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SALIR DE CREAR EL ACTA */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="h4 text-center">¿Está seguro que desea salir?</h2>
            <span className="h6 mb-4 text-center">
              Recuerda que se borrara todo lo que has hecho
            </span>
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

      {/* MODAL CREAR REGISTRO */}
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
          <div className="subtitle">
            <span>Rellene los campos y crear un nuevo acta</span>
          </div>
        </div>

        {/* PARTE 1: MIEMBROS DEL ACTA */}
        {/* -------------------------------------------------------------------------------- */}
        <div className={`formulario ${currentStep !== 1 && "oculto"}`}>
          {currentStep === 1 && (
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
                      <span className="small-btn-text">Miembros ausente</span>
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
                          <div className="d-flex justify-content-between">
                            <h3 className="h3">Miembros presentes</h3>
                            {isPresentesAdded && (
                              <div className="d-flex justify-content-between">
                                <button
                                  onClick={handleUndoPresentes}
                                  className="btn btn-sm d-flex align-items-center"
                                  style={{
                                    backgroundColor: "#ea0e0e",
                                    color: "#fff",
                                    gap: "8px",
                                  }}
                                >
                                  Deshacer
                                  <HiX></HiX>
                                </button>
                                <button
                                  className="btn btn-light d-flex align-items-center justify-content-between"
                                  style={{ gap: "8px" }}
                                  disabled={true}
                                >
                                  Confirmado
                                  <HiBadgeCheck />
                                </button>
                              </div>
                            )}
                            {!isPresentesAdded && (
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#028306",
                                  border: "none",
                                  color: "#fff",
                                }}
                                onClick={handleConfirmMiembrosPresentes}
                              >
                                Guardar miembros
                              </button>
                            )}
                          </div>
                          <div
                            className="container-fluid mt-4 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupPresentes.slice(1).map((presente) => (
                              <div className="tag-miembro tag-pres">
                                {presente.nombre + " " + presente.apellido}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex justify-content-between">
                            <h3 className="h3">Miembros invitados</h3>
                            {isInvitadosAdded && (
                              <div className="d-flex justify-content-between">
                                <button
                                  onClick={handleUndoInvitados}
                                  className="btn btn-sm d-flex align-items-center"
                                  style={{
                                    backgroundColor: "#ea0e0e",
                                    color: "#fff",
                                    gap: "8px",
                                  }}
                                >
                                  Deshacer
                                  <HiX></HiX>
                                </button>
                                <button
                                  className="btn btn-light d-flex align-items-center justify-content-between"
                                  style={{ gap: "8px" }}
                                  disabled={true}
                                >
                                  Confirmado
                                  <HiBadgeCheck />
                                </button>
                              </div>
                            )}
                            {!isInvitadosAdded && (
                              <button
                                className="btn btn btn-warning"
                                style={{
                                  color: "#fff",
                                  backgroundColor: "#028306",
                                  border: "none",
                                }}
                                onClick={handleConfirmMiembrosInvitados}
                              >
                                Guardar miembros
                              </button>
                            )}
                          </div>
                          <div
                            className="container-fluid mt-4 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupInvitados.slice(1).map((invitado) => (
                              <div
                                className="tag-miembro tag-inv"
                                key={invitado._id}
                              >
                                {invitado.nombre + " " + invitado.apellido}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex justify-content-between">
                            <h3 className="h3">Miembros ausente</h3>
                            {isAusentesAdded && (
                              <div className="d-flex justify-content-between">
                                <button
                                  onClick={handleUndoAusentes}
                                  className="btn btn-sm d-flex align-items-center"
                                  style={{
                                    backgroundColor: "#ea0e0e",
                                    color: "#fff",
                                    gap: "8px",
                                  }}
                                >
                                  Deshacer
                                  <HiX></HiX>
                                </button>
                                <button
                                  className="btn btn-light d-flex align-items-center justify-content-between"
                                  style={{ gap: "8px" }}
                                  disabled={true}
                                >
                                  Confirmado
                                  <HiBadgeCheck />
                                </button>
                              </div>
                            )}
                            {!isAusentesAdded && (
                              <button
                                className="btn btn btn-warning"
                                style={{
                                  color: "#fff",
                                  backgroundColor: "#028306",
                                  border: "none",
                                }}
                                onClick={handleConfirmMiembrosAusentes}
                              >
                                Guardar miembros
                              </button>
                            )}
                          </div>
                          <div
                            className="container-fluid mt-4 d-flex w-100 flex-wrap"
                            style={{ gap: "20px" }}
                          >
                            {groupAusentes.slice(1).map((ausente) => (
                              <div className="tag-miembro tag-aus">
                                {ausente.nombre + " " + ausente.apellido}
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

        {/* PARTE 2: INFORMACION BASICA */}
        <div className={`formulario ${currentStep !== 2 && "oculto"}`}>
          {currentStep === 2 && (
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
                  <spam className="small-font">Campo requerido</spam>
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
                  <spam className="small-font">Campo requerido</spam>
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
                  <spam className="small-font">Campo requerido</spam>
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
                  <spam className="small-font">Campo requerido</spam>
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
                <spam className="small-font">Campo requerido</spam>
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
                    id="titulo"
                    name="titulo"
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

              <div style={{ maxWidth: "90%" }} className="row mb-2">
                {renderCampos()}
              </div>

              <button className="btn btn-primary mb-3" onClick={addVoto}>
                Añadir nuevo voto +
              </button>

              <div className="container m-0 p-0">
                {groupVotos.length > 0 &&
                  groupVotos.map((voto, index) => (
                    <div
                      className="container p-0 m-0 mb-4"
                      style={{ maxWidth: "100%" }}
                    >
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowX: "scroll",
                          overflowY: "hidden",
                        }}
                        className="container-fluid col-11 p-0 m-0"
                      >
                        <table
                          key={index}
                          className="table table-striped table-bordered"
                        >
                          <thead>
                            <tr>
                              {Object.keys(voto).map((votoInd, index) => (
                                <th key={index}>{votoInd}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {Object.values(voto).map((valor, i) => (
                                <td key={i}>{valor}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
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
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  multiple
                />
                <button onClick={handleFileUpload}>Subir archivos</button>

                {files.length > 0 && (
                  <div>
                    <h4>Archivos adjuntados:</h4>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="row mb-4"></div>
            </>
          )}
        </div>

        {/* BOTONES DE ACCIONES (CANCELAR, ATRÁS, SIGUIENTE) */}
        {/* -------------------------------------------------------------------------------- */}
        <div
          className="mt-4 d-flex justify-content-around"
          style={{ maxWidth: "95%" }}
        >
          <button
            className="btn btn-danger"
            onClick={handleChangeStatusModalOk}
          >
            Salir
          </button>
          <div className="container-fluid d-flex justify-content-end me-md-1">
            {currentStep > 1 && (
              <button
                className="btn btn-secondary me-2"
                onClick={handleDecrementStep}
              >
                Atrás
              </button>
            )}

            {currentStep < 3 && (
              <button className="btn btn-primary" onClick={handleIncrementStep}>
                Siguiente
              </button>
            )}

            {currentStep === 3 && (
              <button
                className="btn btn-primary"
                style={{ marginRight: "100px" }}
                onClick={handleRecopilarVotos}
              >
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
