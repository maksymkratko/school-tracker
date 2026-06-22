import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClassPage from "./pages/ClassPage";
import { useAuth } from "./context/AuthContext";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <Protected>
            <Dashboard />
          </Protected>
        } />

        <Route path="/class/:id" element={
          <Protected>
            <ClassPage />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  );
}