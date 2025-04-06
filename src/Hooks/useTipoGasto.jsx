import { useContext } from "react";
import tipoGastoContext from "../Context/TipoGasto/TipoGastoContext";

const useTipoGasto = () => useContext(tipoGastoContext);

export default useTipoGasto;