import { useContext } from "react";
import SubGrupoContext from "../Context/SubGrupo/SubGrupoContext";

const useSubGroup = () => useContext(SubGrupoContext);

export default useSubGroup;