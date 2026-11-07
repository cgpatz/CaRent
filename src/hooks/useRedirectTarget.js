import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routePaths";

const AUTH_PAGES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Where to send the user after login or register:
// the page ProtectedRoute remembered, or Browse if there isn't one.
export function useRedirectTarget() {
  const { state } = useLocation();
  const from = state?.from;

  // Never redirect back to Login or Register 
  if (!from || AUTH_PAGES.includes(from.pathname)) return ROUTES.BROWSE;

  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
}