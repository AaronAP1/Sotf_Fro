import api from "../Api/AxiosConfig";

const listSubClientes = async (id) => {
  try {
    const response = await api.get(`api/sub-cliente/${id}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar los subclientes:", error);
    console.error(
      "Error  al listar los subclientes:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al listar subclientes",
    };
  }
};

export const createSubCliente = async (subCliente) => {
  try {
    const response = await api.post(`api/sub-cliente/`, subCliente);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear el nuevo subcliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al crear subcliente",
    };
  }
};

const updatesubCliente = async (id, subCliente) => {
  try {
    const response = await api.put(`api/sub-cliente/${id}/`, subCliente);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar el subcliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar subcliente",
    };
  }
};

const deleteSubCliente = async (id) => {
  try {
    const response = await api.delete(`api/sub-cliente/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar el subcliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar subcliente",
    };
  }
}
export default {
  listSubClientes,
  updatesubCliente,
  deleteSubCliente
};
