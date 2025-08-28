import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router";
import routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import { AuthProvider, useAuth } from "./services/auth/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import Login from "./pages/login/index.jsx";

function AppRoutes() {
  const route = useRoutes(routes);
  return route;
}

function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <BrowserRouter>
            <ProtectedRoute>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </ProtectedRoute>
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
