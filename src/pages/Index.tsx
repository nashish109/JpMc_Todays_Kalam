
import { Navigate } from "react-router-dom";

const Index = () => {
  // For now, redirect to dashboard - in production this would check auth
  return <Navigate to="/dashboard" replace />;
};

export default Index;
