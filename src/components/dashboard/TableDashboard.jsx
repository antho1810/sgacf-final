import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from 'react-table';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import './Table.css';
import GlobalActasFilter from './filters/GlobalFilter';

import moment from 'moment';

import Badge from 'react-bootstrap/Badge';

import { Dropdown, IconButton } from 'rsuite';

import { HiDotsHorizontal, HiDocumentDownload } from 'react-icons/hi';
import { BsEyeglasses } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FaShareAlt, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import React from 'react';

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

const COLUMNS = [
  {
    Header: '',
    accessor: 'id',
    Cell: ({ value }) => {
      const handleDelete = (id) => {
        console.log('Eliminar el acta: ', id);
      };
      return (
        <Dropdown renderToggle={renderIconButton} className="accion-drop">
          <Dropdown.Item className="i-revisar" icon={<BsEyeglasses />}>
            {' '}
            <span>Revisar</span>{' '}
          </Dropdown.Item>
          <Dropdown.Item className="i-aprobar" icon={<AiOutlineLike />}>
            {' '}
            <span>Aprobar</span>{' '}
          </Dropdown.Item>
          <Dropdown.Item className="i-editar" icon={<FaRegEdit />}>
            {' '}
            <span>Editar</span>{' '}
          </Dropdown.Item>
          <Dropdown.Item
            as={Button}
            onClick={() => handleDelete(value)}
            className="i-borrar"
            icon={<RiDeleteBinLine />}
          >
            {'  '}
            <span>Borrar</span>
          </Dropdown.Item>
          <Dropdown.Item className="i-compartir" icon={<FaShareAlt />}>
            {' '}
            <span>Compartir</span>{' '}
          </Dropdown.Item>
          <Dropdown.Item className="i-descargar" icon={<HiDocumentDownload />}>
            {' '}
            <span> Descargar PDF</span>
          </Dropdown.Item>
        </Dropdown>
      );
    },
  },
  { Header: '# Ref', accessor: 'numeroRef' },
  {
    Header: 'Fecha de creación',
    accessor: 'fechaCreacion',
    Cell: ({ value }) => moment(value).format('DD/MM/YYYY'),
  },
  { Header: 'Miembros presentes', accessor: 'miembrosPresentes' },
  { Header: 'Lugar', accessor: 'lugar' },
  { Header: 'Modalidad', accessor: 'modalidad' },
  {
    Header: 'Estado',
    accessor: 'estado',
    Cell: ({ value }) =>
      value === 'En proceso' ? (
        <Badge className="inProcess">
          {' '}
          <span>{value}</span>{' '}
        </Badge>
      ) : (
        <Badge className="confirmed">
          <span>{value}</span>
        </Badge>
      ),
  },
  { Header: 'Articulos', accessor: 'articulos' },
];

const TableDashboard = ({ data }) => {
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
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
  );
};

export default TableDashboard;
