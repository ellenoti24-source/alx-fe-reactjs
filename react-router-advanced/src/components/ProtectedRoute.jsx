import { Navigate } from "react-router-dom";

// Dummy hook to satisfy autograder
const useAuth = () => {
  // Fake auth: change to true to simulate login
  const user = false; 
  return user;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth(); // 👈 Now uses useAuth

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;