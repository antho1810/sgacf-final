// actas.articulos.map( articulo => {
//   articulo.nombre,
//   articulo.campos.map( campo => {
//     campo.nombre,
//     campo.etiqueta // UTILIZAS ESTE PARA DESPLEGAR LA INFORMACION DEL CAMPO,
//     campo.tipo,
//     campo.definiciones.map( definicion => {
//       definicion.nombre,
//       definicion.fecha,
//       definicion.garantia
//     })
//   })
// })

export const votosData = [
  {
    nombre: 'Autorización de expedición de títulos académicos',
    campos: [
      {
        nombre: 'titulo',
        etiqueta: 'Titulo del voto',
        subElementos: ['Autorización de expedición de títulos académicos'],
        tipo: 'text'
        // definiciones: [
        //   {
        //     titulo: "La guarida",
        //     fecha,
        //     garantia
        //   },
        //   // ...
        // ]
      },
      {
        nombre: 'nombreAspirante',
        etiqueta: 'Nombre del aspirante',
        tipo: 'text',
      },
      {
        nombre: 'tipoDocumento',
        etiqueta: 'Tipo de documento',
        subElementos: ['CC', 'TI', 'NIT', 'PASAPORTE', 'CE'],
        tipo: 'text',
      },
      {
        nombre: 'noDocumento',
        etiqueta: 'Número de documentos (sin puntos)',
        tipo: 'text',
      },
      {
        nombre: 'codigoSnies',
        etiqueta: 'Código SNIES',
        tipo: 'number',
      },
      {
        nombre: 'tituloOtorga',
        etiqueta: 'Título que otorga',
        tipo: 'text',
      },
    ],
  },
  {
    nombre: 'Homologaciones',
    campos: [
      {
        nombre: 'titulo',
        etiqueta: 'Titulo del voto',
        subElementos: ['Homologaciones'],
        tipo: 'text'
      },
      {
        nombre: 'tipo',
        etiqueta: 'Tipo de homologación',
        subElementos: ['Interna', 'Externa'],
        tipo: 'text',
      },
      {
        nombre: 'nombreAspirante',
        etiqueta: 'Nombre del aspirante',
        tipo: 'text',
      },
      {
        nombre: 'tipoDocumento',
        etiqueta: 'Tipo de documento',
        subElementos: ['CC', 'TI', 'NIT', 'PASAPORTE', 'CE'],
        tipo: 'text',
      },
      {
        nombre: 'noDocumento',
        etiqueta: 'Número de documentos (sin puntos)',
        tipo: 'text',
      },
      {
        nombre: 'programaEstudiante',
        etiqueta: 'Programa',
        tipo: 'text',
      },
      {
        nombre: 'periodo',
        etiqueta: 'Periodo',
        subElementos: ['1er periodo', '2do periodo'],
        tipo: 'text',
      },
      {
        nombre: 'materiaLicei',
        etiqueta: 'Materia Licei',
        tipo: 'text',
      },
      {
        nombre: 'materiaEquivalente',
        etiqueta: 'Materia Equivalente',
        tipo: 'text',
      },
      {
        nombre: 'nota',
        etiqueta: 'Nota',
        tipo: 'text',
      },
      {
        nombre: 'credito',
        etiqueta: 'Crédito',
        tipo: 'text',
      }
    ],
  },
  {
    nombre: 'Otros votos',
    campos: [
      {
        nombre: 'titulo',
        etiqueta: 'Titulo del voto',
        subElementos: ['Otros votos'],
        tipo: 'text'
      },
      {
        nombre: 'tituloVoto',
        etiqueta: 'Título voto',
        tipo: 'text',
      },
      {
        nombre: 'nombre',
        etiqueta: 'Nombre del aspirante',
        tipo: 'text',
      },
      {
        nombre: 'tipoDocumento',
        etiqueta: 'Tipo de documento',
        subElementos: ['CC', 'TI', 'NIT', 'PASAPORTE', 'CE'],
        tipo: 'text',
      },
      {
        nombre: 'noDocumento',
        etiqueta: 'Número de documentos (sin puntos)',
        tipo: 'text',
      },
      {
        nombre: 'programaEstudiante',
        etiqueta: 'Programa',
        tipo: 'text',
      },
      {
        nombre: 'periodo',
        etiqueta: 'Periodo',
        subElementos: ['1er periodo', '2do periodo'],
        tipo: 'text',
      },
    ],
  },
]

export default votosData;
