import { useState, useEffect } from "react";
import TipoDocumentContext from "./TipoDocumentContext";
import { listTipoDocument, createTipoDocument, updateTipoDocument, deleteTipoDocument } from "../../services/TipoDocumentServices";

const TipoDocumentProvider = ({ children }) => {
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTipoDocumentos = async () => {
        try {
            const response = await listTipoDocument();
            setTipoDocumentos(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarNuevoDocumento = async (nuevoDocumento) => {
        try {
            const response = await createTipoDocument(nuevoDocumento);
            const documentoCreado = response.result;
            setTipoDocumentos((prevDocumentos) => [...prevDocumentos, documentoCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo documento:", error);
            setError(error);
        }
    };

    const editarDocumento = async (id, documentoActualizado) => {
        try {
            console.log("ID:", id);
            const response = await updateTipoDocument(id, documentoActualizado);
            const documentoEditado = response.result;
            if (documentoEditado) {
                setTipoDocumentos((prevDocumentos) =>
                    prevDocumentos.map((doc) =>
                        doc.id === id ? { ...doc, ...documentoEditado } : doc
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar el documento:", error);
            setError(error);
        }
    };

    const eliminarDocumento = async (id) => {
        try {
            const resultado = await deleteTipoDocument(id);
            if (resultado) {
                // Elimina el documento localmente sin necesidad de hacer una nueva petición a la API
                setTipoDocumentos((prevDocumentos) =>
                    prevDocumentos.filter((doc) => doc.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar el documento:", error);
            setError(error);
        }
    };
    


    return (
        <TipoDocumentContext.Provider value={{ tipoDocumentos, loading, error,fetchTipoDocumentos, agregarNuevoDocumento, editarDocumento, eliminarDocumento }}>
            {children}
        </TipoDocumentContext.Provider>
    );
};

export default TipoDocumentProvider;
