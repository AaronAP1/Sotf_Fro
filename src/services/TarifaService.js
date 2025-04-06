import api from "../Api/AxiosConfig";

const listTarifas = async () => {
  try {
    const response = await api.get(`api/tarifa/`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar las tarifas:", error);
    console.error(
      "Error al listar las tarifas:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message || "Error desconocido al listar tarifas",
    };
  }
};

export const createTarifa = async (tarifa) => {
  try {
    const response = await api.post(`api/tarifa/`, tarifa);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear la nueva tarifa:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message || "Error desconocido al crear tarifa",
    };
  }
};

const updateTarifa = async (id, tarifa) => {
  try {
    const response = await api.put(`api/tarifa/${id}/`, tarifa);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar la tarifa:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar tarifa",
    };
  }
};

const deleteTarifa = async (id) => {
  try {
    const response = await api.delete(`api/tarifa/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar la tarifa:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar tarifa",
    };
  }
};

export default {
  listTarifas,
  updateTarifa,
  deleteTarifa,
};
