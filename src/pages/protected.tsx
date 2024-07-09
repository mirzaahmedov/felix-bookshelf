import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/auth";

const Protected = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default Protected;
