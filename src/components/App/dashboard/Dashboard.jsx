import React, { useMemo, useState, useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import ActaService from "../../../services/ActaDataService.js";

import { COLUMNS } from "./columns.js";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbarside from "../Layout/Navbarside";

import "./Dashboard.css";
import "./Table.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function Dashboard() {
  const [actas, setActas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await ActaService.getAllActas();
      setActas(response.data);
      console.log(actas);
    }
    fetchData();
  }, [actas]);

  const data = useMemo(
    () =>
      actas.map((acta) => ({
        numeroRef: acta.numeroRef,
        fechaCreacion: acta.fechaCreacion,
        miembrosPresentes: acta.miembrosPresentes.map(
          (miembro) => `${miembro.nombre} ${miembro.apellido}, `
        ),
        lugar: acta.lugar,
        modalidad: acta.modalidad,
        estado: acta.estado,
        articulo: acta.articulos.articulo1,
      })),
    [actas]
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
    <div className="main">
      <Container fluid className="grid-global-content">
        <div className="ct-sidenav">
          <Navbarside></Navbarside>
        </div>
        <div className="ct-main-content">
          <div className="ct-header-actas">
            {/* Header Title */}
            <div className="title-actas">
              <h2>Lista de Actas</h2>
            </div>
            {/* Header Buttons */}
            <div>
              <Button className="plush-acta-btn">+ Añadir acta</Button>
            </div>
          </div>
          {/* Table */}
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

          {/* Table */}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
