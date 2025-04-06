import {
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  HomeIcon
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaStoreAlt } from "react-icons/fa";
import { GoFileSubmodule } from "react-icons/go";
// import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom"; // Importar Link

const Sidebar = ({ isOpen, closeSidebar }) => {
  {
    /* Estado para controlar que menú esta abierto */
  }
  const [openSection1, setOpenSection1] = useState(null);
  const [openSection2, setOpenSection2] = useState(null);

  {
    /* Función para abrir/cerrar menú */
  }
  const toggleSection1 = (section1) => {
    setOpenSection1(openSection1 === section1 ? null : section1);
  };
  const toggleSection2 = (section2) => {
    setOpenSection2(openSection2 === section2 ? null : section2);
  };


  return (
    <>
      {/* Sidebar visible solo en dispositivos pequeños y cuando está abierto */}
      <div
        className={`bg-white p-4 transition-all duration-300 fixed top-0 left-0 w-full z-10 lg:hidden 
        ${isOpen ? "block" : "hidden"}`}
      >
        <li
          className="hover:bg-gray-300 p-2 rounded text-black/60"
          onClick={closeSidebar}
        >
          Menú de Navegación
        </li>

        <ul className="space-y-2 mt-4">
          <li className="hover:bg-gray-300 p-2  rounded" onClick={closeSidebar}>
            <Link to="/">Dashboard</Link>
          </li>

          <li className="hover:bg-gray-300 p-2 rounded" onClick={closeSidebar}>
            <Link to="/configuracion">Configuración</Link>
          </li>

          <li className="hover:bg-gray-300 p-2 rounded" onClick={closeSidebar}>
            <Link to="/personal">Personal</Link>
          </li>
          <li className="hover:bg-gray-300 p-2 rounded" onClick={closeSidebar}>
            <Link to="/usuario">Usuario</Link>
          </li>
          <li className="hover:bg-gray-300 p-2 rounded" onClick={closeSidebar}>
            <Link to="/Empresa">Empresa</Link>
          </li>
          <li className="hover:bg-gray-300 p-2 rounded" onClick={closeSidebar}>
            <Link to="/vehiculo">Vehiculos</Link>
          </li>
        </ul>
      </div>

      {/* Sidebar para pantallas grandes (Tablet y Web), visible siempre */}
      <div className="lg:block hidden bg-white h-full w-full lg:w-56 xl:w-60 overflow-y-auto">
  <div className="flex p-4 h-24 border-b-2 border-gray-200">
    <div className="flex gap-2">
      <img
        src="https://via.placeholder.com/150"
        alt="fotogr"
        className="mt-2 lg:mt-0 lg:h-16 lg:w-16 rounded-full border-2 border-gray-300 object-cover"
      />
      <div className="flex flex-col">
        <span className="font-bold text-black text-lg">Davis</span>
        <span className="text-gray-500 xl:text-[10px] lg:text-[8.6px]">
          SUPER ADMINISTRADOR
        </span>
      </div>
    </div>
  </div>
  <div className="ml-3 py-1 mt-1">
    <label className="text-[#334155cc]">Menú de Navegación</label>
  </div>
  <div className="p-3 flex pb-2 flex-col ">
    <ul className="space-y-1">
            <Link to="/" className="text-[#334155]">
              <li className="hover:bg-[#ECF5FF] rounded flex items-center space-x-3 text-[#00535e]">
                <button className="flex text-sm gap-1 items-center justify-center py-2 rounded ">
                  <HomeIcon className="w-5 h-5 text-[#334155]"    />
                  Dashboard
                </button>
              </li>
            </Link>
            {/* Section1 */}
            <li className="rounded  items-center space-x-3 text-[#00535e]">
              <button
                className="flex items-center justify-between w-full hover:bg-[#ECF5FF] py-2 rounded cursor-pointer"
                onClick={() => toggleSection1("configuracion")}
              >
                <div className="flex text-sm items-center gap-1 text-[#334155]">
                  <Cog8ToothIcon className="w-5 h-5 text-[#334155]" />
                  Configuración
                </div>
                <div className="ml-2">
                  {openSection1 === "configuracion" ? (
                    <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                  )}
                </div>
              </button>
              {/* Submenú*/}
              {openSection1 === "configuracion" && (
                <ul className="pl-5  border-gray-300 text-sm">
                  <Link to="/usuario">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Usuario
                    </li>
                  </Link>
                  <Link to="/RolesyPermisos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      {" "}
                      Roles y Permisos
                    </li>
                  </Link>
                  <Link to="/Empresa">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Empresa
                    </li>
                  </Link>
                  <Link to="/Costos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Centros de Costos
                    </li>
                  </Link>
                  <Link to="/localAnexo">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Locales Anexos
                    </li>
                  </Link>
                  <Link to="/Series">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Gestor de Series
                    </li>
                    <Link to="/CuentaBancaria">
                      <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                        Cuentas Bancarias
                      </li>
                    </Link>
                  </Link>
                  <li>
                    <div className="rounded hover:bg-[#F4F9FF] items-center space-x-3 p-2 py-2  text-[#334155]">
                      <button
                        className="flex items-center  justify-between w-full rounded cursor-pointer"
                        onClick={() => toggleSection2("personal")}
                      >
                        <div className="flex gap-2 text-[#334155]">
                          Personal
                        </div>
                        <div className="ml-2">
                          {openSection2 === "personal" ? (
                            <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                          ) : (
                            <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                          )}
                        </div>
                      </button>
                    </div>
                    {/* Submenú*/}
                    {openSection2 === "personal" && (
                      <ul className="pl-6 border-gray-300 text-sm mb-1">
                        <Link to="/SubGrupos">
                          <li className="flex gap-2 p-2 hover:bg-[#F4F9FF] rounded text-gray-500"  >
                            Subgrupos
                          </li>
                        </Link>
                        <Link to="/personal">
                          <li className="flex gap-2 hover:bg-[#F4F9FF] -mt-1 p-2 rounded text-gray-500"  >
                            Personal
                          </li>
                        </Link>
                      </ul>
                    )}
                  </li>
                  <Link to="/Clientes">
                    <li className=" hover:bg-[#F4F9FF] rounded py-2 p-2  flex items-center space-x-3 text-[#334155]"  >
                      <button className="flex gap-1.5 items-center justify-center rounded ">
                        Clientes
                      </button>
                    </li>
                  </Link>
                  <li className="rounded items-center space-x-3 text-[#00535e]">
                    <button
                      className="flex items-center justify-between w-full hover:bg-[#F4F9FF] py-2 p-2  rounded cursor-pointer" 
                      onClick={() => toggleSection2("vehiculo")}
                    >
                      <div className="flex gap-2  text-[#334155]">Vehículos</div>
                      <div className="ml-2">
                        {openSection2 === "vehiculo" ? (
                          <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    {openSection2 === "vehiculo" && (
                      <ul className="pl-6 mb-1 border-gray-300 text-sm">
                        <Link to="/ClaseVehiculo">
                          <li className="flex gap-2 p-2 hover:bg-[#F4F9FF] rounded text-gray-500"  >
                            Clases
                          </li>
                        </Link>
                        <Link to="/MarcaModelo"  >
                          <li className="flex gap-2 p-2 -mt-1 hover:bg-[#F4F9FF] rounded text-gray-500"  >
                            Modelos
                          </li>
                        </Link>
                        <Link to="/subGroupVehiculoTable"  >
                          <li className="flex gap-2 p-2 -mt-1 hover:bg-[#F4F9FF] rounded text-gray-500"  >
                            Subgrupos
                          </li>
                        </Link>
                        <Link to="/Vehiculos"  >
                          <li className="flex gap-2 p-2 -mt-1 hover:bg-[#F4F9FF] rounded text-gray-500"  >
                            Vehiculos
                          </li>
                        </Link>
                      </ul>
                    )}
                  </li>
                  <Link to="/Gastos"  >
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Tipos de Gastos
                    </li>
                  </Link>
                  <Link to="/TipoDocumentos"  >
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Tipos de Documentos
                    </li>
                  </Link>
                  <Link to="/Ajustes">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]">
                      Ajustes Avanzados
                    </li>
                  </Link>
                  <Link to="/MonedaTipoCambio"  >
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Moneda Tipo Cambio
                    </li>
                  </Link>
                  <Link to="/CajaMotivo">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Caja Motivos
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            <li className="rounded  items-center space-x-3 text-[#00535e]">
              <button
                className="flex items-center justify-between w-full hover:bg-[#ECF5FF] py-2 rounded cursor-pointer"
                onClick={() => toggleSection1("documentos")}
              >
                <div className="flex text-sm items-center gap-1 text-[#334155]">
                  <CgFileDocument className="w-5 h-5 text-[#334155]" />
                  Documentos
                </div>
                <div className="ml-2">
                  {openSection1 === "documentos" ? (
                    <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                        )}
                </div>
              </button>
              {openSection1 === "documentos" && (
                <ul className="pl-5  border-gray-300 text-sm">
                  <Link to="/DocumentosPersonal">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Documento de Personal
                    </li>
                  </Link>
                  <Link to="/DocumentosVehiculos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Documento de Vehículos
                    </li>
                  </Link>
                  <Link to="/DocumentosLegal">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Documento Legal
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            <li className="rounded  items-center space-x-3 text-[#00535e]">
              <button
                className="flex items-center justify-between w-full hover:bg-[#ECF5FF] py-2 rounded cursor-pointer"
                onClick={() => toggleSection1("operaciones")}
              >
                <div className="flex text-sm items-center gap-1 text-[#334155]">
                  <GoFileSubmodule className="w-5 h-5 text-[#334155]"/>
                  Operaciones
                </div>
                <div className="ml-2">
                  {openSection1 === "operaciones" ? (
                    <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                  )}
                </div>
              </button>
              {openSection1 === "operaciones" && (
                <ul className="pl-5  border-gray-300 text-sm">
                  <Link to="/ProformasCotizaciones">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >
                      Proformas /Cotizaciones
                    </li>
                  </Link>
                  <Link to="/OrdenesDocumentos">
                  <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                  Órdenes de Documentos
                    </li>
                  </Link>
                  <Link to="/OrdenesServicio">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Órdenes de Servicio
                    </li>
                  </Link>
                  <Link to="/GuiasTransportistas">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >
                      Guías Transportistas
                    </li>
                  </Link>
                  <Link to="/GuiasTransportistasConductor">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Guías Transportistas(Conductor)
                    </li>
                  </Link>
                  <Link to="/OrdenesViaje">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Órdenes de Viaje
                    </li>
                  </Link>
                  <Link to="/Retornos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Retornos
                    </li>
                  </Link>
                  <Link to="/ValidacionServicios">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Validación de Servicio
                    </li>
                  </Link>
                  <Link to="/LiquidacionDocumentaria">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Liquidación Documentaria
                    </li>
                  </Link>
                  <Link to="/MonitoreoConductor">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Monitoreo de Conductor
                    </li>
                  </Link>
                  <Link to="/GastosConductor">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Gastos de Conductor
                    </li>
                  </Link>
                  <Link to="/BancosConductor">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Bancos de Conductor
                    </li>
                  </Link>
                  <Link to="/FleteServicios">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Flete de Servicios
                    </li>
                  </Link>
                  <Link to="/ControlLlantas">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Control de Llantas
                    </li>
                  </Link>
                  <Link to="/GastosOperativos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Gastos Operativos
                    </li>
                  </Link>
                  <Link to="/GastosPeajes">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Gastos Peajes
                    </li>
                  </Link>
                  <Link to="/InventarioEntregaVehiculo">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Inventario(Entrega Vehículo)
                    </li>
                  </Link>
                  <Link to="/Reportes">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >
                      Reportes
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            <li className="rounded  items-center space-x-3 text-[#00535e]">
              <button
                className="flex items-center justify-between w-full hover:bg-[#ECF5FF] py-2 rounded cursor-pointer"
                onClick={() => toggleSection1("almacen/taller")}
              >
                <div className="flex text-sm items-center gap-1 text-[#334155]">
                  <FaStoreAlt className="w-5 h-5 text-[#334155]"/>
                  Almacen/Taller
                </div>
                <div className="ml-2">
                  {openSection1 === "almacen/taller" ? (
                    <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                  )}
                </div>
              </button>
              {openSection1 === "almacen/taller" && (
                <ul className="pl-5  border-gray-300 text-sm">
                  <Link to="/Checklist">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >Checklist
                    </li>
                  </Link>
                  <Link to="/AlmacenStock">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >Almacen Stock
                    </li>
                  </Link>
                  <Link to="/OrdenesCompras">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >Órdenes de Compra
                    </li>
                  </Link>
                  <Link to="/AutorizacionOrdCompras">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Autorización de ord. Compras
                    </li>
                  </Link>
                  <Link to="/PagoRequerimientos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Pago de Requerimientos
                    </li>
                  </Link>
                  <Link to="/GastosAlmacen">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Gastos almacen
                    </li>
                  </Link>
                  <Link to="/Compras">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Compras
                    </li>
                  </Link>
                  <Link to="/SalidaArticulos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Sálida de Artículos
                    </li>
                  </Link>
                  <Link to="/SolicitudPedido">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Solicitud de Pedido
                    </li>
                  </Link>
                  <Link to="/AutorizaciónSolicitud">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Autorización de Solicitud
                    </li>
                  </Link>

                  <li>
                    <div className="rounded hover:bg-[#F4F9FF] items-center space-x-3 p-2 py-2  text-[#334155]">
                      <button
                        className="flex items-center  justify-between w-full rounded cursor-pointer"
                        onClick={() => toggleSection2("taller")}
                      >
                        <div className="flex gap-2 text-[#334155]">
                          Taller
                        </div>
                        <div className="ml-2">
                          {openSection2 === "taller" ? (
                            <ChevronUpIcon className="w-5 h-5 text-[#6e7786]" />
                          ) : (
                            <ChevronDownIcon className="w-5 h-5 text-[#6e7786]" />
                          )}
                        </div>
                      </button>
                    </div>
                    {/* Submenú*/}
                    {openSection2 === "taller" && (
                      <ul className="pl-6 border-gray-300 text-sm mb-1">
                        <Link to="/MantenimientoVehiculos">
                        <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >

                            Mantenimiento Vehiculos
                          </li>
                        </Link>
                        <Link to="/OrdenTrabajo">
                          <li className="flex gap-2 hover:bg-[#F4F9FF] -mt-1 p-2 rounded text-gray-500"  >
                            Órden de Trabajo
                          </li>
                        </Link>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li className="rounded  items-center space-x-3 text-[#00535e]">
              <button
                className="flex items-center justify-between w-full hover:bg-[#ECF5FF] py-2 rounded cursor-pointer"
                onClick={() => toggleSection1("tesoreria")}
              >
                  <div className="flex text-sm items-center gap-1 text-[#334155]">
                  <BanknotesIcon className="w-5 h-5 text-[#334155]"/>
                  Tesorería
                </div>
                <div className="ml-2">
                  {openSection1 === "tesoreria" ? (
                    <ChevronUpIcon className="w-4.5 h-4.5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-4.5 h-4.5 text-gray-500" />
                  )}
                </div>
              </button>
              {openSection1 === "tesoreria" && (
                <ul className="pl-5  border-gray-300 text-sm">
                  <Link to="/Caja">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Caja
                    </li>
                  </Link>
                  <Link to="/CajaRapida">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Caja Rápida
                    </li>
                  </Link>
                  <Link to="/CajaChica">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Caja Chica
                    </li>
                  </Link>
                  <Link to="/AutorizacionGastos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Autorización de Gastos
                    </li>
                  </Link>
                  <Link to="/PagoOrdenes">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Pago Órdenes
                    </li>
                  </Link>
                  <Link to="/PagoFacturas">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Pago Facturas
                    </li>
                  </Link>
                  <Link to="/PagoRequerimientos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Pago de Requerimientos
                    </li>
                  </Link>
                  <Link to="/LiquidacionGastos">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Liquidación de Gastos Op.
                    </li>
                  </Link>
                  <Link to="/LiquidacionOtros">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Liquidación (Otros)
                    </li>
                  </Link>
                  <Link to="/LiquidacionVehTerceros">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Liquidación de Veh. terceros
                    </li>
                  </Link>
                  <Link to="/LiquidacionServEscolta">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"  >Liquidación Serv. Escolta
                    </li>
                  </Link>
                  <Link to="/PagosComprasCredito">
                    <li className="flex hover:bg-[#F4F9FF] p-2 rounded gap-2 text-[#334155]"   >Pagos de Compras (Crédito)
                    </li>
                  </Link>
                </ul>
              )}
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
