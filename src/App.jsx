import { Link } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useAuth } from "./hooks/useAuth";
import { ROUTES } from "./constants/routePaths";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* TEMP nav for testing. Replace with <Navbar /> from components/layout. */}
      <nav>
        <Link to={ROUTES.BROWSE}>Browse</Link> |{" "}
        <Link to={ROUTES.INBOX}>Inbox</Link> |{" "}
        <Link to={ROUTES.CREATE_LISTING}>Create listing</Link> |{" "}
        {user ? (
          <button onClick={logout}>Logout ({user.name})</button>
        ) : (
          <>
            <Link to={ROUTES.LOGIN}>Log in</Link> |{" "}
            <Link to={ROUTES.REGISTER}>Register</Link>
          </>
        )}
      </nav>

      <AppRouter />
    </div>
  );
}