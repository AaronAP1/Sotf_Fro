import { useContext } from "react";
import CuentaBancariaEmpresaContext from "../Context/CuentaBancaria/CuentaBancariaEmpresaContext";

const useCuentaBancariaEmpresa = () => useContext(CuentaBancariaEmpresaContext)

export default useCuentaBancariaEmpresa;