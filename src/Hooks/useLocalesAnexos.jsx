import { useContext } from "react";
import LocalesAnexosContext from "../Context/LocalesAnexos/LocalesAnexosContext";

const useLocalesAnexos = () => useContext(LocalesAnexosContext)

export default useLocalesAnexos;