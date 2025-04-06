import { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import useUsuarios from "../../../Hooks/useUsuario"; // Asume que tienes un hook para manejar usuarios

function ModalNewUsuario({
  isOpen,
  onClose,
  usuarioExistente = null,
  esEdicion = false,
}) {
  const { AgregarNuevoUsuario, EditarUsuario } = useUsuarios();

  // Estado para el tipo de persona
  const [tipo_persona, setTipo_persona] = useState("");

  // Estados para los campos de cada tipo de persona
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  // Efecto para cargar datos en modo edición
  useEffect(() => {
    if (esEdicion && usuarioExistente) {
      setTipo_persona(usuarioExistente.tipo_persona || "");

      // Cargar los datos según el tipo de persona

      if (usuarioExistente.tipo_persona === "Usuario estándar") {
        setNombre(usuarioExistente.nombre || "");
        setApellido(usuarioExistente.apellido || "");
        setEmail(usuarioExistente.email || "");
        setUsuario(usuarioExistente.usuario || "");
        setPassword(usuarioExistente.password || "");
      } else if (usuarioExistente.tipo_persona === "Personal") {

        setEmail(usuarioExistente.email || "");
        setUsuario(usuarioExistente.usuario || "");
        setPassword(usuarioExistente.password || "");
      } else if (usuarioExistente.tipo_persona === "Cliente") {

        setEmail(usuarioExistente.email || "");
        setUsuario(usuarioExistente.usuario || "");
        setPassword(usuarioExistente.password || "");
      }
    } else {
      // Limpiar los estados si no estamos en modo edición
      setTipo_persona("");
      setNombre("");
      setApellido("");
      setEmail("");
      setUsuario("");
      setPassword("");

    }
  }, [esEdicion, usuarioExistente]);

  // Función para cerrar el modal y limpiar los estados
  const handleClose = () => {
    setTipo_persona("");
    setNombre("");
    setApellido("");
    setEmail("");
    setUsuario("");
    setPassword("");

    onClose();
  };

  // Validar si los campos obligatorios están completos
  const isDatosEstandar = nombre && apellido && email && usuario && password;

  const isDatosPersonal =  email && usuario && password;

  const isDatosClient = email && usuario && password;

  // Manejar el cambio de tipo de persona
  const handleTipoPersonaChange = (event) => {
    const nuevoTipoPersona = event.target.value;

    // Solo limpiar los campos específicos si el tipo de persona ha cambiado
    if (nuevoTipoPersona !== tipo_persona) {
      setTipo_persona(nuevoTipoPersona);

      // Limpiar solo los campos que no son comunes entre los tipos de persona
      if (tipo_persona === "Usuario estándar") {
        setNombre("");
        setApellido("");
      } else if (tipo_persona === "Personal") {
        // Limpiar campos específicos de "Personal" (si los hay)
      } else if (tipo_persona === "Cliente") {
        // Limpiar campos específicos de "Cliente" (si los hay)
      }
    } else {
      setTipo_persona(nuevoTipoPersona);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios según el tipo de persona
    if (!tipo_persona) {
      alert("Debe escoger un tipo de persona, es obligatorio");
      return;
    }
    if (tipo_persona === "Usuario estándar" && !isDatosEstandar) {
      alert('Los campos con (*) de "Usuario estándar" son obligatorios');
      return;
    }
    if (tipo_persona === "Personal" && !isDatosPersonal) {
      alert('Los campos con (*) de "Personal" son obligatorios');
      return;
    }
    if (tipo_persona === "Cliente" && !isDatosClient) {
      alert('Los campos con (*) de "Cliente" son obligatorios');
      return;
    }

    // Crear el objeto con los datos del usuario
    const nuevoUsuario = {
      tipo_persona,
      ...(tipo_persona === "Usuario estándar" && {
        nombre,
        apellido,
        email,
        usuario,
        password,
      }),
      ...(tipo_persona === "Personal" && {
    
        email,
        usuario,
        password,
      }),
      ...(tipo_persona === "Cliente" && {
   
        email,
        usuario,
        password,
      }),
    };

    try {
      // Si estamos en modo edición, llamar a la función de editar
      if (esEdicion) {
        await EditarUsuario(usuarioExistente.id, nuevoUsuario);
      } else {
        // Si no, llamar a la función de agregar
        await AgregarNuevoUsuario(nuevoUsuario);
      }

      // Limpiar el formulario y cerrar el modal
      handleClose();
    } catch (error) {
      console.error("Error completo:", error);
      let serverMessage = "Error al guardar el usuario";

      if (error.response) {
        serverMessage =
          error.response.data?.message || "Error en la respuesta del servidor";
      } else if (error.request) {
        serverMessage = "No se recibió respuesta del servidor";
      } else {
        serverMessage = error.message || "Error desconocido";
      }

      alert(`Error: ${serverMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg p-6 lg:min-w-md md:min-w-sm min-w-xs  max-h-[90vh] shadow-lg ${
          tipo_persona === ""
            ? " min-w-full md:min-w-lg"
            : "lg:min-w-xl md:max-w-lg"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4 text-[#0A9E9A]">
            {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <GoX
            className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mt-2 items-center md:items-start w-full">
            {(tipo_persona === "Usuario estándar" ||
              tipo_persona === "Personal" ||
              tipo_persona === "Cliente") && (
              <div className="flex md:flex-col gap-4 md:gap-0 items-center bg-gr md:w-2/6 -ml-1 mr-1">
                <div className="flex flex-col">
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    Sin Imagen
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="bg-[#0a9e9a] md:text-nowrap text-white px-[28.9px] lg:px-[29.3px] py-1 lg:py-0.5 text-sm flex items-center">
                      <AiOutlineUpload className="mr-1 w-4 h-4" />
                      Subir imagen
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:mt-6 lg:px-1 space-y-2">
                  {/* Checkboxes */}
                  {(tipo_persona === "Usuario estándar" ||
                    tipo_persona === "Personal") && (
                    <>
                      <div className="flex w-full">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="md:mr-2 mr-1.5 border rounded-sm text-sm text-gray-400 h-4 w-3 "
                          />
                        </div>
                        <label className="block text-xs text-gray-700">
                          Visualizar sin restricción de subgrupos
                        </label>
                      </div>
                      <div className="flex w-full">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="md:mr-2 mr-1.5 border rounded-sm text-sm text-gray-400 h-4 w-3 "
                          />
                        </div>
                        <label className="block text-xs text-gray-700">
                          Autoriza gasto
                        </label>
                      </div>
                      <div className="flex w-full">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="md:mr-2 mr-1.5 border rounded-sm text-sm text-gray-400 h-4 w-3 "
                          />
                        </div>
                        <label className="block text-xs text-gray-700">
                          Iniciar y Finalizar Viaje
                        </label>
                      </div>
                      <div className="flex w-full">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="md:mr-2 mr-1.5 border rounded-sm text-sm text-gray-400 h-4 w-3 "
                          />
                        </div>
                        <label className="block text-xs text-gray-700">
                          Entregar Documento
                        </label>
                      </div>
                      <div className="flex w-full ">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="md:mr-2 mr-1.5  border rounded-sm text-sm text-gray-400 h-4 w-3 "
                          />
                        </div>
                        <label className="block text-xs text-gray-700">
                          Liquidar Documento
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="md:flex gap-4 mb-2 w-full">
                <div className="flex flex-col w-full mb-3 md:mb-2">
                  <label className="block text-sm font-normal text-black">
                    Tipo persona <label className="text-[#DA0000]">(*)</label>
                  </label>
                  <select
                    className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                    value={tipo_persona}
                    onChange={handleTipoPersonaChange}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Usuario estándar">Usuario estándar</option>
                    <option value="Personal">Personal</option>
                    <option value="Cliente">Cliente</option>
                  </select>
                </div>
              </div>

              {/* Inputs condicionales según el tipo de persona */}
              {(tipo_persona === "Usuario estándar" ||
                  tipo_persona === "Personal" ||
                  tipo_persona === "Cliente") && (
              <div className="overflow-y-auto md:h-72 h-36">
                <div className="gap-4 mb-2 space-y-4">
                  {tipo_persona === "Usuario estándar" && (
                    <>
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-normal text-black">
                          Nombres <label className="text-[#DA0000]">(*)</label>
                        </label>
                        <input
                          type="text"
                          className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                          placeholder="Ingrese nombres"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-normal text-black">
                          Apellidos{" "}
                          <label className="text-[#DA0000]">(*)</label>
                        </label>
                        <input
                          type="text"
                          className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                          placeholder="Ingrese apellidos"
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {tipo_persona === "Personal" && (
                    <div className="flex flex-col w-full">
                      <label className="block text-sm font-normal text-black">
                        Personal <label className="text-[#DA0000]">(*)</label>
                      </label>
                      <select
                        className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600"
                       
                      >
                        <option>Seleccionar</option>
                        <option>q</option>
                        <option>e...</option>
                      </select>
                    </div>
                  )}
                  {tipo_persona === "Cliente" && (
                    <div className="flex flex-col w-full">
                      <label className="block text-sm font-normal text-black">
                        Cliente <label className="text-[#DA0000]">(*)</label>
                      </label>
                      <select
                        className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600"
                      >
                        <option>Seleccionar</option>
                        <option>Snar</option>
                        <option>Selar</option>
                      </select>
                    </div>
                  )}
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-normal text-black">
                      Correo Electrónico{" "}
                      <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                
                </div>
                <div className="md:flex gap-4 mt-3 mb-3">
                  <div className="flex flex-col w-full mb-3 md:mb-0">
                    <label className="block text-sm font-normal text-black">
                      Usuario <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese usuario"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-normal text-black">
                      Contraseña <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {(tipo_persona === "Usuario estándar" ||
                  tipo_persona === "Personal") && (
                  <div className="md:col-span-2 mb-3">
                    <label className="block text-sm font-normal text-black">
                      Rol y permisos
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                      <option>Seleccionar</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                )}
                <div className="lg:flex gap-4 mt-3 mb-2 ">
                  {(tipo_persona === "Usuario estándar" ||
                    tipo_persona === "Personal") && (
                    <div className="flex flex-col w-full mb-3 lg:mb-0">
                      <label className="block text-sm font-normal text-black">
                        Local Anexo
                      </label>
                      <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                        <option>Seleccionar</option>
                        <option>q</option>
                        <option>e...</option>
                      </select>
                    </div>
                  )}
                   {(tipo_persona === "Usuario estándar" ||
                  tipo_persona === "Personal" ||
                  tipo_persona === "Cliente") && (
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-normal text-black">
                      Serie Guia Transportista
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese serie de guía"
                    />
                  </div>
                    )}
                </div>
              </div>
                )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 md:mt-7 mt-3 mb-1">
            <button
              type="submit"
              className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
            >
              <BiSave className="w-5 h-5 mr-1" />
              {esEdicion ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalNewUsuario;
