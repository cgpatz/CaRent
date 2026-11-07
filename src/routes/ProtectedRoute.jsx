//This is for constantly checking if the user is logged in or not.
//If not, it will redirect to the login page.
//  If yes, it will render the children components.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routePaths";
import Spinner from "../components/common/Spinner/Spinner";

export default function ProtectedRoute({ children, message = "Please log in to continue." }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;

  if (!isLoggedIn) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location, message }}
        replace
      />
    );
  }

  return children;
}