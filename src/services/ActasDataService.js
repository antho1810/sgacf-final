import http from "../http-common.js";
import axios from "axios";


export const getAndDownloadOneByRef = async (ref) => {
  const token = localStorage.getItem("token");
  return axios({
    url: `https://api-z5zl.onrender.com/sgacfi-api/actas/descargar/referencia/${ref}`,
    method: "GET",
    responseType: "blob",
    headers: {
      "Content-Disposition": "attachment; filename=archivo.pdf",
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.headers);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error(error);
    });
};

// GET ALL ACTAS
export const getAllActas = () => {
  return http.get("/actas");
};

// GET ACTA
export const getActa = (ref) => {
  return http.get(`/actas/referencia/${ref}`);
};

// CREATE ACTA
export const createActa = (data) => {
  return http.post("/actas", data);
};

export const updateActa = (ref, data) => {
  return http.put(`/actas/referencia/${ref}`, data);
};

export const updateStatusActa = (ref, data) => {
  return http.put(`/actas/autorizacion/referencia/${ref}`, data);
};

export const deleteActa = (id) => {
  return http.delete(`/actas/id/${id}`);
};

const ActaService = {
  getAllActas,
  getActa,
  createActa,
  updateActa,
  updateStatusActa,
  deleteActa,
};

export default ActaService;
