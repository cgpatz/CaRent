import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>{user ? `Logged in as ${user.name} (${user.email})` : "Not logged in"}</p>
      <button
        onClick={() =>
          login({ email: "test@example.com", password: "123456" }).catch((e) =>
            alert(e.message)
          )
        }
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}