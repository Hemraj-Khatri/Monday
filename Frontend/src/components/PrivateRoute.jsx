import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
