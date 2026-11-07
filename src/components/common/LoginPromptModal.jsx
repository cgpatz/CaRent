import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiX } from "react-icons/fi";
import { ROUTES } from "../../constants/routePaths";
import "./LoginPromptModal.css";

export default function LoginPromptModal({ open, message, onClose }) {
  // Close with the Esc key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // The Login page already shows location.state.message as a notice
  const state = { message };

  return (
    <div className="lp-backdrop" onClick={onClose}>
      <div
        className="lp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lp-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lp-close" onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>

        <div className="lp-icon">
          <FiLock size={26} />
        </div>
        <h2 id="lp-title">Log in to continue</h2>
        <p className="lp-message">{message}</p> 

        <div className="lp-actions">
          <Link to={ROUTES.LOGIN} state={state} className="lp-btn lp-btn-solid" onClick={onClose}>
            Log in
          </Link>
          <Link to={ROUTES.REGISTER} state={state} className="lp-btn lp-btn-outline" onClick={onClose}>
            Create account
          </Link>
        </div>

        <button className="lp-later" onClick={onClose}>
          Maybe later
        </button>
      </div>
    </div>
  );
}