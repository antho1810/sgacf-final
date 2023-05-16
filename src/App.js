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
import CreateActa from "./components/actas/createActa/CreateActa";

const user = localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    // Login routes
    <Route>
      {user && (
        <Route path="/" exact element={<RootLayout />}>
          <Route index element={<Dashboard />} loader={dashboardLoader}></Route>

          <Route path="crear-acta" element={<CreateActa />}></Route>
          <Route path="actualizar-acta" element={<UpdateActa />}></Route>
        </Route>
      )}
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
