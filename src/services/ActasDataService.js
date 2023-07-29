import http from '../http-common.js'

// GET ALL ACTAS
export const getAllActas = () => {
    return http.get("/actas")
}

// GET ACTA
export const getActa = (ref) => {
    return http.get(`/actas/referencia/${ref}`)
}

// CREATE ACTA
export const createActa = (data) => {
    return http.post("/actas", data)
}

export const updateActa = (ref, data) => {
    return http.put(`/actas/referencia/${ref}`, data)
}

export const updateStatusActa = (ref, data) => {
    return http.put(`/actas/autorizacion/referencia/${ref}`, data)
}

export const deleteActa = (id) => {
    return http.delete(`/actas/id/${id}`)
}

const ActaService = {
    getAllActas,
    getActa,
    createActa,
    updateActa,
    updateStatusActa,
    deleteActa
};

export default ActaService;