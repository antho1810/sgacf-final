import http from '../http-common.js'
import axios from 'axios'

// GET ALL ACTAS
export const getAllActas = () => {
    return http.get("/actas")
}

// GET ACTA
export const getActa = (id) => {
    return http.get(`/actas/${id}`)
}

// CREATE ACTA
export const createActa = (data) => {
    return axios.post("http://localhost:4000/sgacfi-api/actas", data)
}

export const updateActa = (id, data) => {
    return http.put(`/actas/id/${id}`, data)
}

export const deleteActa = (id) => {
    return http.delete(`/actas/${id}`)
}

const findByRef = (ref) => {
    return http.get(`/actas?ref=${ref}`)
}

const findByArticulo = (articulo) => {
    return http.get(`/actas?articulo=${articulo}`)
}

const findByParticipantes = (partc) => {
    return http.get(`/actas?participantes=${partc}`)
}

const ActaService = {
    getAllActas,
    getActa,
    createActa,
    updateActa,
    deleteActa,
    findByRef,
    findByArticulo,
    findByParticipantes
};

export default ActaService;