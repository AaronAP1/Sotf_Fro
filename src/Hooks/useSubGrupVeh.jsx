import { useContext } from "react";
import SubGrupoVecContext from "../Context/SubGrupoVehic/SubGrupoVehContext";

const useSubGrupoVeh = () => useContext(SubGrupoVecContext);

export default useSubGrupoVeh;