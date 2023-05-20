import React from "react";
import ActaService from "../../../services/ActasDataService";
import { useEffect } from "react";
import { useMemo } from "react";

const ActaDetails = () => {
  const [acta, setActa] = useState([]);
  
  const getActaById = async () => {
    const response = await ActaService.getActa(id)
    console.log(response.data)
    setActa(response.data)
  }

  useEffect(() => {
    getActaById()
  }, [])

  const data = useMemo(
    () => {
      acta.map((acta) => ({
        id: acta.id,
        numeroRef: acta.numeroRef,
        fechaCreacion: acta.fechaCreacion,
        miembrosPresentes: acta.miembrosPresentes,
        miembrosAusentes: acta.miembrosAusentes,
        miembrosInvitados: acta.miembrosInvitados,
        lugar: acta.lugar,
        modalidad: acta.modalidad,
        estado: acta.estado,
        horaInicio: acta.horaInicio,
        horaFinal: acta.horaFinal,
        docsSoporte: acta.docsSoporte
      }))
    }
  )

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  //   state,
  // } = tableInstance;
    


  return <div>
    <div className="ct-header-details">
      <div className="title">
        <h2>Detalles del acta</h2>
      </div>
    </div>
    {/* Container Informacion */}
    <div className="ct-informacion"></div>
    {/* Container Articulos */}
    <Container className="ct-articulos" >
      <span className="header">
        
      </span>
    </Container>
    {/* Container Documentos Soporte */}
    <div className="ct-docsSoprot"></div>
    <Container fluid>
      <Row className="mb-3">
        <Col
          style={
          {height: "80px",
        }}>
          
          </Col>
      </Row>
    </Container>
  </div>;
};

export default ActaDetails;
