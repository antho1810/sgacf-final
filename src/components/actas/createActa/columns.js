import Badge from "react-bootstrap/Badge";

import { Dropdown, IconButton } from "rsuite";

import { HiDotsHorizontal, HiDocumentDownload } from "react-icons/hi";
import Form from "react-bootstrap/Form";

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<HiDotsHorizontal />} circle />;
};

export const COLUMNS = [
  {
    Header: "seleccionar",
    accessor: "_id",
    Cell: ({ value }) => (
      <Form.Check aria-label="option 1" />
    )
  },

  { Header: "nombre", accessor: "nombre" },

  {
    Header: "apellido",
    accessor: "apellido",
  },
  {
    Header: "cargo",
    accessor: "cargo",
  },
];
