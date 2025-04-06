import { useContext } from "react";
import PersonalContext from "../Context/Personal/PersonalContext";

const usePersonal = () => useContext(PersonalContext);

export default usePersonal;