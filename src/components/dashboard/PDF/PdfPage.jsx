import React, { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ActaService from "../../../services/ActasDataService";
import DocuPDF from "./DocuPDF";
import VistaWeb from "./VistaWeb";

import Button from "react-bootstrap/Button";

const PdfPage = () => {
  const [acta, setActa] = useState({});

  const [verWeb, setVerWeb] = useState(false);
  const [verPDF, setVerPDF] = useState(false);

  const getData = async () => {
    const response = await ActaService.getActa("1");
    setActa(response.data);
    console.log(acta);
  };

  useEffect(() => {
    getData();
  }, []);

  const Menu = () => (
    <div style={{ minHeight: "100vh" }}>
      <Menu />
      {acta ? (
        <>
          {verWeb ? <VistaWeb acta={acta} /> : null}
          {verPDF ? (
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <DocuPDF acta={acta} />
            </PDFViewer>
          ) : null}
        </>
      ) : null}
    </div>
  );

  return (
    <div>
      <nav
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          paddingBottom: "5px",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="dark"
          onClick={() => {
            setVerWeb(!verWeb);
            setVerPDF(false);
          }}
        >
          {verWeb ? "Ocultar Web" : "Ver Web"}
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            setVerPDF(!verPDF);
            setVerWeb(false);
          }}
        >
          {verPDF ? "Ocultar PDF" : "Ver PDF"}
        </Button>
        <PDFDownloadLink document={<DocuPDF acta={acta} />} fileName="acta.pdf">
          <Button variant="info">Descargar PDF</Button>
        </PDFDownloadLink>
      </nav>
    </div>
  );
};

export default PdfPage;
