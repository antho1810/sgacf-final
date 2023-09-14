import http from "../http-common.js";

// SERVICES FOR PARTICIPANTES
export const getAllParticipantes = () => {
  return http.get("/participantes");
};

export const getParticipante = (id) => {
  return http.get(`/participantes/id/${id}`);
};

export const createParticipante = (data) => {
  return http.post("/participantes", data);
};

export const updateParticipante = (id, data) => {
  return http.put(`/participantes/id/${id}`, data);
};

export const deleteParticipante = (id) => {
  return http.delete(`/participantes/id/${id}`);
};

const findByName = (nombre) => {
  return http.get(`/participantes?nombre=${nombre}`);
};

const ParticipantesService = {
  getAllParticipantes,
  getParticipante,
  createParticipante,
  updateParticipante,
  deleteParticipante,
  findByName,
};

export default ParticipantesService;
