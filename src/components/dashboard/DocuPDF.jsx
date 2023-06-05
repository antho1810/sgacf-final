import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const DocuPDF = ({ acta }) => {
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text style={{ color: "#3388af", fontSize: "42px" }}>
            {acta ? acta.numeroRef : "..."}
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
