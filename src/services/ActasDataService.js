import http from '../http-common.js'
import axios from 'axios'

// GET ALL ACTAS
export const getAllActas = () => {
    return http.get("/actas")
}

// Get Acta
export const getActa = (id) => {
    return http.get(`/actas/id/${id}`)
}

// Create Acta
export const createActa = (data) => {
    return http.post(
        "http://sgacfi-back-mern.up.railway.app/sgacfi-api/actas",
        data
    );
}

export const updateActa = (id, data) => {
    return http.put(`/actas/id/${id}`, data)
}

export const deleteActa = (id) => {
    return http.delete(`/actas//id/${id}`) // Actas/id/:id
}


const ActaService = {
    getAllActas,
    getActa,
    createActa,
    updateActa,
    deleteActa,
};

export default ActaService;