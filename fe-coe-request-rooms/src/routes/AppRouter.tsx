// AppRouter.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "../pages/Welcome";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import MainPage from "../pages/Main";
import RequestRoomsPage from "../pages/RequestRooms";
import ProtectedRoute from "../components/ProtectedRoute"; // นำเข้า ProtectedRoute
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      
      {/* ใช้ ProtectedRoute สำหรับหน้า Main และ RequestRooms */}
      <Route 
        path="/main" 
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/request-rooms" 
        element={
          <ProtectedRoute>
            <RequestRoomsPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
