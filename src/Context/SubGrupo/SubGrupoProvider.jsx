import { useEffect, useState } from 'react';
import { createSubGroup, deleteSubgrupo, listSubgroup, updatedSubgrupo } from '../../services/SubGrupoService';
import SubGrupoContext from './SubGrupoContext';


const SubGrupoProvider = ({ children }) => {
    const [subGroups, setSubGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubGroups = async () => {
        try {
            const response = await listSubgroup();
            setSubGroups(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener datos", error);
        } finally {
            setLoading(false);
        }
    }

    const agregarNuevoSubgrupo = async (nuevoSubgrupo) => {
        try {
            const response = await createSubGroup(nuevoSubgrupo);
            const subGrupoCreado = response.result;
            setSubGroups((prevSubgrupo) => [...prevSubgrupo, subGrupoCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo documento:", error)
            setError(error);
        }
    }

    const editarSubgrupo = async (id, subgrupoActualizado) => {
        try {
            subgrupoActualizado.full_data = `${subgrupoActualizado.tipo}`;
            console.log('Datos que se envían a la API:', subgrupoActualizado);
            
            const response = await updatedSubgrupo(id, subgrupoActualizado);
            const subgrupoEditado = response.result;

            if (response.mensaje === 'SubGrupo actualizado correctamente') {
                setSubGroups((prevSubgrupo) =>
                    prevSubgrupo.map((sub) =>
                        sub.id === id ? { ...sub, ...subgrupoEditado } : sub
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar el subgrupo:", error);
            setError(error);
        }
    }

    const eliminarSubgrupo = async (id) => {
        try {
            const resultado = await deleteSubgrupo(id);
            if (resultado) {
                setSubGroups((prevSubgrupos) =>
                    prevSubgrupos.filter((sub) => sub.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar el subgrupo:", error);
            setError(error);
        }
    }


    return (
        <SubGrupoContext.Provider value={{ subGroups, loading, error,fetchSubGroups, agregarNuevoSubgrupo, editarSubgrupo, eliminarSubgrupo }}>
            {children}
        </SubGrupoContext.Provider>
    )
}

export default SubGrupoProvider