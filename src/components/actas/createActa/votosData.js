export const votosData = [
  {
    nombre: "Autorización de expedición de títulos acádemicos",
    grupo: "1",
    elementos: [
      {
        tipo: "Autorización de expedición de título acádemicos",
      },
    ],
    campos: [
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
        tipo: "text"
      },
      {
        nombre: "codigoSnies",
        etiqueta: "Código SNIES",
        tipo: "number"
      },
      {
        nombre: "tituloOtorga",
        etiqueta: "Título que otorga",
        tipo: "text"
      }

    ],
  },
  {
    nombre: "Homologaciones",
    grupo: "2",
    elementos: [
      {
        tipo: "Homologación interna",
      },
      {
        tipo: "Homologación externa",
      },
    ],
    campos: [
      {
        nombre: "tipo",
        etiqueta: "Tipo de homologación",
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre del aspirante",
        subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
        tipo: "text",
      },
      {
        nombre: "noDocumento",
        etiqueta: "Número de documentos (sin puntos)",
        tipo: "text"
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Programa",
        tipo: "text"
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text"
      },
      {
        nombre: "materiaLicei",
        etiqueta: "Materia Licei",
        tipo: "text"
      },
      {
        nombre: "materiaEquivalente",
        etiqueta: "Materia Equivalente",
        tipo: "text"
      },
      {
        nombre: "nota",
        etiqueta: "nota",
        tipo: "text"
      },
      {
        nombre: "credito",
        etiqueta: "credito",
        tipo: "text"
      }

    ],
  },
  {
    nombre: "Otros votos",
    grupo: "3",
    elementos: [
      {
        tipo: "Transferencia interna",
      },
      {
        tipo: "Suficiencia",
      },
      {
        tipo: "Materia dirigida",
      },
      {
        tipo: "Reingreso",
      },
      {
        tipo: "Autorización para cursar materia con malla actual",
      },
      {
        tipo: "Materia de honor",
      },
      {
        tipo: "Modificación de calificaciones",
      },
      {
        tipo: "Materia intensiva",
      },
    ],
    campos: [
      {
        nombre: "tituloVoto",
        etiqueta: "titulo voto",
        tipo: "text",
      },
      {
        nombre: "nombre",
        etiqueta: "Nombre del aspirante",
        tipo: "text",
      },
      {
        nombre: "tipoDocumento",
        etiqueta: "tipo documento",
        subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
        tipo: "text",
      },
      {
        nombre: "noDocumento",
        etiqueta: "Número de documentos (sin puntos)",
        tipo: "text"
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Programa",
        tipo: "text"
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text"
      }
    ],
  },
];

export default votosData;
