import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Tạm thời trả về children, có thể thêm logic authentication sau
  return <>{children}</>;
};

export default ProtectedRoute;
