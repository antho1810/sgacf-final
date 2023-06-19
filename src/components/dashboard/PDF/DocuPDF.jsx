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

  // const getData = async (ref) => {
  //   const response = await ActaService.getActa(ref);
  //   setActa(response.data);
  //   console.log(acta);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "AntonFamily",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "AntonFamily",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
      fontFamily: "AntonFamily",
    },

    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      fontFamily: "AntonFamily",
    },
  });

  const pageColors = ["#f6d186", "#f67280", "#c06c84"];

  const pages = [
    { text: actaData?.TITULO || "...", image: UNACLogo },
    // {text: 'Second page content goes here...', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    // {text: 'Third page content goes here...', image: 'https://s.yimg.com/ny/api/res/1.2/Aj5UoHHKnNOpdwE6Zz9GIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/b02a71d0-a774-11ed-bf7f-08714e8ad300' },
  ];

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
      <View className="d-flex fs-3">
        <Text style={{ color: "#3388af" }}>
          {actaData ? actaData.REFERENCIA.acuerdo : "..."}
          {acta ? acta.numeroRef : "..."}-
          {actaData ? actaData.REFERENCIA.anno : "..."}
        </Text>
            {/* <Text style={{ color: "#3388af" }}></Text> */}
      </View>
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
