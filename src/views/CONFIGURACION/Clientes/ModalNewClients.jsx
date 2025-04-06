import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { toast, Bounce } from "react-toastify";
import useCliente from "../../../Hooks/useCliente";
import Contacto from "./tabs/Contacto";
import CuentasBancarias from "./tabs/CuentasBancarias";
import DatosPeronales from "./tabs/DatosPeronales";
import Direcciones from "./tabs/Direcciones";
import SubcCliente from "./tabs/SubcCliente";
import Tarifa from "./tabs/Tarifa";

function ModalNewClients({ isOpen, onClose }) {
  const { agregarNuevoCliente } = useCliente();
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState("Datos Personales");
  //Datos
  const [dtTab1, setDtTab1] = useState({
    documento: 0,
    numero_documento: "",
    razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
    id_ubigeo: "",
  });
  const [dtTab2, setDtTab2] = useState([]);
  const [dtTab3, setDtTab3] = useState([]);
  const [dtTab4, setDtTab4] = useState([]);
  const [dtTab5, setDtTab5] = useState([]);
  const [dtTab6, setDtTab6] = useState([]);

  // Agregar Funciones
  const addTab2 = (e) => {
    e.preventDefault();
    setDtTab2([
      ...dtTab2,
      {
        id: Date.now(),
        nombre: null,
        telefono: null,
        email: null,
        otros: null,
      },
    ]);
  };
  const addTab3 = (e) => {
    e.preventDefault();
    setDtTab3([
      ...dtTab3,
      {
        id: Date.now(),
        banco: null,
        tipo: null,
        numero: null,
        fl_detraccion: false,
        estado: false,
      },
    ]);
  };

  const addTab4 = (e) => {
    e.preventDefault();
    setDtTab4([
      ...dtTab4,
      {
        id: Date.now(),
        id_ruta: 0,
        tipo_servicio: null,
        id_vehiculo: 0,
        tipo_medida: null,
        costo: null,
      },
    ]);
  };

  const addTab5 = (e) => {
    e.preventDefault();
    setDtTab5([
      ...dtTab5,
      {
        id: Date.now(),
        documento: null,
        numero_documento: null,
        razon_social: null,
        direccion: null,
        email: null,
      },
    ]);
  };

  const addTab6 = (e) => {
    console.log(dtTab6);
    e.preventDefault();
    setDtTab6([
      ...dtTab6,
      {
        id: Date.now(),
        id_ubigeo: "",
        direccion: null,
      },
    ]);
  };
  //Eliminar Funciones
  const deleteTab2Item = (id) => {
    const newFields = dtTab2.filter((field) => field.id !== id);
    setDtTab2(newFields);
  };
  const deleteTab3Item = (id) => {
    const newFields = dtTab3.filter((field) => field.id !== id);
    setDtTab3(newFields);
  };
  const deleteTab4Item = (id) => {
    const newFields = dtTab4.filter((field) => field.id !== id);
    setDtTab4(newFields);
  };
  const deleteTab5Item = (id) => {
    const newFields = dtTab5.filter((field) => field.id !== id);
    setDtTab5(newFields);
  };
  const deleteTab6Item = (id) => {
    const newFields = dtTab5.filter((field) => field.id !== id);
    setDtTab6(newFields);
  };

  //Cambiar Tab
  const handleTabChange = (e) => {
    e.preventDefault();
    // if (
    //   dtTab1.documento !== 0 &&
    //   dtTab1.numero_documento !== "" &&
    //   dtTab1.razon_social !== "" &&
    //   dtTab1.direccion !== "" &&
    //   dtTab1.telefono !== ""
    // ) {
    const tab = e.target.value;
    setActiveTab(tab);
    // }
  };

  // Validación del botón

  const tabs = [
    "Datos Personales",
    "Contactos",
    "Cuentas Bancarias",
    "Tarifas",
    "Subclientes",
    "Direcciones",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Datos Personales":
        return (
          <DatosPeronales
            dtTab1={dtTab1}
            setDtTab1={setDtTab1}
            handleTabChange={handleTabChange}
          />
        );
      case "Contactos":
        return (
          <>
            <Contacto
              dtTab2={dtTab2}
              setDtTab2={setDtTab2}
              addTab2={addTab2}
              deleteTab2Item={deleteTab2Item}
              handleTabChange={handleTabChange}
            />
          </>
        );
      case "Cuentas Bancarias":
        return (
          <CuentasBancarias
            dtTab3={dtTab3}
            setDtTab3={setDtTab3}
            addTab3={addTab3}
            deleteTab3Item={deleteTab3Item}
            handleTabChange={handleTabChange}
          />
        );
      case "Tarifas":
        return (
          <Tarifa
            dtTab4={dtTab4}
            setDtTab4={setDtTab4}
            addTab4={addTab4}
            deleteTab4Item={deleteTab4Item}
            handleTabChange={handleTabChange}
          />
        );
      case "Subclientes":
        return (
          <SubcCliente
            dtTab5={dtTab5}
            setDtTab5={setDtTab5}
            addTab5={addTab5}
            deleteTab5Item={deleteTab5Item}
            handleTabChange={handleTabChange}
          />
        );
      case "Direcciones":
        return (
          <Direcciones
            dtTab6={dtTab6}
            setDtTab6={setDtTab6}
            addTab6={addTab6}
            deleteTab6Item={deleteTab6Item}
            handleTabChange={handleTabChange}
          />
        );
      default:
        return (
          <DatosPeronales
            dtTab1={dtTab1}
            setDtTab1={setDtTab1}
            handleTabChange={handleTabChange}
          />
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Asegúrate de evitar la recarga de la página

    if (
      dtTab1.documento === 0 ||
      dtTab1.numero_documento === "" ||
      dtTab1.razon_social === "" ||
      dtTab1.direccion === "" ||
      dtTab1.telefono === ""
    ) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const loadingToast = toast.loading("Creando cliente...");

    try {
      const result = await agregarNuevoCliente(
        dtTab1,
        dtTab2,
        dtTab3,
        dtTab4,
        dtTab5,
        dtTab6,
      );

      if (result && !result.error) {
        toast.update(loadingToast, {
          render: "Cliente creado exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        onClose();
      } else {
        toast.update(loadingToast, {
          render: result?.message || "Error al crear el cliente",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      }
    } catch (error) {
      toast.update(loadingToast, {
        render: error.message || "Ocurrió un error inesperado",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000089]">
      <div className="lg:min-w-2.5xl max-h-[90vh] max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 ml-1 text-lg font-bold text-[#0A9E9A]">
            Nuevo Cliente
          </h2>
          <GoX
            className="h-6 w-6 transition hover:text-gray-400"
            onClick={onClose}
          />
        </div>
        <div className="mb-4 flex w-80 items-center gap-2 overflow-auto overflow-x-auto pb-2 text-nowrap md:w-full md:items-start">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-1 py-1 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-[#0a9e9a]"
                  : "text-gray-600 opacity-50"
              } ${tab !== "Datos Personales" ? "cursor-not-allowed" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="max-h-[80vh] overflow-y-auto">{renderContent()}</form>

        <button
          className="flex items-center rounded-lg bg-[#0a9e9a] px-6 py-2 text-sm text-white transition hover:bg-[#098b89]"
          onClick={handleSubmit}
        >
          <BiSave className="mr-1 h-5 w-5" /> Guardar
        </button>
      </div>
    </div>
  );
}

export default ModalNewClients;
