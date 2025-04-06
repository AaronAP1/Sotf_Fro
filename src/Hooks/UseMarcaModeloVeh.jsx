import { useContext } from "react";
import MarcaModeloContext from "../Context/MarcaModeloVeh/MarcaModeloContext";

const useMarcaModelos = () => useContext(MarcaModeloContext)

export default useMarcaModelos;