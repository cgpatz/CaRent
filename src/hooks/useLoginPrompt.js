import { useContext } from "react";
import { LoginPromptContext } from "../context/LoginPromptContext";

export function useLoginPrompt() {
  const context = useContext(LoginPromptContext);
  if (!context) {
    throw new Error("useLoginPrompt must be used inside <LoginPromptProvider>");
  }
  return context;
}