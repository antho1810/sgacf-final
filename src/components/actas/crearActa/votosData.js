export const votosData = [
  {
    nombre: "Autorización de expedición de títulos académicos",
    campos: [
      {
        nombre: "titulo",
        etiqueta: "Titulo del voto",
        subElementos: ["Autorización de expedición de títulos académicos"],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre del aspirante",
        tipo: "text",
      },
      {
        nombre: "tipoDocumento",
        etiqueta: "Tipo de documento",
        subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
        tipo: "text",
      },
      {
        nombre: "noDocumento",
        etiqueta: "Número de documentos (sin puntos)",
        tipo: "text",
      },
      {
        nombre: "codigoSnies",
        etiqueta: "Código SNIES",
        tipo: "number",
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Título que otorga",
        tipo: "text",
      },
    ],
  },
  {
    nombre: "Homologaciones",
    campos: [
      {
        nombre: "titulo",
        etiqueta: "Tipo de homologación",
        subElementos: ["Homologacíon Interna", "Homologacíon Externa"],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre del aspirante",
        tipo: "text",
      },
      {
        nombre: "tipoDocumento",
        etiqueta: "Tipo de documento",
        subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
        tipo: "text",
      },
      {
        nombre: "noDocumento",
        etiqueta: "Número de documentos (sin puntos)",
        tipo: "text",
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Programa",
        tipo: "text",
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text",
      },
      {
        nombre: "materiaAprovada",
        etiqueta: "Materia Aprobada",
        tipo: "text",
      },
      {
        nombre: "materiaEquivalente",
        etiqueta: "Materia Equivalente",
        tipo: "text",
      },
      {
        nombre: "nota",
        etiqueta: "Nota",
        tipo: "text",
      },
      {
        nombre: "credito",
        etiqueta: "Crédito",
        tipo: "text",
      },
    ],
  },
  {
    nombre: "Otros votos",
    campos: [
      {
        nombre: "titulo",
        etiqueta: "Titulo del voto",
        subElementos: [
          "Transferencia interna",
          "Suficiencia",
          "Materia dirigida",
          "Reingreso",
          "Autorizacion para cursar materia con otra malla",
          "Matricula de honor",
          "modificacion de calificaciones a un periodo cerrado",
          "Materia intesiva",
        ],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre del aspirante",
        tipo: "text",
      },
      {
        nombre: "tipoDocumento",
        etiqueta: "Tipo de documento",
        subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
        tipo: "text",
      },
      {
        nombre: "noDocumento",
        etiqueta: "Número de documentos (sin puntos)",
        tipo: "text",
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Programa",
        tipo: "text",
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text",
      },
    ],
  },
];

export default votosData;