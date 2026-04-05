// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    const token = localStorage.getItem('accessToken');
    if (dados && token) {
      setUsuario(JSON.parse(dados));
    }
    setCarregando(false);
  }, []);

  function login(dadosUsuario, accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  }

  function logout() {
    localStorage.clear();
    setUsuario(null);
  }

  const isSuperAdmin = usuario?.role === 'SUPER_ADMIN';
  const isAdmin = usuario?.role === 'ADMIN' || isSuperAdmin;
  const tenantId = usuario?.tenant?.id;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isSuperAdmin, isAdmin, tenantId, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
