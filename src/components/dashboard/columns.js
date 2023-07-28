import { useCallback } from 'react';

import moment from 'moment';

import ActaService from '../../services/ActasDataService';

import { NavLink } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';

import { Dropdown, IconButton } from 'rsuite';

import { HiDotsHorizontal, HiDocumentDownload } from 'react-icons/hi';
import { BsEyeglasses } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FaShareAlt, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

const btnDelete = async (id) => {
  // await ActaService.deleteActa(id)
  console.log(id);
};

export const COLUMNS = [
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
  {
    Header: '',
    accessor: '_id',
    Cell: ({ value }) => {
      const handleDelete = useCallback(() => btnDelete(value), [value]);

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
            onClick={handleDelete}
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
];
