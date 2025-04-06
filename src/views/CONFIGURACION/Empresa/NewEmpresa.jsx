import { useState, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import useEmpresa from "../../../Hooks/useEmpresa";

function NewEmpresa({
  isOpen,
  onClose,
  empresaExistente = null,
  esEdicion = false,
}) {
  const { AgregarEmpresa, EditarEmpresa } = useEmpresa();
  const [formData, setFormData] = useState({
    razon_social: "",
    nombre_comercial: "",
    numero_documento: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  useEffect(() => {
    if (esEdicion && empresaExistente) {
      setFormData({
        razon_social: empresaExistente.razon_social,
        nombre_comercial: empresaExistente.nombre_comercial,
        numero_documento: empresaExistente.numero_documento,
        direccion: empresaExistente.direccion,
        telefono: empresaExistente.telefono,
        email: empresaExistente.email,
      });
      console.log("Datos de empresa existente:", empresaExistente);
      console.log("Imagen existe:", empresaExistente.logo);
      setSelectedImage(empresaExistente.logo);
      setSelectedLogo(empresaExistente.logo_factura);
    }
  }, [esEdicion, empresaExistente]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedLogo(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (esEdicion) {
      EditarEmpresa(empresaExistente.id, formData, selectedImage, selectedLogo);
    } else {
      AgregarEmpresa(formData, selectedImage, selectedLogo);
    }

    setFormData({
      razon_social: "",
      nombre_comercial: "",
      numero_documento: "",
      direccion: "",
      telefono: "",
      email: "",
    });
    setSelectedImage(null);
    setSelectedLogo(null);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      razon_social: "",
      nombre_comercial: "",
      numero_documento: "",
      direccion: "",
      telefono: "",
      email: "",
    });
    setSelectedImage(null);
    setSelectedLogo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-sm bg-black opacity-40"></div>
      <div className="w-85 h-[80%]  md:h-[90%] sm:w-[680px] lg:w-[900px] lg:h-[550px] xl:w-[1000px] xl:h-[650px] 2xl:w-[1200px] 2xl:h-[650px] bg-white rounded-lg border-collapse overflow-y-auto relative">
        <div className="flex justify-between sticky top-0 bg-white p-1 pl-4 ">
          <h2 className="text-lg font-bold mb-2 mt-4 text-[#0A9E9A]">
           {esEdicion ? 'Editar Empresa' : 'Nueva Empresa'}
          </h2>
          <GoX
            className="w-6 h-6 mt-2 mr-2  hover:text-gray-400 transition"
            onClick={handleClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
            {/* Contenedor principal */}
            <div className="flex flex-col md:flex-row gap-4 px-2 md:px-4 lg:px-6 items-center md:items-start w-full ">
              <div>
                <div className="flex md:flex-col flex-row sm:flex-row md:gap-5 sm:gap-12 gap-3">
                  {/* Imagen seleccionada */}
                  <div className="md:flex md:flex-col gap-2  md:gap-0 items-center bg-gr ">
                    <div className="w-32.5 h-34 lg:w-43.5 md:w-40.5 md:h-40 lg:h-42 bg-gray-200 rounded-t-sm flex items-center justify-center">
                      {selectedImage ? (
                        selectedImage instanceof File ? (
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Imagen seleccionada"
                            className="w-full h-full object-cover rounded-sm"
                          />
                        ) : (
                          <img
                            src={selectedImage}
                            alt="Imagen existente"
                            className="w-full h-full object-cover rounded-sm"
                          />
                        )
                      ) : (
                        "Sin Imagen"
                      )}
                    </div>
                    <div className="flex flex-row items-center">
                      <label
                        htmlFor="upload-image"
                        className=" gap-1 bg-[#0a9e9a] text-white px-5 md:px-9 lg:px-10 py-1 text-xs rounded-b-sm flex items-center whitespace-nowrap cursor-pointer"
                      >
                        <AiOutlineUpload className="lg:w-5 lg:h-5 w-4 h-4" />
                        Subir imagen
                      </label>
                      <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  {/* Logo seleccionado */}
                  <div className="md:flex md:flex-col gap-2  md:gap-0 items-center bg-gr">
                    <div className="w-41 h-34 lg:w-43.5 md:w-41 md:h-40 lg:h-42 bg-gray-200 rounded-t-sm flex items-center justify-center">
                      {selectedLogo && selectedLogo instanceof File ? (
                        <img
                          src={URL.createObjectURL(selectedLogo)}
                          alt="Logo seleccionado"
                          className="w-full h-full object-cover rounded-sm"
                        />
                      ) : (
                        "Sin Imagen"
                      )}
                    </div>
                    <div className="flex flex-row items-center">
                      <label
                        htmlFor="upload-logo"
                        className="lg:gap-1.5 gap-1  bg-[#0a9e9a] text-white px-2 lg:px-3 py-1 text-xs rounded-b-sm flex items-center whitespace-nowrap cursor-pointer"
                      >
                        <AiOutlineUpload className="w-4 h-4" />
                        Subir logo para Facturas
                      </label>
                      <input
                        id="upload-logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full p-2">
                <div className="md:flex gap-4 mb-3 lg:mb-5">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Ruc <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      name="numero_documento"
                      value={formData.numero_documento}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Ruc"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Razon Social
                    </label>
                    <input
                      type="text"
                      name="razon_social"
                      value={formData.razon_social}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Razón Social"
                    />
                  </div>
                </div>
                <div className="md:flex gap-4 mb-3 lg:mb-5">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre Comercial
                    </label>
                    <input
                      type="text"
                      name="nombre_comercial"
                      value={formData.nombre_comercial}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Nombre Comercial"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Telefono
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Telefono"
                    />
                  </div>
                </div>
                <div className="md:flex gap-4 mb-3 lg:mb-5">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Direccion
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Direccion"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Correo Electronico
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Email"
                    />
                  </div>
                </div>
                <div className="md:flex gap-4 mb-3.5">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Proveedor Electronico
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      URL Proveedor Electronico
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese URl"
                    />
                  </div>
                </div>
                <div className="lg:flex gap-4 lg:mb-2 mb-3.5 w-full">
                  <div className="w-full mb-3 lg:mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      TOKEN Proveedor Electronico
                    </label>
                    <input className="w-full mt-1 border border-gray-400 rounded-sm text-sm p-1.5 text-gray-600" />
                  </div>
                </div>
                <div className="md:flex gap-4 md:mb-5 mb-2">
                  <div className="flex flex-col w-full md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Estado Facturacion
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Ubigeo
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese Ubigeo"
                    />
                  </div>
                </div>
                <div className="lg:flex gap-4 md:mb-3 mb-2 w-full">
                  <div className="w-full lg:mb-1 mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Origen Factura Impresion
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full lg:mb-1 mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Formato Impresion
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      CNG / Guia Transportista
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese CNG"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full mb-3 lg:mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Informacion Para Facturas
                  </label>
                  <input
                    type="text"
                    className="w-full h-[60px] mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                  />
                </div>
                <div className="flex justify-end items-center gap-4 md:mt-7 mt-3 mb-5">
                  <button
                    type="submit"
                    className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                  >
                    <BiSave className="mr-1 w-5 h-5" />
                    {esEdicion ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEmpresa;
