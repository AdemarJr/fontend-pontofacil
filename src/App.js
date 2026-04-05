// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import './styles/global.css';

// Páginas
import Login from './pages/Login';
import Totem from './pages/Totem';
import Dashboard from './pages/Dashboard';
import Colaboradores from './pages/Colaboradores';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import SuperAdmin from './pages/SuperAdmin';
import Landing from './pages/Landing';

function RotaProtegida({ children, apenasAdmin = false }) {
  const { usuario, carregando, isAdmin } = useAuth();
  if (carregando) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}><div className="spinner" /></div>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (apenasAdmin && !isAdmin) return <Navigate to="/totem" replace />;
  return children;
}

function RedirecionarInicio() {
  const { usuario, carregando } = useAuth();
  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }
  if (!usuario) return <Landing />;
  if (usuario.role === 'SUPER_ADMIN') return <Navigate to="/super-admin" replace />;
  if (usuario.role === 'ADMIN') return <Navigate to="/dashboard" replace />;
  return <Navigate to="/totem" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirecionarInicio />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Totem (colaborador) */}
          <Route path="/totem" element={
            <RotaProtegida>
              <Totem />
            </RotaProtegida>
          } />

          {/* Dashboard do gerente */}
          <Route path="/dashboard" element={
            <RotaProtegida apenasAdmin>
              <Dashboard />
            </RotaProtegida>
          } />
          <Route path="/colaboradores" element={
            <RotaProtegida apenasAdmin>
              <Colaboradores />
            </RotaProtegida>
          } />
          <Route path="/relatorios" element={
            <RotaProtegida apenasAdmin>
              <Relatorios />
            </RotaProtegida>
          } />
          <Route path="/configuracoes" element={
            <RotaProtegida apenasAdmin>
              <Configuracoes />
            </RotaProtegida>
          } />

          {/* Super Admin */}
          <Route path="/super-admin" element={
            <RotaProtegida>
              <SuperAdmin />
            </RotaProtegida>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
