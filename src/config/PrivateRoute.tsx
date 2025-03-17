import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// interface PrivateRouteProps {
//   element: JSX.Element;
// }

const PrivateRoute = ({ element }: any) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
