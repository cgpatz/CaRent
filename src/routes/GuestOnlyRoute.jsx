import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRedirectTarget } from "../hooks/useRedirectTarget";
import Spinner from "../components/common/Spinner/Spinner";

export default function GuestOnlyRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const target = useRedirectTarget();

  // Wait for Firebase, so a logged-in user doesn't see the form flash
  if (loading) return <Spinner />;

  // Already logged in (or just logged in or registered): leave this page
  if (isLoggedIn) return <Navigate to={target} replace />;

  return children;
}