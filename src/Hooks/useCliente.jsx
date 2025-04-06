import { useContext } from "react";
import ClienteContext from "../Context/Cliente/ClienteContext";

const useCliente = () => useContext(ClienteContext)

export default useCliente;