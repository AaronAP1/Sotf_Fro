import api from "../Api/AxiosConfig";

const listcontactos = async (idCliente) => {
  try {
    const response = await api.get(`api/contacto/${idCliente}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar los contactos:", error);
    console.error(
      "Error  al listar los contactos:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al listar contactos",
    };
  }
};

const createContacto = async (nuevocontacto) => {
  try {
    const response = await api.post(`api/contacto/`, nuevocontacto);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear el nuevo contacto:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message || "Error desconocido al crear contacto",
    };
  }
};

const updatedContacto = async (id, contactoActualizado) => {
  try {
    const response = await api.put(`api/contacto/${id}/`, contactoActualizado);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar el contacto:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar contacto",
    };
  }
};

const deleteContacto = async (id) => {
  try {
    const response = await api.delete(`api/contacto/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar el contacto:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar contacto",
    };
  }
};

export { listcontactos, createContacto, updatedContacto, deleteContacto };
