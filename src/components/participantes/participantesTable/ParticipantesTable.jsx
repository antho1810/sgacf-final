import React, { useEffect, useState, useMemo } from "react";
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

const ParticipantesTable = () => {
  const [participantes, setParticipantes] = useState([]);

  const getParticipantesData = async () => {
    const response = await ParticipantesService.getAllParticipantes();
    setParticipantes(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    try {
      getParticipantesData();
    }
    catch (error) {
      console.error("Error al obtener los participantes:", error);
    }

  }, []);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleChangeStatusModalFalse = () => {
      setIsDeleteModalOpen(false);
    };

    const handleShowConfirmModal = () => {
      setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
      deleteParticipante();
      // ParticipantesService.deleteParticipante()
      //   .then((response) => {
      //     console.log("Participante borrado exitosamente: ", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error al actualizar el participante: ", error);
      //   })
      // setTimeout(() => {
       
      // }, 2000)
    };

  const deleteParticipante = async () => {
    // peticion
   const reponse= await ParticipantesService.deleteParticipante()
     .then((response) => {
       console.log("Participante borrado exitosamente: ", response.data);
   })
     .catch((error) => {
     console.error("Error al actualizar el participante: ", error)
     });
    setTimeout(() => {
      // Recargar la página
      window.location.reload();
    }, 2000)
  }

  const renderIconButton = (props, ref) => {
    return (
      <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />
    );
  };
  const data = useMemo(
    () =>
      participantes.map((participante) => ({
        nombre: participante.nombre,
        apellido: participante.apellido,
        cargo: participante.cargo,
      })),
    [participantes]
  );

  const columns = React.useMemo(() => [
    { Header: "nombre", accessor: "nombre" },

    {
      Header: "apellido",
      accessor: "apellido",
    },
    {
      Header: "cargo",
      accessor: "cargo",
    },
    {
      Header: "",
      accessor: "_id", //localhost:4000/api/actas/id/_id
      Cell: ({ value }) => (
        <Dropdown renderToggle={renderIconButton} className="accion-drop">
          <Dropdown.Item
            className="i-editar"
            as={NavLink}
            to="actualizar-participante"
            icon={<FaRegEdit />}
          >
            {" "}
            <span>Editar</span>{" "}
          </Dropdown.Item>
          <Dropdown.Item
            className="i-borrar"
            as={NavLink}
            onClick={handleShowConfirmModal}
            icon={<RiDeleteBinLine />}
          >
            {" "}
            <span> Borrar</span>
          </Dropdown.Item>
        </Dropdown>
      ),
    },
  ],
    []);

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

  return (
    <>
      {/* MODAL Eliminar CERRAR */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea eliminar al participante?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button
                class="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button class="btn btn-primary" onClick={handleConfirmDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
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
      <div
        className="container-fluid d-flex justify-content-end mb-4"
        style={{ gap: "10px" }}
      >
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
    </>
  );
};

export default ParticipantesTable;
