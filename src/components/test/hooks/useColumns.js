import { useMemo } from 'react'

export default function useColumns(){
    const colums = useMemo(
        () => [
            {
                Header: "No referencia",
                accessor: "noref"
            },
            {
                Header: "Fecha",
                accessor: "fecha"
            },
            {
                Header: "Participantes principales",
                accessor: "participantesprincipales"
            },
            {
                Header: "Lugar",
                accessor: "lugar"
            },
            {
                Header: "Modalidad",
                accessor: "modalidad"
            },
            {
                Header: "Pdf adj.",
                accessor: "pdfadj"
            },
            {
                Header: "Estado",
                accessor: "estado"
            }
        ]
    )
}