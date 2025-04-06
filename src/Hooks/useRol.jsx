import { useContext } from "react";
import RolContext from "../Context/Roles/RolContext";

const useRoles = () => useContext(RolContext);

export default useRoles;