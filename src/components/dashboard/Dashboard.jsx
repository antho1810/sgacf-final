import React, { useMemo, useState } from "react";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";

import ActaService from "../../services/ActasDataService";
import { useLoaderData, NavLink } from "react-router-dom";
import moment from "moment";
// import { COLUMNS } from "./columns";

import { Dropdown, IconButton } from "rsuite";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";
import { BsEyeglasses } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaShareAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import ParticipantesTable from "../participantes/participantesTable/ParticipantesTable";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import "./Dashboard.css";
import "./Table.css";
import GlobalActasFilter from "./filters/GlobalFilter";

function Dashboard() {
  // Modals

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChangeStatusModalFalse = () => {
    setIsDeleteModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleShowConfirmDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleShowConfirmUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  // Update Status
  const handleUpdateStatus = () => {
    updateStatusActa();
  };

  const updateStatusActa = async () => {
    const response = await ActaService.updateStatusActa()
      .then((response) => {
        console.log(
          "El estado del acta ha sido actualizada exitosamente: ",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del acta: ", error);
      });
  };
  // Delete
  const handleConfirmDelete = () => {
    deleteActa();
  };

  const deleteActa = async () => {
    // peticion
    const response = await ActaService.deleteActa()
      .then((response) => {
        console.log("Participante borrado exitosamente: ", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el participante: ", error);
      });
    setTimeout(() => {
      // Recargar la página
      window.location.reload();
    }, 2000);
  };

  const renderIconButton = (props, ref) => {
    return (
      <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />
    );
  };
  const columns = React.useMemo(
    () => [
      { Header: "# Ref", accessor: "numeroRef" },

      {
        Header: "Fecha de creación",
        accessor: "fechaCreacion",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
      },
      { Header: "Miembros presentes", accessor: "miembrosPresentes" },
      { Header: "Lugar", accessor: "lugar" },
      { Header: "Modalidad", accessor: "modalidad" },
      {
        Header: "Estado",
        accessor: "estado",
        Cell: ({ value }) =>
          value === "En proceso" ? (
            <Badge className="inProcess">
              {" "}
              <span>{value}</span>{" "}
            </Badge>
          ) : (
            <Badge className="confirmed">
              <span>{value}</span>
            </Badge>
          ),
      },
      { Header: "Articulos", accessor: "articulos" },
      {
        Header: "",
        accessor: "_id",
        Cell: ({ value }) => (
          <Dropdown renderToggle={renderIconButton} className="accion-drop">
            <Dropdown.Item
              className="i-revisar"
              as={NavLink}
              to="detalle-acta"
              icon={<BsEyeglasses />}
            >
              {" "}
              <span>Revisar</span>{" "}
            </Dropdown.Item>
            <Dropdown.Item
              className="i-aprobar"
              onClick={handleShowConfirmUpdateModal}
              icon={<AiOutlineLike />}
            >
              {" "}
              <span>Aprobar</span>{" "}
            </Dropdown.Item>
            <Dropdown.Item
              className="i-editar"
              // onClick={}
              icon={<FaRegEdit />}
            >
              {" "}
              <span>Editar</span>{" "}
            </Dropdown.Item>
            <Dropdown.Item
              className="i-borrar"
              onClick={handleShowConfirmDeleteModal}
              icon={<RiDeleteBinLine />}
            >
              {"  "}
              <span>Borrar</span>
            </Dropdown.Item>
            <Dropdown.Item className="i-compartir" icon={<FaShareAlt />}>
              {" "}
              <span>Compartir</span>{" "}
            </Dropdown.Item>
            <Dropdown.Item
              className="i-descargar"
              icon={<HiDocumentDownload />}
            >
              {" "}
              <span> Descargar PDF</span>
            </Dropdown.Item>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const responseActas = useLoaderData();

  const data = useMemo(
    () =>
      responseActas.map((acta) => ({
        numeroRef: acta.numeroRef,
        fechaCreacion: acta.fechaCreacion,
        miembrosPresentes: acta.miembrosPresentes.map(
          (miembro) => `${miembro.nombre} ${miembro.apellido}, `
        ),
        lugar: acta.lugar,
        modalidad: acta.modalidad,
        estado: acta.estado,
        articulo: acta.articulos,
      })),
    [responseActas]
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

  return (
    <>
      {/* MODAL Eliminar CERRAR */}
      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea actualizar el estado del acta?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button
                className="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button className="btn btn-primary" onClick={handleUpdateStatus}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL Eliminar CERRAR */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-4 h4 text-center">
              ¿Está seguro que desea eliminar el acta?
            </h2>
            <div className="ct-btn d-flex justify-content-evenly">
              <button
                className="btn btn-warning"
                onClick={handleChangeStatusModalFalse}
              >
                Atrás
              </button>
              <button className="btn btn-primary" onClick={handleConfirmDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ct-header-actas">
        <div className="title-actas">
          <h2>Lista de actas</h2>
        </div>
        <div>
          <Button as={NavLink} to="crear-acta" className="plus-acta-btn">
            + Añadir acta
          </Button>
        </div>
      </div>

      <GlobalActasFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <Table {...getTableProps()}>
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.numeroRef}
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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

      <ParticipantesTable />
    </>
  );
}

export const dashboardLoader = async () => {
  const responseActas = await ActaService.getAllActas();
  return responseActas.data;
};

export default Dashboard;
