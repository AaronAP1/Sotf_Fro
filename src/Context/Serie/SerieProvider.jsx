import { useState,useEffect } from "react";
import SerieContext from "./SerieContext";
import { listSeries, createSerie, updatedSerie, deleteSerie } from "../../services/SeriesService";

const SerieProvider = ({children}) => {
    const [series, setSeries] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSeries = async () => {
        try {
            const response = await listSeries();
            setSeries(response.data);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const agregarNuevaSerie = async (nuevaSerie) => {
        try {
            console.log("Datos enviados a la API:", nuevaSerie);
            const response = await createSerie(nuevaSerie);
            const serieCreada = response.data;
            setSeries((prevSeries) => [...prevSeries, serieCreada]);
        } catch (error) {
            console.error("Error al crear la nueva serie:", error);
            setError(error.message || 'Error desconocido');  // Solo guarda el mensaje del error
        }
    };
    

    const editarSerie = async (id, serieActualizada) => {
        try {
            const response = await updatedSerie(id, serieActualizada);
            const serieEditada = response.data;

            if (response.mensaje === 'Serie actualizada correctamente') {
                setSeries((prevSeries) =>
                    prevSeries.map((serie) =>
                        serie.id === id ? { ...serie, ...serieEditada } : serie
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar la serie:", error);
            setError(error);
        }
    };

    const eliminarSerie = async (id) => {
        try {
            const resultado = await deleteSerie(id);
            if (resultado) {
                setSeries((prevSeries) =>
                    prevSeries.filter((serie) => serie.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar la serie:", error);
            setError(error);
        }
    };


    return (
        <SerieContext.Provider value={{series, loading, error,fetchSeries, agregarNuevaSerie, editarSerie, eliminarSerie }}>
            {children}
        </SerieContext.Provider>
    )
};

export default SerieProvider;