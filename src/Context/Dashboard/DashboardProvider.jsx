import { useEffect, useState } from "react";
import DashboardContext from "./DashboardContext";
import { obetenerInformacionDashboard } from "../../services/DashboardService";
const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ObtenerInformacionPanel = async () => {
    try {
      const response = await obetenerInformacionDashboard();
      setDashboard(response.result);
    } catch (error) {
      setError(error);
      console.error("Error al obtener la información del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <DashboardContext.Provider value={{ dashboard,ObtenerInformacionPanel, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
