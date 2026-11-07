import { useState, useCallback, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginPromptContext } from "./LoginPromptContext";
import LoginPromptModal from "../components/common/LoginPromptModal";

const DEFAULT_MESSAGE = "Log in or create an account to continue.";

export default function LoginPromptProvider({ children }) {
  const { user } = useAuth();
  const [message, setMessage] = useState(null); // null = popup closed

  // Returns true if the user is logged in 
  // Returns false and opens the popup if they are a guest.
  const requireLogin = useCallback(
    (msg = DEFAULT_MESSAGE) => {
      if (user) return true;
      setMessage(msg);
      return false;
    },
    [user]
  );

  const close = useCallback(() => setMessage(null), []);
  const value = useMemo(() => ({ requireLogin }), [requireLogin]);

  return (
    <LoginPromptContext.Provider value={value}>
      {children}
      <LoginPromptModal open={message !== null} message={message} onClose={close} />
    </LoginPromptContext.Provider>
  );
}