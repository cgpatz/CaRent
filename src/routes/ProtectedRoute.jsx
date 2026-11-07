//This is for constantly checking if the user is logged in or not.
//If not, it will redirect to the login page.
//  If yes, it will render the children components.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routePaths";
import Spinner from "../components/common/Spinner/Spinner";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Wait for Firebase to check the saved session.
  if (loading) return <Spinner />;

  // Guest: go to Login and remember the page they wanted
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}