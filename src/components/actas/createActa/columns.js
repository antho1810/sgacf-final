import Form from "react-bootstrap/Form"

const handleCheckboxChange = (selectedId) => {
  // Aquí puedes hacer lo que necesites con el _id seleccionado
  console.log("Miembro seleccionado:", selectedId);
};

export const COLUMNS = [
  {
    Header: "seleccionar",
    accessor: "_id",
    Cell: ({ row }) => (
      <Form.Check
        aria-label="Seleccionar miembro"
        onChange={() => handleCheckboxChange(row.original._id)}
      />
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