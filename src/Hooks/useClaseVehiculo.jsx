import { useContext } from "react";
import ClaseVehiculoContext from "../Context/ClaseVehiculo/ClaseVehiculoContext";

const useClaseVehiculo = () => useContext(ClaseVehiculoContext)

export default useClaseVehiculo