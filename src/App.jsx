import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DocumentoVehiculoTable from './views/DOCUMENTOS/DocumentosVehículos/DocumentoVehiculoTable';
import DocumentosPersonalTable from './views/DOCUMENTOS/DocumentosPersonal/DocumentosPersonalTable';
import PersonalTable from './views/CONFIGURACION/Personal/PersonalTable';
import ClientsTable from './views/CONFIGURACION/Clientes/ClientsTable';
import ProveerTable from './views/CONFIGURACION/proveedor/ProveerTable';
import UsuarioTable from './views/CONFIGURACION/Usuarios/UsuarioTable';
import RolTable from './views/CONFIGURACION/rols/RolTable';
import SubgroupTable from './views/CONFIGURACION/subgrupo/SubgroupTable';
import EmpresaTable from './views/CONFIGURACION/Empresa/EmpresaTable';
import CostosTable from './views/CONFIGURACION/Costos/CostosTable';
import LocalAnexoTable from './views/CONFIGURACION/localAnexo/LocalAnexoTable';
import SeriesTable from './views/CONFIGURACION/Series/SeriesTable';
import CuentaBancTable from './views/CONFIGURACION/cuentaBancaria/CuentaBancTable';
import VehiculosTable from './views/CONFIGURACION/Vehiculos/VehiculosTable';
import MarcaModeloTable from './views/CONFIGURACION/Vehiculos/marcamodelo/MarcaModeloTable';
import ClaseVehiculoTable from './views/CONFIGURACION/Vehiculos/clase/ClaseVehicleTable';
import GastosTable from './views/CONFIGURACION/Gastos/GastosTable';
import TipoDocumentosTable from './views/CONFIGURACION/TipoDocumentos/TipoDocumentosTable';
import AjustesTable from './views/CONFIGURACION/Ajustes/AjustesTable';
import CajaMotivoTable from './views/CONFIGURACION/CajaMotivo/CajaMotivoTable';
import CajaTable from './views/TESORERIA/Caja/CajaTable';
import CajaRapidaTable from './views/TESORERIA/CajaRapida/CajaRapidaTable';
import MonedaTipoCambio from './views/CONFIGURACION/MonedaTipoCambio/MonedaTipoCambio';
import SubGroupVehiculoTable from './views/CONFIGURACION/Vehiculos/subgrupovehiculo/SubGroupVehiculoTable';
import CajaChicaTable from './views/TESORERIA/CajaChica/CajaChicaTable';
import AutorizacionGastosTable from './views/TESORERIA/AutorizacionGastos/AutorizacionGastosTable';
import PagoOrdenesTable from './views/TESORERIA/PagoOrdenes/PagoOrdenesTable';
import PagoFacturasTable from './views/TESORERIA/PagoFacturas/PagoFacturasTable';
import PagoRequerimientosTable from './views/TESORERIA/PagoRequerimientos/PagoRequerimientosTable';
import LiquidacionGastosTable from './views/TESORERIA/LiquidacionGastos/LiquidacionGastosTable';
import LiquidacionOtrosTable from './views/TESORERIA/LiquidacionOtros/LiquidacionOtrosTable';
import LiquidacionVehTercerosTable from './views/TESORERIA/LiquidacionVehTerceros/LiquidacionVehTercerosTable';
import LiquidacionServEscoltaTable from './views/TESORERIA/LiquidacionServEscolta/LiquidacionServEscoltaTable';
import PagosComprasCreditoTable from './views/TESORERIA/PagosComprasCredito/PagosComprasCreditoTable';
import DashboardPanel from './views/DASHBOARD/Panel/DashboardPanel';

const Dashboard = () => <div>Dashboard Page</div>;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#F4F5FB] overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          {/* Contenido principal */}
          <div className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<DashboardPanel />} />
              <Route path="/personal" element={<PersonalTable />} />
              <Route path="/Clientes" element={<ClientsTable />} />
              <Route path="/proveedor" element={<ProveerTable />} />
              <Route path="/usuario" element={<UsuarioTable />} />
              <Route path="/RolesyPermisos" element={<RolTable />} />
              <Route path="/SubGrupos" element={<SubgroupTable />} />
              <Route path="/Empresa" element={<EmpresaTable />} />
              <Route path="/Costos" element={<CostosTable />} />
              <Route path="/localAnexo" element={<LocalAnexoTable />} />
              <Route path="/Series" element={<SeriesTable />} />
              <Route path="/CuentaBancaria" element={<CuentaBancTable />} />
              <Route path="/Vehiculos" element={<VehiculosTable />} />
              <Route path="/subGroupVehiculoTable" element={<SubGroupVehiculoTable />} />
              <Route path="/MarcaModelo" element={<MarcaModeloTable />} />
              <Route path="/ClaseVehiculo" element={<ClaseVehiculoTable />} />
              <Route path="/Gastos" element={<GastosTable />} />
              <Route path="/TipoDocumentos" element={<TipoDocumentosTable />} />
              <Route path="/Ajustes" element={<AjustesTable />} />
              <Route path="/MonedaTipoCambio" element={<MonedaTipoCambio />} />
              <Route path="/CajaMotivo" element={<CajaMotivoTable />} />
              <Route path="/DocumentosVehiculos" element={<DocumentoVehiculoTable />} />
              <Route path="/DocumentosPersonal" element={<DocumentosPersonalTable />} />
              <Route path="/Caja" element={<CajaTable />} />
              <Route path="/CajaRapida" element={<CajaRapidaTable />} />
              <Route path="/CajaChica" element={<CajaChicaTable />} />
              <Route path="/AutorizacionGastos" element={<AutorizacionGastosTable />} />
              <Route path="/PagoOrdenes" element={<PagoOrdenesTable />} />
              <Route path="/PagoFacturas" element={<PagoFacturasTable />} />
              <Route path="/PagoRequerimientos" element={<PagoRequerimientosTable />} />
              <Route path="/LiquidacionGastos" element={<LiquidacionGastosTable />} />
              <Route path="/LiquidacionOtros" element={<LiquidacionOtrosTable />} />
              <Route path="/LiquidacionVehTerceros" element={<LiquidacionVehTercerosTable />} />
              <Route path="/LiquidacionServEscolta" element={<LiquidacionServEscoltaTable />} />
              <Route path="/PagosComprasCredito" element={<PagosComprasCreditoTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;