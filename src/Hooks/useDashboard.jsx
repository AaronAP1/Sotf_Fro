import { useContext } from "react";
import DashboardContext from "../Context/Dashboard/DashboardContext";

const useDashboard = () => useContext(DashboardContext);

export default useDashboard;
