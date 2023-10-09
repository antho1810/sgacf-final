import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import ParticipantesService from "../../../services/ParticipantesDataServices";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
// import { COLUMNS } from "./columns";
import { Dropdown, IconButton } from "rsuite";

import "./ParticipantesTable.css";

import GlobalParticipantesFilter from "./GlobalFilter";
import jwtDecode from "jwt-decode";

const ParticipantesTable = () => {
  const [participantes, setParticipantes] = useState([]);
    const [layer, setLayer] = useState(false);
    const [layerMsg, setLayerMsg] = useState("");

  const getParticipantesData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLayerMsg('No hay token disponible. El usuario no está autenticado.');
      setLayer(true);
      // return (window.location.href = '/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setLayerMsg('El token ha caducado. Debes iniciar sesión nuevamente.');
          setLayer(true);
          // return (window.location.href = '/login');
        } else {
          ParticipantesService.getAllParticipantes()
            .then((response) => {
              return setParticipantes(response.data);
            })
            .catch((e) => console.log(e));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    try {
      getParticipantesData();
    } catch (error) {
      console.error("Error al obtener los participantes:", error);
    }
  }, []);

  const renderIconButton = (props, ref) => {
    return (
      <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />
    );
  };
  const COLUMNS = [
    { Header: "Nombres", accessor: "nombre" },

    {
      Header: "Apellidos",
      accessor: "apellido",
    },
    {
      Header: "Cargo",
      accessor: "cargo",
    },
    {
      Header: "",
      accessor: "_id", //localhost:4000/sgacfi-api/participantes/_id
      Cell: ({ row }) => {
        const rowId = row.original._id;

        const handleConfirmDelete = async (id) => {
          await ParticipantesService.deleteParticipante(id);
          window.location.reload();
        };

             const handleDeleteParticipanteWithConfirmation = (id) => {
               Swal.fire({
                 title: "¿Estás seguro?",
                 text: "¿Quieres eliminar a este participante?",
                 icon: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#3085d6",
                 cancelButtonColor: "#d33",
                 confirmButtonText: "Sí, eliminar",
                 cancelButtonText: "Cancelar",
               }).then(async (result) => {
                 if (result.isConfirmed) {
                   // Usuario confirmó la eliminación del participante, llamar a la función de eliminación
                   await handleConfirmDelete(id);
                 }
               });
             };

        const token = localStorage.getItem("token");

        if (token) {
          const decodeToken = jwtDecode(token);

          const checkRol = decodeToken.rol.map((userRol) => {
            return userRol.nombre;
          });

          // TRUE SI ES secretaria
          var checkExistedRolSecretaria = checkRol.includes("secretaria");

          // TRUE SI ES decano
          var checkExistedRolDecano = checkRol.includes("decano");

          // TRUE SI ES PARTICIPANTES
          var checkExistedRolParticipante = checkRol.includes("participante");
        }

        return (
          <>
            <Dropdown renderToggle={renderIconButton} className="accion-drop">
              {/* Acciones para el secretaria */}
              {checkExistedRolSecretaria && (
                <>
                  {" "}
                  <Dropdown.Item
                    className="i-editar text-warning"
                    as={NavLink}
                    to={`actualizar-participante/id/${rowId}`}
                    icon={<FaRegEdit />}
                  >
                    {" "}
                    <span>Editar</span>{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                className="i-borrar text-danger"
                    as={NavLink}
                    onClick={handleDeleteParticipanteWithConfirmation}
                    icon={<RiDeleteBinLine />}
                  >
                    {" "}
                    <span> Borrar</span>
                  </Dropdown.Item>
                </>
              )}

              {checkExistedRolDecano && (
                <>
                  <Dropdown.Item
                    className="i-editar text-warning"
                    as={NavLink}
                    to={`actualizar-participante/id/${rowId}`}
                    icon={<FaRegEdit />}
                  >
                    {" "}
                    <span>Editar</span>{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="i-borrar text-danger"
                    as={NavLink}
                    onClick={handleDeleteParticipanteWithConfirmation}
                    icon={<RiDeleteBinLine />}
                  >
                    {" "}
                    <span> Borrar</span>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown>
          </>
        );
      },
    },
  ];

  const data = useMemo(
    () => {
      if (Array.isArray(participantes)) {
        return participantes.map((participante) => ({
          nombre: participante.nombre,
          apellido: participante.apellido,
          cargo: participante.cargo,
          _id: participante._id,
        }));
      } else {
        return [];
      }
    },
    [participantes]
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
      columns: React.useMemo(() => COLUMNS, []),
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Estado inicial de la paginación
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

   return (
    <>
      {!layer ? (
        <>
          <div className="ct-header-actas">
            <div className="title-actas">
              <h2>Lista de participantes</h2>
            </div>
            <div>
              <Button
                as={NavLink}
                to="crear-participante"
                className="plus-acta-btn"
              >
                + Añadir participante
              </Button>
            </div>
          </div>

          <GlobalParticipantesFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />

          <Table {...getTableProps()}>
            <thead className="table-header">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index}
                      className="head-column"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <HiChevronDown />
                          ) : (
                            <HiChevronUp />
                          )
                        ) : (
                          ''
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
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            {cell.render('Cell')}
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
          <div
            className="container-fluid d-flex justify-content-end mb-4"
            style={{ gap: '10px' }}
          >
            <div>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {'<'}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {'>>'}
              </button>{' '}
              <span>
                Página{' '}
                <strong>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
              </span>
              <span>
                | Ir a la página:{' '}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: '50px' }}
                />
              </span>{' '}
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
        </>
      ) : (
        <span>No hay datos</span>
      )}
    </>
  );
};

export default ParticipantesTable;
