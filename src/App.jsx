import { auth, db } from "./config/firebase";

export default function App() {
  console.log("Project:", auth.app.options.projectId, db.type);
  return <h1>CaRent</h1>;
}