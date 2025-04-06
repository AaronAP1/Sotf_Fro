/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  createCliente,
  deleteCliente,
  listCliente,
  updatedCliente,
} from "../../services/ClientesService";
import { createContacto } from "../../services/ContactosService";
import { createCuentaBancariaPersona } from "../../services/CuentaBancariaPersonaService";
import ClienteContext from "./ClienteContext";
import { createTarifa } from "../../services/TarifaService";
import { Bounce, toast } from "react-toastify";
import { createSubCliente } from "../../services/SubClientesService";
import { CreateDireccionCliente } from "../../services/DirecionClienteService";

const ClienteProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCliente = async () => {
    setLoading(true);

    try {
      const response = await listCliente();

      if (!response || response.error) {
        throw new Error(
          response?.message || "Error desconocido al obtener clientes",
        );
      }

      setClients(response.result || []);
    } catch (error) {
      setError(error.message || "Error inesperado al obtener clientes");
      console.error("Error al obtener los clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarNuevoCliente = async (
    nuevoCliente,
    contactos,
    cuentasBancarias,
    Tarifas,
    subClientes,
    direcciones,
  ) => {
    try {
      let cliente = { ...nuevoCliente };

      // Verifica si id_ubigeo existe antes de acceder a id
      cliente.id_ubigeo = nuevoCliente.id_ubigeo?.id || null;

      // Intenta crear el cliente
      const response = await createCliente(cliente);

      if (!response || !response.result) {
        return false;
      }

      const clienteCreado = response.result;

      //! Si hay Contactos

      if (contactos && contactos.length > 0) {
        let nuevosContactos = contactos.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, ...rest }) => ({
            ...rest,
            id_cliente: clienteCreado.id,
          }),
        );

        try {
          const contactoResponse = await createContacto(nuevosContactos);
        } catch (error) {
          toast.error(`Ocurrio un error al crear los contactos ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
      //! Si hay cuentas bancarias
      if (cuentasBancarias && cuentasBancarias.length > 0) {
        let nuevascuentasBancarias = cuentasBancarias.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, ...rest }) => ({
            ...rest,
            id_cliente: clienteCreado.id,
          }),
        );

        try {
          
          const cuentasBancariasResponse = await createCuentaBancariaPersona(
            nuevascuentasBancarias,
          );
        } catch (error) {
          toast.error(
            `Ocurrio un error al crear las Cuentas Bancarias ${error}`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            },
          );
        }
      }

      // ! Si hay tarifas
      if (Tarifas && Tarifas.length > 0) {
        let nuevasTarifas = Tarifas.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, ...rest }) => ({
            ...rest,
            id_cliente: clienteCreado.id,
          }),
        );

        try {
          const TarifasResponse = await createTarifa(nuevasTarifas);
        } catch (error) {
          toast.error(`Ocurrio un error al crear las Tarifas ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }

      // ! Si hay subclientes
      if (subClientes && subClientes.length > 0) {
        let nuevosSubClientes = subClientes.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, ...rest }) => ({
            ...rest,
            id_cliente: nuevoCliente.id,
          }),
        );

        try {
          const subClientesResponse = await createSubCliente(nuevosSubClientes);
        } catch (error) {
          toast.error(`Ocurrio un error al crear los subclientes ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }

      // !si hay direcciones
      if (direcciones && direcciones.length > 0) {
        let nuevasDirecciones = direcciones.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, id_ubigeo, ...rest }) => ({
            ...rest,
            id_ubigeo: id_ubigeo.id,
            id_cliente: nuevoCliente.id,
          }),
        );

        try {
          const DireccionesResponse =
            await CreateDireccionCliente(nuevasDirecciones);
        } catch (error) {
          toast.error(`Ocurrio un error al crear las direcciones ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }

      setClients((prevClientes) => [...prevClientes, clienteCreado]);

      return clienteCreado.id ? true : false;
    } catch (error) {
      console.error("Error al crear el nuevo cliente:", error);
      setError(error);
      return false;
    }
  };

  const editarCliente = async (id, clienteActualizado) => {
    try {
      clienteActualizado.full_data = `${clienteActualizado.banco} -
             ${clienteActualizado.tipo} - ${clienteActualizado.tipo_moneda}
             - ${clienteActualizado.numero} - ${clienteActualizado.numero}
             - ${clienteActualizado.fl_publico} - ${clienteActualizado.fl_detraccion}`;
      console.log("Datos que se envían a la API:", clienteActualizado);

      const response = await updatedCliente(id, clienteActualizado);

      if (response.mensaje === "Cliente actualizado correctamente") {
        setClients((prevCliente) =>
          prevCliente.map((cliente) =>
            cliente.id === id ? { ...cliente, ...clienteActualizado } : cliente,
          ),
        );
      } else {
        console.error("Error al editar cliente:", response.mensaje);
      }
    } catch (error) {
      console.error("Error al editar cliente:", error);
      setError(error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      const resultado = await deleteCliente(id);
      if (resultado) {
        setClients((prevCliente) =>
          prevCliente.filter((cliente) => cliente.id !== id),
        );
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      setError(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clients,
        loading,
        error,
        fetchCliente,
        agregarNuevoCliente,
        editarCliente,
        eliminarCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;
