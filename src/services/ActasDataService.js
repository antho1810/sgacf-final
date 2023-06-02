import http from '../http-common.js'
// import axios from 'axios'

// GET ALL ACTAS
export const getAllActas = () => {
    return http.get("/actas")
}

// GET ACTA
export const getActa = (id) => {
    return http.get(`/actas/id/${id}`)
}

// CREATE ACTA
export const createActa = (data) => {
    return http.post("/actas", data)
}

export const updateActa = (id, data) => {
    return http.put(`/actas/id/${id}`, data)
}
export const updateStatusActa = (id, data) => {
    return http.put(`/actas/autorize/id/${id}`, data)
}

export const deleteActa = (id) => {
    return http.delete(`/actas/id/${id}`)
}

const ActaService = {
    getAllActas,
    getActa,
    createActa,
    updateActa,
    deleteActa
};

export default ActaService;