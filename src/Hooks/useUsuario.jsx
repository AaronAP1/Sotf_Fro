import { useContext } from "react";
import UsuarioContext from "../Context/Usuario/UsuarioContext";

const useUsuario = () => useContext(UsuarioContext);

export default useUsuario;