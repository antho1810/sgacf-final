import React, { useState, useEffect, useMemo, useRef } from 'react'
import CreateActa from '../actas/createActa/CreateActa'

import ActaService from '../../services/ActasDataService'

const Test = (props) => {

  const [actas, setActas] = useState([]);
  const [searchRef, setSearchRef] = useState("");
  const actasRef = useRef()

  actasRef.current = actas;

  useEffect(() => {
    listAllActas()
  }, [])

  const onChangeSearchRef = (e) => {
    const searchRef = e.target.value;
    setSearchRef(searchRef)
  }

  const listAllActas = () => {
    ActaService.getAllActas()
      .then((response) => {
        setActas(response.data);
      })
      .catch(e => {
        console.error(e)
      });
  };

  const refreshList = () => {
    listAllActas();
  }

  const findByRef = () => {
    ActaService.findByRef(searchRef)
      .then((response) => {
        setActas(response.data)
      })
      .catch(e => {
        console.error(e)
      })
  }

  const openActa = (rowIndex) => {
    const id = actasRef.current[rowIndex].id;

    props.history.push("/actas/id/" + id)
  }

  // const deleteActa = (rowIndex) => {
  //   const id = actasRef.current[rowIndex].id;

  //   ActaService.deleteActa(id)
  //     .then((response) => {
  //       props.history.push("/actas");

  //       let 
  //     })

  // }

  return (
    <CreateActa/>
  )
}

export default Test