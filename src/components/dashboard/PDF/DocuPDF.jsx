import React, { useEffect, useState } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { actaData } from "./acta";
import ActaService from "../../../services/ActasDataService";
import "./DocuPDF.css";

const DocuPDF = () => {
  const [acta, setActa] = useState({
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
  });

  // const { ref } = useParams();

  const getData = async (ref) => {
    const response = await ActaService.getActa(ref);
    setActa(response.data);
    console.log(acta);
  };

  useEffect(() => {
    getData();
  }, []);

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
            className=" pt-1 pe-3 text-right line-height-108 text-left"
            style={{ color: "#3388af" }}
          >
            {actaData ? actaData.TITULO : "..."}
          </Text>
          <Text style={{ color: "#3388af" }}>
            {actaData ? actaData.SUBTITULO : "..."}
          </Text>

          <br />
          <div className="d-flex fs-3">
            <Text style={{ color: "#3388af" }}>
              {actaData ? actaData.REFERENCIA.acuerdo : "..."}
              {acta ? acta.numeroRef : "..."}-
              {actaData ? actaData.REFERENCIA.anno : "..."}
            </Text>
            <br />
            <Text style={{ color: "#3388af" }}></Text>
            <Text>-</Text>
            <Text style={{ color: "#3388af" }}></Text>
          </div>
          <Text style={{ color: "#3388af" }}>
            {acta ? acta.fechaCreacion : "..."}
          </Text>

          <br />

          <Text style={{ color: "#3388af" }}>
            {actaData ? actaData.PROLOGO.descAntesDeLaFecha : "..."}
            {actaData ? actaData.NOMBRE_INSTITUCION : "..."}
            {acta ? acta.fechaCreacion : "..."}
            {acta ? acta.lugar : "..."}
            {actaData ? actaData.PROLOGO.descDespuesDeLaFecha : "..."}
            {actaData ? (
              <actaData className="PROLOGO descFinal"></actaData>
            ) : (
              "..."
            )}
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
