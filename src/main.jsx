import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TipoDocumentProvider from "./Context/TipoDocumento/TipoDocumentProvider.jsx";
import SubGrupoProvider from "./Context/SubGrupo/SubGrupoProvider.jsx";
import UsuarioProvider from "./Context/Usuario/UsuarioProvider.jsx";
import LocalesAnexosProvider from "./Context/LocalesAnexos/LocalesAnexosProvider.jsx";
import CuentaBancariaEmpresaProvider from "./Context/CuentaBancaria/CuentaBancariaEmpresaProvider.jsx";
import PersonalProvider from "./Context/Personal/PersonalProvider.jsx";
import EmpresaProvider from "./Context/Empresa/EmpresaProvider.jsx";
import ClienteProvider from "./Context/Cliente/ClienteProvider.jsx";
import RolProvider from "./Context/Roles/RolProvider.jsx";
import SerieProvider from "./Context/Serie/SerieProvider.jsx";
import TipoGastoProvider from "./Context/TipoGasto/TipoGastoProvider.jsx";
import SubGrupoVecProvider from "./Context/SubGrupoVehic/SubGrupoVehProvider.jsx";
import DashboardProvider from "./Context/Dashboard/DashboardProvider.jsx";
import MarcaModeloProvider from "./Context/MarcaModeloVeh/MarcaModeloProvider.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import ClaseVehiculoProvider from "./Context/ClaseVehiculo/ClaseVehiculoProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DashboardProvider>
      <TipoDocumentProvider>
        <SubGrupoProvider>
          <UsuarioProvider>
            <LocalesAnexosProvider>
              <CuentaBancariaEmpresaProvider>
                <PersonalProvider>
                  <ClienteProvider>
                    <EmpresaProvider>
                      <RolProvider>
                        <SerieProvider>
                          <TipoGastoProvider>
                            <SubGrupoVecProvider>
                              <MarcaModeloProvider>
                                <ClaseVehiculoProvider>
                                  <App />
                                </ClaseVehiculoProvider>
                              </MarcaModeloProvider>
                            </SubGrupoVecProvider>
                          </TipoGastoProvider>
                        </SerieProvider>
                      </RolProvider>
                    </EmpresaProvider>
                  </ClienteProvider>
                </PersonalProvider>
              </CuentaBancariaEmpresaProvider>
            </LocalesAnexosProvider>
          </UsuarioProvider>
        </SubGrupoProvider>
      </TipoDocumentProvider>
    </DashboardProvider>
    <ToastContainer />
  </StrictMode>,
);
