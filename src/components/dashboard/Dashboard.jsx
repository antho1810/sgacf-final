import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


import ActaService from "../../services/ActasDataService";
import { useLoaderData, NavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ParticipantesTable from "../participantes/participantesTable/ParticipantesTable";

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

import Badge from "react-bootstrap/Badge";

import { Dropdown, IconButton } from "rsuite";

import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";
import { BsEyeglasses } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaShareAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import httpCommon from "../../http-common";

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

function Dashboard() {
  const responseActas = useLoaderData();
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [ref, setRef] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // const response = await httpCommon.post("/services/mails/send", data)

    const token = localStorage.getItem("token");

    const response = await httpCommon.post("/services/mails/send-pdf", {
      ...data,
      ref: ref,
      token: token,
    });

    const status = response.status;
    const message = response.data.message;
    console.log(`Status: ${status} --- Response: ${message}`);

     Swal.fire({
       icon: "success",
       title: "El correo enviado con éxito",
       text: `${message}`,
       showConfirmButton: false,
       timer: 1500,
     });
  };

  const handleEmailModal = (state, ref) => {
    setIsEmailOpen(state);
    setRef(ref);
  };

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
        articulo: acta.articulos.map(
          (item) => `${item.titulo}, `
        ),
      })),
    [responseActas]
  );

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
    { Header: "Articulos", accessor: "articulo" },
    {
      Header: "",
      accessor: "id",
      disableSortBy: true,
      Cell: ({ row }) => {
        // GLOBAL ACCESSORS
        const rowId = row.original._id;
        const rowRef = row.original.numeroRef;
        const rowState = row.original.estado;

        const handleDelete = async (id) => {
          await ActaService.deleteActa(id);
          window.location.reload();
        };

        const handleDeleteWithConfirmation = (id) => {
          Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Quieres eliminar el acta ${rowRef}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              // Usuario confirmó la eliminación, llamar a handleDelete
              await handleDelete(id);
            }
          });
        };

          const handleSendDoc = async (id) => {
           await ActaService.getAndDownloadOneByRef(id);
         };


        const handleUpdateStatus = async (ref) => {
          await ActaService.updateStatusActa(ref, { estado: "Aprobado" });
          window.location.reload();
        };

         const handleUpdateStatusWithConfirmation = (ref) => {
           Swal.fire({
             title: "¿Estás seguro?",
             text: `¿Quieres actualizar el acta ${rowRef} a "Aprobado"?`,
             icon: "warning",
             showCancelButton: true,
             confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
             confirmButtonText: "Sí, actualizar",
             cancelButtonText: "Cancelar",
           }).then(async (result) => {
             if (result.isConfirmed) {
               // Usuario confirmó la actualización, llamar a handleUpdateStatus
               await handleUpdateStatus(ref);
             }
           });
         };

        const showStatus = (estado) => {
          console.log(estado);
        };

        const estado = row.original.estado;

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
          // var checkExistedRolParticipante = checkRol.includes("participante");
        }

        return (
          <Dropdown renderToggle={renderIconButton} className="accion-drop">
            {/* ACCIONES PARA SECREATARIA */}
            {checkExistedRolSecretaria && (
              <>
                <Dropdown.Item
                  onClick={() => showStatus(row.original.id)}
                  to={`details-acta/referencia/${rowRef}`}
                  as={NavLink}
                  className="i-revisar"
                  icon={<BsEyeglasses />}
                >
                  {" "}
                  <span>Revisar</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  className="i-editar"
                  as={NavLink}
                  to={`actualizar-acta/referencia/${rowRef}`}
                  icon={<FaRegEdit />}
                >
                  {" "}
                  <span>Editar</span>{" "}
                </Dropdown.Item>

                <Dropdown.Item
                  className="i-borrar"
                  onClick={() => handleDeleteWithConfirmation(rowId)}
                  icon={<RiDeleteBinLine />}
                >
                  {"  "}
                  <span>Borrar</span>
                </Dropdown.Item>
                {/* <PDFDownloadLink
                  document={<DocuPDF acta={acta} />}
                  fileName="acta.pdf"
                > */}
                <Dropdown.Item
                  onClick={() => handleSendDoc(row.original.numeroRef)}
                  className="i-descargar"
                  icon={<HiDocumentDownload />}
                >
                  {" "}
                  <span> Descargar PDF</span>
                </Dropdown.Item>
                {/* </PDFDownloadLink> */}
                <Dropdown.Item
                  className="i-compartir"
                  onClick={() => handleEmailModal(true, rowRef)}
                  icon={<FaShareAlt />}
                >
                  {" "}
                  <span>Compartir</span>{" "}
                </Dropdown.Item>
              </>
            )}

            {checkExistedRolDecano && estado === "En proceso" && (
              <>
                <Dropdown.Item
                  onClick={() => handleUpdateStatusWithConfirmation(rowRef)}
                  className="i-aprobar"
                  icon={<AiOutlineLike />}
                >
                  {" "}
                  <span>Aprobar</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  className="i-editar"
                  as={NavLink}
                  to={`actualizar-acta/referencia/${rowRef}`}
                  icon={<FaRegEdit />}
                >
                  {" "}
                  <span>Editar</span>{" "}
                </Dropdown.Item>
              </>
            )}

            {/* ACCIONES PARA decano */}
            {checkExistedRolDecano && (
              <>
                <Dropdown.Item
                  className="i-borrar"
                  onClick={() => handleDeleteWithConfirmation(rowId)}
                  icon={<RiDeleteBinLine />}
                >
                  {"  "}
                  <span>Borrar</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => showStatus(rowState)}
                  to={`details-acta/referencia/${rowRef}`}
                  as={NavLink}
                  className="i-revisar"
                  icon={<BsEyeglasses />}
                >
                  {" "}
                  <span>Revisar</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleEmailModal(true, rowRef)}
                  className="i-compartir"
                  icon={<FaShareAlt />}
                >
                  {" "}
                  <span>Compartir</span>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSendDoc(row.original.numeroRef)}
                  className="i-descargar"
                  icon={<HiDocumentDownload />}
                >
                  {" "}
                  <span> Descargar PDF</span>
                </Dropdown.Item>
              </>
            )}
          </Dropdown>
        );
      },
    },
  ];

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
      {isEmailOpen && (
        <div
          className="modal align-items-center"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <div className="modal-content py-4 h-auto align-items-center">
            <h2 className="mb-2 h4 text-center">
              Complete la información de la persona a la que le llegará el
              correo
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-3">
              <div className="d-flex gap-2">
                <div className="d-flex flex-column">
                  <label className="form-label">Nombre:</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="form-control"
                    placeholder="Ingrese nombre de quien lo envia"
                  />
                </div>

                <div className="d-flex flex-column">
                  <label className="form-label">Email:</label>
                  <input
                    {...register("to")}
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el correo de la persona que recibirá el correo"
                  />
                </div>
              </div>

              <div className="d-flex mt-3 gap-2">
                <div className="d-flex flex-column">
                  <label className="form-label">Asunto del mensaje:</label>
                  <input
                    {...register("subject")}
                    type="text"
                    className="form-control"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="form-label">Cuerpo del mensaje:</label>
                  <textarea
                    {...register("bodyEmail")}
                    className="form-control"
                    placeholder="Mensaje"
                    style={{ height: "70px" }}
                  />
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 justify-content-end">
                <button
                  onClick={() => handleEmailModal(false)}
                  className="btn btn-danger"
                >
                  Atrás
                </button>
                <button
                  className="btn btn-primary"
                  value="Send"
                  type="submit"
                  // onClick={handleEmail}
                >
                  Enviar correo
                </button>
              </div>
            </form>
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
