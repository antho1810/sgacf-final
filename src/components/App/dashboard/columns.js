import moment from "moment";
import Badge from "react-bootstrap/Badge";

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
        <Badge bg="warning" text="dark">
          {value}
        </Badge>
      ) : (
        <Badge bg="success" text="dark">
          {value}
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
      <select>
        <option>Opciones</option>
        <option>Opciones</option>
        <option>Opciones</option>
        <option>Opciones</option>
      </select>
    ),
  },
];
