import { useContext } from "react";
import EmpresaContext from "../Context/Empresa/EmpresaContext";

const useEmpresa = () => useContext(EmpresaContext)

export default useEmpresa;