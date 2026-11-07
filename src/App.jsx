import { useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import LoginPromptProvider from "./context/LoginPromptProvider";
import { ROUTES } from "./constants/routePaths";

const HIDE_NAVBAR_ON = [ROUTES.LOGIN, ROUTES.REGISTER];

export default function App() {
  const { pathname } = useLocation();
  const showNavbar = !HIDE_NAVBAR_ON.includes(pathname);

  return (
    <LoginPromptProvider>
      <div>
        {showNavbar && <Navbar />}
        <AppRouter />
      </div>
    </LoginPromptProvider>
  );
}