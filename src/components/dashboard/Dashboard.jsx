import React, { useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";

import ActaService from "../../services/ActaDataService";
import ParticipantesServices from "../../services/ParticipantesDataServices";

import { COLUMNS } from "./columns";

import Navbarside from "../../routesLayouts/RootLayout";
import CrearActa from "../actas/createActa/CreateActa";
import UpdateActa from "../actas/updateActa/UpdateActa";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import "./Dashboard.css";
import "./Table.css";
import CreateActa from "../actas/createActa/CreateActa";
import { useLoaderData } from "react-router-dom";
import ParticipantesTable from "../participantes/participantesTable/ParticipantesTable";

function Dashboard() {
  const responseActas = useLoaderData();
  const participantes = useLoaderData();

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

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className="ct-header-actas">
        <div className="title-actas">
          <h2>Lista de actas</h2>
        </div>
        <div>
          <Button className="plus-acta-btn">+ Añadir acta</Button>
        </div>
      </div>

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
          {rows.map((row) => {
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

      <ParticipantesTable/>
    </>
  );
}

export const dashboardLoader = async () => {
  const responseActas = await ActaService.getAllActas();
  return responseActas.data
};

export default Dashboard;
