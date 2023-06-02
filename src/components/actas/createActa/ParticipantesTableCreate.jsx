import React, { useEffect, useState, useMemo } from "react";
import ParticipantesService from "../../../services/ParticipantesDataServices";
import { useSortBy, useTable, useGlobalFilter } from "react-table";
import { NavLink } from "react-router-dom"; 
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { COLUMNS } from "./columns";
import './ParticipantesTable.css'


import GlobalParticipantesFilter from "./GlobalFilter";

const ParticipantesTableCreate = () => {

  const [participantes, setParticipantes] = useState([]);

  const getParticipantesData = async () => {
    const response = await ParticipantesService.getAllParticipantes()
    console.log(response.data)
    setParticipantes(response.data)
  }

  useEffect(() => {
    getParticipantesData()
  }, [])

  const data = useMemo(
    () =>
    participantes.map((participante) => ({
        nombre: participante.nombre,
        apellido: participante.apellido,
        cargo: participante.cargo,
      })),
    [participantes]
  );

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <div className="ct-header-actas">
        <div className="title-actas">
          <h2>Lista de participantes</h2>
        </div>
        <div>
          <Button as={NavLink} to="crear-participante" className="plus-acta-btn">+ Añadir participante</Button>
        </div>
      </div>

      <GlobalParticipantesFilter filter={globalFilter} setFilter={setGlobalFilter}/>

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
    </>
  );
};

export default ParticipantesTableCreate;
