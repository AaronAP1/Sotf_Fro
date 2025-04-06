import api from "../Api/AxiosConfig";

const obetenerInformacionDashboard = async () => {
  try {
    const { data, status } = await api.get(`api/dashboard/`);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error("Error al obtener la información del dashboard:", error);
    throw error;
  }
};

export { obetenerInformacionDashboard };