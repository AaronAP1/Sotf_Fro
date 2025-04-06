import api from "../Api/AxiosConfig";

const listCliente = async () => {
  try {
    const response = await api.get(`api/cliente/`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar los clientes:", error);
    console.error(
      "Error  al listar los clientes:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al listar clientes",
    };
  }
};

const createCliente = async (nuevoCliente) => {
  try {
    const response = await api.post(`api/cliente/`, nuevoCliente);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear el nuevo cliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message || "Error desconocido al crear cliente",
    };
  }
};

const updatedCliente = async (id, clienteActualizado) => {
  try {
    const response = await api.put(`api/cliente/${id}/`, clienteActualizado);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar el cliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar cliente",
    };
  }
};

const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`api/cliente/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar el cliente:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar cliente",
    };
  }
};

export { listCliente, createCliente, updatedCliente, deleteCliente };
