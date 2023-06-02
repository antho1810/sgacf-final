import React, { useEffect, useState, useMemo } from "react";
import votosData from "./votosData";

import ParticipantesService from "../../../services/ParticipantesDataServices";
import ActaService from "../../../services/ActasDataService";

import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";

import GlobalParticipantesFilter from "./GlobalFilter";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { HiPlus, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

import "./CreateActa.css";
import "./BtnSend.css";

// COMPONENTE FILA CRONOGRAMA
const Row = ({
  id,
  handleTimeChange,
  handleActivityChange,
  handleRowAdd,
  handleRowDelete,
}) => {
  return (
    <div className="row mb-4 d-flex align-items-center">
      <div
        className="col-auto"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Label>Hora</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker onChange={handleTimeChange} />
        </LocalizationProvider>
      </div>

      <div className="col-auto">
        <Form.Label>Actividad</Form.Label>
        <Form.Control
          as="textarea"
          onChange={handleActivityChange}
          style={{ height: "70px" }}
        />
      </div>

      <div className="col-auto">
        <Button variant="success" onClick={handleRowAdd} className="me-2">
          <HiPlus />
        </Button>

        {id > 0 && (
          <Button variant="danger" onClick={() => handleRowDelete(id)}>
            <HiX />
          </Button>
        )}
      </div>
    </div>
  );
};

const CreateActa = () => {
  const [actaInfo, setActaInfo] = useState({
    lugar: "",
    modalidad: "",
    horaInicio: "",
    horaFinal: "",
    cronograma: [],
    miembrosPresentes: [],
    miembrosAusentes: [],
    miembrosInvitados: [],
    articulos: [],
    docsSoporte: [],
  });

  // ENVÍO DEL FORMULARIO PARA LA CREACIÓN DEL ACTA

  const handleSubmitted = (cronogramas) => {
    const cronograma = rows.map((row) => ({
      HORA: row.hora,
      ACTIVIDAD: row.actividad,
    }));

    setActaInfo({
      ...actaInfo,
      cronograma,
    });

    // Aquí puedes hacer uso de axios para enviar la información a la base de datos
    setTimeout(() => {
      ActaService.createActa(actaInfo)
        .then((response) => {
          console.log("Acta enviada exitosamente:", response.data);
        })
        .catch((error) => {
          console.error("Error al enviar el acta:", error);
        });
    }, 2);
  };

  // RECOPILA LOS DATOS BÁSICOS DEL ACTA (NUMREFERENCIA, LUGAR, MODALIDAD)
  const handleInputChange = (e) => {
    setActaInfo({
      ...actaInfo,
      [e.target.name]: e.target.value,
    });
  };

  // RECOPILA LA HORA DE INICIO Y FIN DEL ACTA
  const handleHoraInicioChange = (horaInicio) => {
    setActaInfo({
      ...actaInfo,
      horaInicio,
    });
  };

  const handleHoraFinalChange = (horaFinal) => {
    setActaInfo({
      ...actaInfo,
      horaFinal,
    });
  };

  // RECOPILA EL CRONOGRAMA DEL ACTA
  const [rows, setRows] = useState([{ id: 0, hora: "", actividad: "" }]);
  const [rowCount, setRowCount] = useState(1);

  const handleTimeChange = (hora, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          hora,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleActivityChange = (e, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          actividad: e.target.value,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleRowAdd = () => {
    setRows([...rows, { id: rowCount, hora: "", actividad: "" }]);
    setRowCount(rowCount + 1);
  };

  const handleRowDelete = (rowId) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
  };

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

  // ARREGLO DE OBJETOS QUE RECOPILA TODA LA INFORMACIÓN DEL VOTO DEL ACTA
  const [objVotos, setObjVotos] = useState([]);

  const [loading, setLoading] = useState(true);
  // ESTADO INICIAL PARA LOS DATOS DE LA TABLA <<PARTICIPANTES>>
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ParticipantesService.getAllParticipantes();
        setParticipantes(response.data);
        setLoading(false);
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
      <div className="container-fluid">
        {/* PAGE HEADER */}
        <div className="create-acta-main-header mb-4">
          <div className="title-actas">
            <h1 className="h1">Crear un acta</h1>
          </div>
        </div>

        {/* # REF TEMPORAL */}
        <div className="row mb-4">
          <div className="col-auto">
            <Form.Label>Número de referencia</Form.Label>
            <Form.Control
              type="text"
              name="numeroRef"
              value={actaInfo.numeroRef}
              onChange={handleInputChange}
              placeholder="# Ref"
              className="w-100 form-control-custom"
            />
          </div>
        </div>

        {/* BASIC INFO HEADER */}
        <div className="create-acta-header mb-4">
          <div className="title-actas">
            <h2 className="h2">Información básica del acta</h2>
          </div>
        </div>

        {/* BASIC INFO INPUTS */}
        <div className="row mb-4">
          <div className="col-auto">
            <Form.Label>Lugar</Form.Label>
            <Form.Control
              type="text"
              name="lugar"
              placeholder="Lugar"
              value={actaInfo.lugar}
              onChange={handleInputChange}
              className="w-100 form-control-custom"
            />
          </div>
          <div className="col-auto">
            <Form.Label>Modalidad</Form.Label>
            <Form.Select
              name="modalidad"
              value={actaInfo.modalidad}
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
                value={actaInfo.horaInicio}
                onChange={handleHoraInicioChange}
              />
            </LocalizationProvider>
          </div>
          <div className="col-auto d-flex flex-column">
            <Form.Label>Hora final</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                name="horaFinal"
                value={actaInfo.horaFinal}
                onChange={handleHoraFinalChange}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* CRONOGRAMA HEADER */}
        <div className="create-acta-header mb-4">
          <h2 className="h2">Cronograma del acta</h2>
        </div>
        <div className="container-fluid">
          {/* MULTI TASKS SPACE */}
          {rows.map((row) => (
            <Row
              key={row.id}
              id={row.id}
              handleTimeChange={(hora) => handleTimeChange(hora, row.id)}
              handleActivityChange={(e) => handleActivityChange(e, row.id)}
              handleRowAdd={handleRowAdd}
              handleRowDelete={handleRowDelete}
            />
          ))}
        </div>

        {/* PARTICIPANTES CONTAINER */}
        <div className="container-fluid mb-4">
          <div className="row" style={{ gap: "20px" }}>
            <div className="col h-auto d-flex flex-column justify-content-center">
              <div className="container-fluid create-acta-header tabla-participantes-header mb-4">
                <h2 className="h2">Tabla de participantes</h2>
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
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
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
                  <div className="container-fluid create-acta-header tabla-participantes-header mb-4">
                    <h2 className="h2">Participantes seleccionados</h2>
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
                          <div className="tag-miembro tag-pres">{presente}</div>
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
                          <div className="tag-miembro tag-inv">{invitado}</div>
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
                          <div className="tag-miembro tag-aus">{ausente}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VOTOS */}
        <div className="container-fluid">
          <div className="container-fluid create-acta-header mb-4">
            <h3 className="h3">Votos</h3>
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

          <div className="container-fluid d-flex justify-content-center">
            <button
              className="btn-send"
              role="button"
              onClick={handleSubmitted}
            >
              Crear Acta
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActa;
