export const votosData = [
  {
    nombre: "Autorización de expedición de títulos académicos",
    campos: [
      {
        nombre: "titulo",
        etiqueta: "Título del voto",
        subElementos: ["Autorización de expedición de títulos académicos"],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre completo del aspirante",
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
        subElementos: ["101756", "107290"],
        tipo: "number",
      },
      {
        nombre: "programaEstudiante",
        etiqueta: "Título que otorga",
        subElementos: ["Ingeniería de Sistemas", "Ingeniería Industrial"],
        tipo: "text",
      },
      {
        nombre: "observacion",
        etiqueta: "Observación (Comenzar con mayuscula)",
        tipo: "text",
      },
      {
        nombre: "Aprobacion",
        etiqueta: "Aprobación",
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
        subElementos: ["Homologación Interna", "Homologación Externa"],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre completo del aspirante",
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
        subElementos: ["Ingeniería de Sistemas", "Ingeniería Industrial"],
        tipo: "text",
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text",
      },
      {
        nombre: "materiaAprobada",
        etiqueta: "Materia Aprobada",
        tipo: "text",
      },
      {
        nombre: "materiaEquivalente",
        etiqueta: "Materia Equivalente",
        tipo: "text",
      },
      {
        nombre: "notaCalificacion",
        etiqueta: "Nota Final",
        tipo: "text",
      },
      {
        nombre: "credito",
        etiqueta: "Crédito",
        tipo: "text",
      },
      {
        nombre: "observacion",
        etiqueta: "Observación (Comenzar con mayuscula)",
        tipo: "text",
      },
      {
        nombre: "Aprobacion",
        etiqueta: "Aprobación",
        tipo: "text",
      },
    ],
  },
  {
    nombre: "Otros votos",
    campos: [
      {
        nombre: "titulo",
        etiqueta: "Título del voto",
        subElementos: [
          "Transferencia interna",
          "Suficiencia",
          "Materia dirigida",
          "Reingreso",
          "Autorización para cursar materia con otra malla",
          "Matricula de honor",
          "Modificación de calificaciones a un periodo cerrado",
          "Materia intesiva",
        ],
        tipo: "text",
      },
      {
        nombre: "nombreAspirante",
        etiqueta: "Nombre completo del aspirante",
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
        subElementos: ["Ingeniería de Sistemas", "Ingeniería Industrial"],
        tipo: "text",
      },
      {
        nombre: "periodo",
        etiqueta: "Periodo",
        subElementos: ["1er periodo", "2do periodo"],
        tipo: "text",
      },
      {
        nombre: "materia",
        etiqueta: "Materia",
        tipo: "text",
      },
      {
        nombre: "notaCalificacion",
        etiqueta: "Nota Final",
        tipo: "text",
      },
      {
        nombre: "creditosAdicionales",
        etiqueta: "Créditos",
        tipo: "number",
      },
      {
        nombre: "observacion",
        etiqueta: "Observación (Comenzar con mayuscula)",
        tipo: "text",
      },
      {
        nombre: "Aprobacion",
        etiqueta: "Aprobación",
        tipo: "text",
      },
    ],
  },
];

export default votosData;

// {
//   nombre: "Reingreso",
//   campos: [
//     {
//       nombre: "titulo",
//       etiqueta: "Título del voto",
//       subElementos: ["Reingreso"],
//       tipo: "text",
//     },
//     {
//       nombre: "nombreAspirante",
//       etiqueta: "Nombre completo del aspirante",
//       tipo: "text",
//     },
//     {
//       nombre: "birthDate",
//       etiqueta: "Fecha de nacimiento",
//       tipo: "date",
//     },
//     {
//       nombre: "genero",
//       etiqueta: "Genero",
//       subElementos: ["Masculino - Male", "Femenino - Female"],
//       tipo: "text",
//     },
//     {
//       nombre: "tipoDocumento",
//       etiqueta: "Tipo de documento",
//       subElementos: ["CC", "TI", "NIT", "PASAPORTE", "CE"],
//       tipo: "text",
//     },
//     {
//       nombre: "noDocumento",
//       etiqueta: "Número de documentos (sin puntos)",
//       tipo: "text",
//     },
//     {
//       nombre: "direccionResidencia",
//       etiqueta: "Dírección de Residencia",
//       tipo: "text",
//     },
//     {
//       nombre: "noTelefono",
//       etiqueta: "Número de telefono",
//       tipo: "text",
//     },
//     {
//       nombre: "estrato",
//       etiqueta: "Estrado",
//       subElementos: ["1", "2", "3", "4", "5", "6"],
//       tipo: "text",
//     },
//     {
//       nombre: "correoElectronico",
//       etiqueta: "Correo Electrónico",
//       tipo: "text",
//     },
//     {
//       nombre: "nombreEmpresa",
//       etiqueta: "Empresa",
//       tipo: "text",
//     },
//     {
//       nombre: "direccionEmpresa",
//       etiqueta: "Dírección de la Empresa",
//       tipo: "text",
//     },
//     {
//       nombre: "cargoEmpresa",
//       etiqueta: "Cargo en la empresa",
//       tipo: "text",
//     },
//     {
//       nombre: "religion",
//       etiqueta: "Religión",
//       tipo: "text",
//     },
//     {
//       nombre: "programaEstudiante",
//       etiqueta: "Programa Reingreso",
//       subElementos: ["Ingeniería de Sistemas", "Ingeniería Industrial"],
//       tipo: "text",
//     },
// {
//   nombre: "observacion",
//   etiqueta: "Observación (Comenzar con mayuscula)",
//   tipo: "text",
// },
// {
//       nombre: "Aprobacion",
//       etiqueta: "Aprobación",
//       tipo: "text",
//     },
//   ],
// },
