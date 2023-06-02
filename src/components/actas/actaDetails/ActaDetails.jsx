import React, { useState, useMemo } from "react";
import ActaService from "../../../services/ActasDataService";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";


const ActaDetails = () => {
  const [acta, setActa] = useState([]);
  
  useEffect(  ()=>
 { const fetchData = async () => {
    const response = await ActaService.getActa("6453013ca10254386459cccc");
    setActa(response.data)
    console.log(response.data)
    console.log(acta)
  }
  fetchData()},[])



  // const data = useMemo(
  //   () => {
  //     return acta.map((acta) => ({
  //       id: acta._id,
  //       numeroRef: acta.numeroRef,
  //       fechaCreacion: acta.fechaCreacion,
  //       miembrosPresentes: acta.miembrosPresentes,
  //       miembrosAusentes: acta.miembrosAusentes,
  //       miembrosInvitados: acta.miembrosInvitados,
  //       lugar: acta.lugar,
  //       modalidad: acta.modalidad,
  //       estado: acta.estado,
  //       horaInicio: acta.horaInicio,
  //       horaFinal: acta.horaFinal,
  //       docsSoporte: acta.docsSoporte
  //     }))
  //   }
  // )

  // const [acta, setActa] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await ActaService.getActa("646b9a3cf31d14ee45504c32");
  //     setActa(response.data);
  //     console.log(response.data);
  //     console.log(acta);
  //   };
  //   fetchData();
  // }, []);
  // return (
  //   <>
  //     <p> {acta.numeroRef} </p>
  //     <div className="d-flex">
  //       <h1 className="h4">Lugar</h1>
  //       <p> {acta.lugar} </p>
  //     </div>
  //   </>
  // );
  // import React, { useEffect, useState } from "react";
  // import ActaService from "../../services/ActasDataService";

  return (
    <div>
      <div className="ct-header-details">
        <div className="title">
          <h2>Detalles del acta</h2>
        </div>
      </div>
      {/* Container Informacion */}
      <div className="ct-informacion">
        <p>{acta.numeroRef}</p>
        <div className="d-flex">
           <h1 className="h4">Lugar</h1>
           <p> {acta.lugar} </p>
        </div>
      </div>
      {/* Container Articulos */}
      <Container className="ct-articulos">
        <span className="header"></span>
      </Container>
      {/* Container Documentos Soporte */}
      <div className="ct-docsSoprot"></div>
      <Container fluid>
        <Row className="mb-3">
          <Col style={{ height: "80px" }}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ActaDetails;
