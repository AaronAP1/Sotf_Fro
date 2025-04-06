import { useContext } from "react";
import TipoDocumentContext from "../Context/TipoDocumento/TipoDocumentContext";

const useTipoDocumento = () => useContext(TipoDocumentContext);

export default useTipoDocumento;