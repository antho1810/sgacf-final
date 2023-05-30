import React, {useState} from "react";
import votosData from "../actas/createActa/votosData";
import Form from "react-bootstrap/Form"

function Test2() {

  const [seleccion, setSeleccion] = useState("");
  const [campos, setCampos] = useState([]);

  const handleChangeSelect = (e) => {
    const selectedOpt = e.target.value;
    setSeleccion(selectedOpt);

    // GET DATA FROM VOTOSDATA.JS

    const camposObtenidos = obtenerCampos(selectedOpt)
    setVotos(camposObtenidos)
  }

  const obtenerCampos = (opcion) => {
    
    const camposPorVoto = 

  }

  return (
    <div className="container">
      <div className="mt-3">
        <Form.Label>Voto</Form.Label>
            <Form.Select id="seleccion" value={seleccion} onChange={handleChangeSelect}>
              <option value="">--Seleccione--</option>
              {votosData.map((voto) => {
                return voto.elementos.map((elemento) => {
                  console.log(elemento.tipo);
                  return <option value={elemento.tipo}>{elemento.tipo}</option>;
                });
              })}
            </Form.Select>

            <Form.Group>
              <h4>Información del voto: </h4>
              {votos.map((especificacion, index) => (
                <input type="text" key={index} placeholder={especificacion} />
              ))}
            </Form.Group>
      </div>
    </div>
  );
}

export default Test2;
