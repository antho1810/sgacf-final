import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css"

import Login from "./components/login/Login";
import RootLayout from "./routesLayouts/RootLayout"
import Dashboard, { dashboardLoader } from "./components/dashboard/Dashboard";
import UpdateActa from "./components/actas/updateActa/UpdateActa";
// import CreateActa from "./components/actas/createActa/CreateActa";
import CreateActa from "./components/actas/crearActa/CreateActa";
import CreateParticipante from "./components/participantes/createParticipante/CreateParticipante";
import ActaDetails from "./components/actas/actaDetails/ActaDetails";
import UpdateParticipante from "./components/participantes/updateParticipante/UpdateParticipante";

// Despues de terminar pruebas, eliminar estas importaciones
import PdfPage from "./components/dashboard/PDF/PdfPage";

const user = localStorage.getItem("token")

const router = createBrowserRouter(
  createRoutesFromElements(
    // Login routes
    <Route>
      {user &&
        <Route path="/" exact element={<RootLayout />}>

          <Route
            index
            element={<Dashboard />}
            loader={dashboardLoader}
          >
          </Route>

          <Route path="crear-acta" element={<CreateActa />}></Route>
          <Route path="crear-participante" element={<CreateParticipante />}></Route>
          <Route path="actualizar-acta/referencia/:ref" element={<UpdateActa />}></Route>
          <Route path="detalle-acta/referencia/:ref" element={<ActaDetails />}></Route>
          <Route path="actualizar-participante/id/:id" element={<UpdateParticipante />} />
          <Route path="pdf" element={<PdfPage />}></Route>

        </Route>

      }
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/crear-acta" exact element={<Navigate replace to="/login" />} />
      <Route path="/actualizar-acta" exact element={<Navigate replace to="/login" />} />
      <Route path="detalle-acta/" exact element={<Navigate replace to="/login" />} />
      <Route path="/crear-participante" exact element={<Navigate replace to="/login" />} />
      <Route path="/actualizar-participante" exact element={<Navigate replace to="/login" />} />
    </Route>

  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;