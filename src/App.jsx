import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { ROUTES } from "./constants/routePaths";

function TestLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.BROWSE;

  async function handleLogin() {
    try {
      await login({ email: "test@example.com", password: "123456" });
      navigate(from, { replace: true });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p>After login you go to: {from}</p>
      <button onClick={handleLogin}>Log in as test user</button>
    </div>
  );
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav>
        <Link to={ROUTES.BROWSE}>Browse</Link> |{" "}
        <Link to={ROUTES.INBOX}>Inbox</Link> |{" "}
        <Link to={ROUTES.CREATE_LISTING}>Create listing</Link>{" "}
        {user && <button onClick={logout}>Logout ({user.name})</button>}
      </nav>

      <Routes>
        <Route path={ROUTES.BROWSE} element={<h1>Browse (public)</h1>} />
        <Route path={ROUTES.LOGIN} element={<TestLogin />} />
        <Route
          path={ROUTES.INBOX}
          element={<ProtectedRoute><h1>Inbox (login required)</h1></ProtectedRoute>}
        />
        <Route
          path={ROUTES.CREATE_LISTING}
          element={<ProtectedRoute><h1>Create listing (login required)</h1></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}