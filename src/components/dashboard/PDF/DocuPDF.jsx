import React, { useEffect, useState } from "react";
// Document --> es el documento completo
// Page --> Paginas del documento
// Text --> Cual etiqueta de texto de HTML
// View --> Es la etiqueta Div
// Image --> Imagen que se utilizara en el documento
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import UNACLogo from "./logo-unac.png";
import actaData from "./acta";
import ActaService from "../../../services/ActasDataService";
import "./DocuPDF.css";
import { useParams } from "react-router-dom";
import moment from "moment";

const DocuPDF = () => {
  const [acta, setActa] = useState({
    // lugar:"",
    // modalidad: "",
    // horaInicio: "",
    // horaFinal: "",
    // cronograma,
    // miembrosPresentes: [
    //   {
    //     id,
    //   },
    // ],
    // miembrosAusentes: [
    //   {
    //     id,
    //   },
    // ],
    // miembrosInvitados: [
    //   {
    //     id,
    //   },
    // ],
    // articulos: [],
    // documentosSoporte: [],
  });


  const getData = async (ref) => {
    const response = await ActaService.getActa("10");
    setActa(response.data);
    console.log(acta);
  };

   let lugarTexto;
   if (acta.lugar === "LDS") {
     lugarTexto = "Laboratorio de sistemas (LDS)";
   } else if (acta.lugar === "LADSIF") {
     lugarTexto = "Laboratorio de análisis de datos e investigación (LADSIF)";
   } else {
     lugarTexto = acta ? acta.lugar : "...";
   }

  useEffect(() => {
    getData();
  }, []);

  const styles = StyleSheet.create({
    // page: {
    //   flexDirection: "row",
    //   backgroundColor: "#E4E4E4",
    // },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "table",
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#000",
      padding: 5,
      textAlign: "center",
    },
    page: {
      backgroundColor: "white",
      padding: 20,
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    subTitle: {
      fontSize: 14,
      textAlign: "center",
    },
    reference: {
      fontSize: 14,
      textAlign: "center",
    },
    paragraph: {
      fontSize: 12,
      marginBottom: 8,
    },
    tableContainer: {
      marginBottom: 10,
    },
    // table: {
    //   display: "table",
    //   width: "auto",
    //   marginBottom: 10,
    // },
    // tableRow: {
    //   flexDirection: "row",
    // },
    th: {
      border: "1px solid black",
      backgroundColor: "#f2f2f2",
      padding: 5,
      flex: 1,
    },
    td: {
      border: "1px solid black",
      padding: 5,
      flex: 1,
    },
    emptyMessage: {
      fontStyle: "italic",
    },
    indexCell: {
      width: "10%",
    },
  });

  const pages = [{ text: actaData?.TITULO || "...", image: UNACLogo }];

  return (
   
    <Document>
      <Page size="A4" style={styles.page}>
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
          <View style={styles.heading}>
            <Image src={UNACLogo} style={styles.image} />
            <View style={{ alignItems: "center" }}>
              <Text
                className=" pt-1 pe-3 text-right line-height-108 text-left"
                style={{ fontSize: 18 }}
              >
                {actaData ? actaData.TITULO : "..."}
              </Text>
              <Text style={styles.subTitle}>
                {actaData ? actaData.SUBTITULO : "..."}
              </Text>
              <Text style={styles.reference}>
                {actaData ? actaData.REFERENCIA.acuerdo : "..."}
                {acta ? acta.numeroRef : "..."}-
                {actaData ? actaData.REFERENCIA.anno : "..."}
              </Text>
              <Text style={styles.reference}>
                {acta
                  ? moment(acta.fechaCreacion).format(`D [de] MMMM [de] YYYY`)
                  : "..."}
              </Text>
            </View>
          </View>

          <br />

          <Text style={styles.paragraph}>
            {actaData ? actaData.PROLOGO.descAntesDeLaFecha : "..."}
            {actaData ? actaData.NOMBRE_INSTITUCION : "..."}, reunido el día{" "}
            {acta
              ? moment(acta.fechaCreacion).format(`dddd DD [de] MMMM [de] YYYY`)
              : "..."}{" "}
            en el
            {lugarTexto} {actaData ? actaData.PROLOGO.desDespuesFecha : "..."}{" "}
            {acta ? moment(acta.horaInicio).format("h:mm a") : "..."} -{" "}
            {acta ? moment(acta.horaFinal).format("h:mm a") : "..."}{" "}
            {actaData ? actaData.PROLOGO.desFinal : "..."}
          </Text>

             <View>
        <View style={styles.tableContainer}>
          <Text style={styles.heading}>Miembros presentes</Text>
          {acta &&
          acta.miembrosPresentes &&
          acta.miembrosPresentes.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.th}>No.</Text>
                <Text style={styles.th}>Nombre</Text>
                <Text style={styles.th}>Cargo</Text>
              </View>
              {acta.miembrosPresentes.map((miembro, index) => (
                <View key={`${miembro.nombre}-${miembro.apellido}`} style={styles.tableRow}>
                  <Text style={(styles.td, styles.indexCell)}>{index + 1}</Text>
                  <Text style={styles.td}>
                    {miembro.nombre} {miembro.apellido}
                  </Text>
                  <Text style={styles.td}>{miembro.cargo}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyMessage}>No hay miembros Presentes</Text>
          )}
        </View>
       
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
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;

{
  /* 
   {pages.map((page, index) => {
        return (
          <Page
            key={index}
            style={{ ...styles.body, backgroundColor: pageColors[index] }}
          >
            <View>
              <Text style={styles.header} fixed></Text>
              <Image style={styles.image} src={pages.image} />
              <Text style={styles.text}>{pages.text}</Text>
              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
              />
            </View>
          </Page>
        );
      })}
   */
}
