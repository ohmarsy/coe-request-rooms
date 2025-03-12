  // AppRouter.tsx
  import { Route, Routes, Navigate } from "react-router-dom";
  import WelcomePage from "../pages/Welcome";
  import SignUpPage from "../pages/SignUp";
  import SignInPage from "../pages/SignIn";
  import MainPage from "../pages/Main";
  import RequestRoomsPage from "../pages/RequestRooms";
  import ProtectedRoute from "../components/ProtectedRoute";

  const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        
        <Route 
          path="/main" 
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/request-rooms" 
          element={
            <ProtectedRoute allowedRoles={['student', 'staff']}> 
              <RequestRoomsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  };

  export default AppRouter;
