import api from "../Api/AxiosConfig";


const listarCuentaBancariaPersona = async (id) => {
  try {
    const response = await api.get(`api/cuenta-bancaria-persona/${id}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al listar los cuentas bancarias:", error);
    console.error(
      "Error  al listar los cuentas bancarias:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al listar cuentas bancarias",
    };
  }
};
export const createCuentaBancariaPersona = async (nuevacuenta) => {
  try {
    const response = await api.post(
      `api/cuenta-bancaria-persona/`,
      nuevacuenta,
    );
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al crear el nuevo cuenta bancaria:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al crear cuennta bancaria",
    };
  }
};

const updateCuentaBancariaPersona = async (id, cuentaActualizada) => {
  try {
    const response = await api.put(
      `api/cuenta-bancaria-persona/${id}/`,
      cuentaActualizada,
    );
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al actualizar el cuenta bancaria:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al actualizar cuennta bancaria",
    };
  }
};

const deleteCuentaBancariaPersona = async (id) => {
  try {
    const response = await api.delete(`api/cuenta-bancaria-persona/${id}/`);
    if (response.status === 200 && response.data) {
      return true;
    } else {
      console.warn("Respuesta inesperada de la API:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error al eliminar el cuenta bancaria:",
      error?.response?.data || error.message,
    );
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        "Error desconocido al eliminar cuennta bancaria",
    };
  }
};

export default {
  listarCuentaBancariaPersona,
  updateCuentaBancariaPersona,
  deleteCuentaBancariaPersona,
};
