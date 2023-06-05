import React, { useMemo } from "react";

import ActaService from "../../services/ActasDataService";
import { NavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ParticipantesTable from "../participantes/participantesTable/ParticipantesTable";
import emailjs from "@emailjs/browser";
import "./Dashboard.css";

import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";

import Table from "react-bootstrap/Table";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import "./Table.css";
import GlobalActasFilter from "./filters/GlobalFilter";

import moment from "moment";
import jwtDecode from "jwt-decode";
import { useLoaderData } from "react-router-dom";

import Badge from "react-bootstrap/Badge";

import { Dropdown, IconButton } from "rsuite";

import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";
import { BsEyeglasses } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaShareAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import DocuPDF from "./DocuPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

const COLUMNS = [
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
    accessor: "id",
    disableSortBy: true,
    Cell: ({ row }) => {
      const [acta, setActa] = useState({});

      const loadUserInfo = () => {
        const info = localStorage.getItem("");
      };

      useEffect(() => {
        loadUserInfo();
      }, []);

      // Modals
      const [isEmailOpen, setIsEmailOpen] = useState(false);
      const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      const handleChangeStatusModalFalse = () => {
        setIsDeleteModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsEmailOpen(false);
      };

      const handleShowConfirmDeleteModal = () => {
        setIsDeleteModalOpen(true);
      };

      const handleShowUpdateStatusModal = () => {
        setIsUpdateModalOpen(true);
      };
      const handleShowEmailModal = () => {
        setIsEmailOpen(true);
      };

      // Modal Delete Acta
      const handleDelete = async (id) => {
        await ActaService.deleteActa(id);
        window.location.reload();
      };

      // Modal Update Status Acta
      const handleUpdateStatus = async (ref) => {
        await ActaService.updateStatusActa(ref, { estado: "Aprobado" });
        window.location.reload();
      };

      // Modal Email Acta
       const handleEmail = () => {
         sendEmail();
       };

       const sendEmail = (e) => {
         e.preventDefault();

         // Configura EmailJS con tu Service ID
         emailjs
           .sendForm(
             "service_0c37kw4",
             "template_znez8vj",
             e.target,
             "lKnR9ZvyvLPcJxoin"
           )
           .then(
             (result) => {
               console.log(result.text);
               // Actualiza el estado del modal del email a 'false' para que se cierre
               setIsEmailOpen(false);
             },
             (error) => {
               console.log(error.text);
             }
           );
       };

      const showStatus = (estado) => {
        console.log(estado);
      };

      const estado = row.original.estado;

      const token = localStorage.getItem("token");
      const decodeToken = jwtDecode(token);

      localStorage.setItem("userDashboardInfo", JSON.stringify(decodeToken));

      const user = localStorage.getItem("userDashboardInfo");

      const fixedUser = JSON.parse(user);

      const checkRol = fixedUser.rol.map((userRol) => {
        return userRol.nombre;
      });

      // TRUE SI ES SECRETARIA
      const checkExistedRolSecretaria = checkRol.includes("secretaria");

      // TRUE SI ES DECANO
      const checkExistedRolDecano = checkRol.includes("decano");

      // TRUE SI ES PARTICIPANTES
      const checkExistedRolParticipante = checkRol.includes("participante");

      // console.log(checkExistedRolSecretaria);

      return (
        <>
          {/* MODAL Email Acta CERRAR */}
          {isEmailOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="mb-4 h4 text-center">
                  ¿Está seguro que desea enviar el acta por correo?
                </h2>
                <div className="mt-4 mb-4">
                  <label className="Email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingrese el correo electrónico"
                    // onChange={handleEmailChange}
                  />
                  <label className="Mensaje">Mensaje:</label>
                  <textarea
                    className="form-control"
                    placeholder="Ingrese el mensaje"
                    // onChange={handleMensajeChange}
                  />
                  <div>
                    <label className="Archivo">Archivo: </label>
                    Espacio para el archivo seleccionado
                  </div>
                </div>
                <div className="ct-btn d-flex justify-content-evenly">
                  <button
                    className="btn btn-warning"
                    onClick={handleChangeStatusModalFalse}
                  >
                    Atrás
                  </button>
                  <button className="btn btn-primary" onClick={handleEmail}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL Actualizar Estado Acta CERRAR */}
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateStatus(row.original.numeroRef)}
                  >
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(row.original._id)}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}

          <Dropdown renderToggle={renderIconButton} className="accion-drop">
            {/* ACCIONES PARA SECREATARIO */}
            {checkExistedRolSecretaria && (
              <>
                <Dropdown.Item
                  onClick={() => showStatus(row.original.id)}
                  to={`detalle-acta/referencia/${row.original.numeroRef}`}
                  className="i-revisar"
                  icon={<BsEyeglasses />}
                >
                  {" "}
                  <span>Revisar</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  className="i-editar"
                  as={NavLink}
                  to={`actualizar-acta/referencia/${row.original.ref}`}
                  icon={<FaRegEdit />}
                >
                  {" "}
                  <span>Editar</span>{" "}
                </Dropdown.Item>

                <Dropdown.Item
                  // onClick={() => handleDelete(row.original._id)}
                  className="i-borrar"
                  onClick={handleShowConfirmDeleteModal}
                  icon={<RiDeleteBinLine />}
                >
                  {"  "}
                  <span>Borrar</span>
                </Dropdown.Item>
              </>
            )}

            {checkExistedRolDecano && estado === "En proceso" && (
              <Dropdown.Item
                onClick={handleShowUpdateStatusModal}
                className="i-aprobar"
                icon={<AiOutlineLike />}
              >
                {" "}
                <span>Aprobar</span>{" "}
              </Dropdown.Item>
            )}

            {/* ACCIONES PARA DECANO */}
            {checkExistedRolDecano && (
              <>
                <Dropdown.Item
                  onClick={() => showStatus(row.original.id)}
                  to={`detalle-acta/referencia/${row.original.numeroRef}`}
                  className="i-revisar"
                  icon={<BsEyeglasses />}
                >
                  {" "}
                  <span>Revisar</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  className="i-compartir"
                  onClick={handleShowEmailModal}
                  icon={<FaShareAlt />}
                >
                  {" "}
                  <span>Compartir</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  className="i-editar"
                  as={NavLink}
                  to={`actualizar-acta/id/${row.original._id}`}
                  icon={<FaRegEdit />}
                >
                  {" "}
                  <span>Editar</span>{" "}
                </Dropdown.Item>
                <PDFDownloadLink
                  document={<DocuPDF acta={acta} />}
                  fileName="acta.pdf"
                >
                  <Dropdown.Item
                    className="i-descargar"
                    icon={<HiDocumentDownload />}
                  >
                    {" "}
                    <span> Descargar PDF</span>
                  </Dropdown.Item>
                </PDFDownloadLink>
              </>
            )}
          </Dropdown>
        </>
      );
    },
  },
];

function Dashboard() {
  const responseActas = useLoaderData();

  const data = useMemo(
    () =>
      responseActas.map((acta) => ({
        _id: acta._id,
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

      <ParticipantesTable />
    </>
  );
}

export const dashboardLoader = async () => {
  const responseActas = await ActaService.getAllActas();
  return responseActas.data;
};

export default Dashboard;
