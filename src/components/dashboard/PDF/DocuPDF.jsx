import React, { useEffect, useState } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { actaData } from "./acta";
import "./DocuPDF.css";
// import ActaService from "../../../services/ActasDataService";

const DocuPDF = ({ acta }) => {
  // const [acta, setActa] = useState({
  // lugar: "",
  // modalidad: "",
  // horaInicio: "",
  // horaFinal: "",
  // cronograma: "",
  // miembrosPresentes: [
  //   {
  //     id: "",
  //   },
  // ],
  // miembrosAusentes: [
  //   {
  //     id: "",
  //   },
  // ],
  // miembrosInvitados: [
  //   {
  //     id: "",
  //   },
  // ],
  // articulos: [],
  // documentosSoporte: [],
  // });

  // const { ref } = useParams();

  // const getData = async (ref) => {
  //   const response = await ActaService.getActa(ref);
  //   setActa(response.data);
  //   console.log(acta);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text
            className="pe-3 text-right text-top"
            style={{ color: "#000", fontSize: "18px" }}
          >
            {actaData ? actaData.TITULO : "..."}
          </Text>
          <Text style={{ color: "#000", fontSize: "14px" }}>
            {actaData ? actaData.SUBTITULO : "..."}
          </Text>

          <br />
          <div className="d-flex fs-3">
            <Text
              style={{ display: "flex", color: "#000", fontWeight: "bold" }}
            >
              {actaData ? actaData.REFERENCIA.acuerdo : "... "}
              numeroRef
              {acta ? acta.numeroRef : "1"}-
              {actaData ? actaData.REFERENCIA.anno : "..."}
            </Text>
            <br />
          </div>
          <Text style={{ color: "#000" }}>
            {acta ? acta.fechaCreacion : "07/06/2023"}
          </Text>

          <br />

          <Text style={{ color: "#000", fontSize: "14px" }}>
            {actaData ? actaData.PROLOGO.descAntesDeLaFecha : "..."}
            {actaData ? actaData.NOMBRE_INSTITUCION : "..."}
            {/* {acta ? acta.fechaCreacion : "..."}
            {acta ? acta.lugar : "..."} */}
            {actaData ? actaData.PROLOGO.descDespuesDeLaFecha : "..."}
            {actaData ? actaData.PROLOGO.desFinal : "..."}
          </Text>

          <br />
          <Text style={{display:"flex"}}>
            <Text>Miembros Presentes</Text>
            <Text>
              {acta.miembrosPresentes ? (
                acta.miembrosPresentes.map((item) => (
                  <Text key={item._id}>
                    <Text>
                      {item.nombre} {item.apellido}
                    </Text>
                  </Text>
                ))
              ) : (
                <Text>No hay miembros presentes</Text>
              )}
            </Text>
            <Text>Miembros Ausentes</Text>
            <Text>
              {acta.miembrosAusentes ? (
                acta.miembrosAusentes.map((item) => (
                  <Text key={item._id}>
                    <Text>
                      {item.nombre} {item.apellido}
                    </Text>
                  </Text>
                ))
              ) : (
                <Text>No hay miembros ausentes</Text>
              )}
            </Text>
            <Text>Miembros Invitados</Text>
            <Text>
              {acta.miembrosInvitados ? (
                acta.miembrosInvitados.map((item) => (
                  <Text key={item._id}>
                    <Text>
                      {item.nombre} {item.apellido}
                    </Text>
                  </Text>
                ))
              ) : (
                <Text>No hay miembros invitados</Text>
              )}
            </Text>
          </Text>

          <Text style={{ display: "flex", marginTop: "10px"  }}>
            <Text>Firmas</Text>
            <Text>{ actaData ? actaData.FIRMAS.JFNM : "..." }</Text>
            <Text>{ actaData ? actaData.FIRMAS.OJD : "..." }</Text>
          </Text>

          <Text>Lugar: {acta ? acta.lugar : "..."}</Text>
          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "10px",
            }}
          >
            Estado del acta: {acta.estado}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
