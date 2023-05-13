import moment from "moment";
import Badge from "react-bootstrap/Badge";
import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";

import { Dropdown, IconButton } from "rsuite";

import { BsEyeglasses } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

export const COLUMNS = [
  { Header: "# Ref", accessor: "numeroRef" },
  {
    Header: "Fecha de Creacion",
    accessor: "fechaCreacion",
    Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
  },
  {
    Header: "Miembros Presentes",
    accessor: "miembrosPresentes",
  },
  {
    Header: "Lugar",
    accessor: "lugar",
  },
  {
    Header: "Modalidad",
    accessor: "modalidad",
  },
  {
    Header: "Estado",
    accessor: "estado",
    Cell: ({ value }) =>
      value === "En proceso" ? (
        <Badge className="inProcess">
          <span>{value}</span>
        </Badge>
      ) : (
        <Badge className="confirmed">
          <span>{value}</span>
        </Badge>
      ),
  },
  {
    Header: "Articulos",
    accessor: "articulos",
  },
  {
    Header: "Acciones",
    accessor: "_id", //localhost:4000/api/actas/id/:id
    Cell: ({ value }) => (
      <Dropdown renderToggle={renderIconButton} className="accion-drop">
        <Dropdown.Item className="i-revisar" icon={<BsEyeglasses />}>
          <span>Revisar</span>
        </Dropdown.Item>
        <Dropdown.Item className="i-aprobar" icon={<AiOutlineLike />}>
          <span>Aprobar</span>
        </Dropdown.Item>
        <Dropdown.Item className="i-eliminar" icon={<RiDeleteBinLine />}>
          <span>Eliminar</span>
        </Dropdown.Item>
        <Dropdown.Item className="i-editar" icon={<FaRegEdit />}>
          <span>Editar</span>
        </Dropdown.Item>
        <Dropdown.Item className="i-descargar" icon={<HiDocumentDownload />}>
          <span>Descargar</span>
        </Dropdown.Item>
        <Dropdown.Item className="i-compartir" icon={<FaShareAlt />}>
          <span>Compartir</span>
        </Dropdown.Item>
      </Dropdown>
    ),
  },
];
