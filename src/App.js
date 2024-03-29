import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";

import Login from "./components/login/Login";
import RootLayout from "./routesLayouts/RootLayout";
import Dashboard, { dashboardLoader } from "./components/dashboard/Dashboard";
import UpdateActa from "./components/actas/updateActa/UpdateActa";
import CreateActa from "./components/actas/crearActa/CreateActa";
import CreateParticipante from "./components/participantes/createParticipante/CreateParticipante";
import ActaDetails from "./components/actas/actaDetails/ActaDetails";
import UpdateParticipante from "./components/participantes/updateParticipante/UpdateParticipante";
// import PdfPage from "./components/dashboard/PdfPage";

const user = localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    // Login routes
    <Route>
      <Route path="/login" exact element={<Login />} />
      {!user ? (
        <Route path="*" element={<Navigate replace to="/login" />} />
      ) : (
        <Route path="/" exact element={<RootLayout />}>
          <Route index element={<Dashboard />} loader={dashboardLoader}></Route>

          <Route path="crear-acta" element={<CreateActa />}></Route>
          <Route
            path="crear-participante"
            element={<CreateParticipante />}
          ></Route>
          <Route
            path="actualizar-acta/referencia/:ref"
            element={<UpdateActa />}
          ></Route>
          <Route
            path="details-acta/referencia/:ref"
            element={<ActaDetails />}
          ></Route>
          <Route
            path="actualizar-participante/id/:id"
            element={<UpdateParticipante />}
          />
        </Route>
      )}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
