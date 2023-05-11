import http from "../http-common.js"
import axios from "axios"

// Get All Actas
export const getAllActas = () => {
  return http.get("/actas")
}

// Get Acta
export const getActa = (id) => { 
  return http.get(`/actas/id/${id}`)
}

// Create Acta
export const createActa = (data) => { 
  return http.post("/actas", data)
}

// Update Acta
export const updateActa = (id, data) => {
  return http.put(`/actas/id/${id}`, data)
}
 
// Delete Acta
export const deleteActa = (id) => { 
  return http.delete(`/actas/id/${id}`)
}

const findByRef = (ref) => {
  return http.get(`/actas/ref/${ref}`)
}

const findByArticulo = (articulo) => {
  return http.get(`/actas?articulo=${articulo}`)
}

const findByParticipantes = (partc) => {
  return http.get(`/actas?participantes=${partc}`)
}

const findByFecha = (fecha) => { }

const ActaService = {
  getAllActas,
  getActa,
  createActa,
  updateActa,
  deleteActa,
  findByRef,
  findByArticulo,
  findByParticipantes,
  findByFecha
}

export default ActaService
