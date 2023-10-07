import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Obtener el token de localStorage o establecerlo en null si no está disponible
  const initialToken = localStorage.getItem('access_token') || null;

  // State para almacenar el token de autenticación
  const [userToken, setUserToken] = useState(initialToken);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
