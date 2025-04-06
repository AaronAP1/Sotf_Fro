import { useContext } from "react";
import SerieContext from "../Context/Serie/SerieContext";

const useSerie = () => useContext(SerieContext);

export default useSerie;