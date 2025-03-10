import React from 'react';
import AppRouter from './routes/AppRouter'; // นำเข้า AppRouter
import { AuthProvider } from './context/AuthContext'; // นำเข้า AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
