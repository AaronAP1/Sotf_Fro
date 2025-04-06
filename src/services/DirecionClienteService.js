import api from "../Api/AxiosConfig";

const ListDireccionCliente = async (id) => {
  try {
    const response = await api.get(`api/direccion-cliente/${id}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar los subclientes:", error);
    console.error(
      "Error al listar los subclientes:",
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

const CreateDireccionCliente = async (direccion) => {
  try {
    const response = await api.post(`api/direccion-cliente/`, direccion);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear la nueva direccion:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al crear direccion",
    };
  }
};

const UpdateDireccionCliente = async (id, direccion) => {
  try {
    const response = await api.put(`api/direccion-cliente/${id}/`, direccion);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar la direccion:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar direccion",
    };
  }
};

const DeleteDireccionCliente = async (id) => {
  try {
    const response = await api.delete(`api/direccion-cliente/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar la direccion:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar direccion",
    };
  }
};

export {
  ListDireccionCliente,
  CreateDireccionCliente,
  UpdateDireccionCliente,
  DeleteDireccionCliente,
};
