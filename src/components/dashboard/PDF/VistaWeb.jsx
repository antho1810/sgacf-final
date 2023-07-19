import React from "react";
import moment from "moment";
import "moment/locale/es";

import actaData from "./acta";
import UNACLogo from "./logo-unac.png";

const VistaWeb = ({ acta }) => {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  let lugarTexto
  if (acta.lugar === "LDS") {
    lugarTexto = "Laboratorio de sistemas (LDS)";
  } else if (acta.lugar === "LADSIF") {
    lugarTexto = "Laboratorio de análisis de datos e investigación (LADSIF)";
  } else {
    lugarTexto = acta ? acta.lugar : "...";
  }

  const styles = {
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
      width: 120,
      height: 120,
      marginRight: 10,
    },
    subTitle: {
      fontSize: 14,
      textAlign: "center",
    },
    reference: {
      fontSize: 14,
      textAlign: "center",
      // Puedes especificar un valor numérico en píxeles aquí
    },
    paragraph: {
      fontSize: 12,
      marginBottom: 8,
      padding: 4,
    },
    tableContainer: {
      marginTop: 20,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "8px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
    emptyMessage: {
      marginTop: 20,
    },
    indexCell: {
      fontWeight: "bold",
      textAlign: "center"
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 30,
        backgroundColor: "white",
      }}
    >
      <div style={styles.heading}>
        <img src={UNACLogo} alt="UNAC Logo" style={styles.image} />
        <div className="heading-content" style={{ marginLeft: 10 }}>
          <h2 className="title" style={{ fontSize: 25 }}>
            {actaData ? actaData.TITULO : "..."}
          </h2>
          <p className="subtitle" style={styles.subTitle}>
            {actaData ? actaData.SUBTITULO : "..."}
          </p>
          <div c>
            <p className="reference" style={styles.reference}>
              {actaData ? actaData.REFERENCIA.acuerdo : "..."} -{" "}
              {acta ? acta.numeroRef : "..."} -{" "}
              {actaData ? actaData.REFERENCIA.anno : "..."}
            </p>
            <p className="date" style={styles.reference}>
              {acta
                ? moment(acta.fechaCreacion).format(`D [de] MMMM [de] YYYY`)
                : "..."}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <p style={styles.paragraph}>
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
        </p>
      </div>

      <div>
        <div style={styles.tableContainer}>
          {" "}
          {/* reducir el tamaño de los H3 */}
          {/* darle otros estilos a la tabla */}
          <h3>Miembros presentes</h3>
          {acta &&
          acta.miembrosPresentes &&
          acta.miembrosPresentes.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No.</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {acta.miembrosPresentes.map((miembro, index) => (
                  <tr key={`${miembro.nombre}-${miembro.apellido}`}>
                    <td style={(styles.td, styles.indexCell)}>{index + 1}</td>
                    <td style={styles.td}>
                      {miembro.nombre} {miembro.apellido}
                    </td>
                    <td style={styles.td}>{miembro.cargo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.emptyMessage}>No hay miembros Presentes</p>
          )}
        </div>
        <div style={styles.tableContainer}>
          {" "}
          <h3>Miembros Invitados</h3>
          {acta &&
          acta.miembrosInvitados &&
          acta.miembrosInvitados.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No.</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {acta.miembrosInvitados.map((miembro, index) => (
                  <tr key={`${miembro.nombre}-${miembro.apellido}`}>
                    <td style={(styles.td, styles.indexCell)}>{index + 1}</td>
                    <td style={styles.td}>
                      {miembro.nombre} {miembro.apellido}
                    </td>
                    <td style={styles.td}>{miembro.cargo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.emptyMessage}>No hay miembros Invitados</p>
          )}
        </div>
        <div style={styles.tableContainer}>
          {" "}
          <h3>Miembros Ausentes</h3>
          {acta && acta.miembrosAusentes && acta.miembrosAusentes.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No.</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {acta.miembrosAusentes.map((miembro, index) => (
                  <tr key={`${miembro.nombre}-${miembro.apellido}`}>
                    <td style={(styles.td, styles.indexCell)}>{index + 1}</td>
                    <td style={styles.td}>
                      {miembro.nombre} {miembro.apellido}
                    </td>
                    <td style={styles.td}>{miembro.cargo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.emptyMessage}>No hay miembros Ausentes</p>
          )}
        </div>
      </div>
      <div>
        <h3>Orden del día</h3>
        <p>{acta ? acta.cronograma : "..."}</p>
      </div>
    </div>
  );
};

export default VistaWeb;
