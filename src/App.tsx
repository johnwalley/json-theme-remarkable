import { Resume } from "./components/resume";
import resume from "virtual:resume";

function App() {
  return <Resume resume={resume} />;
}

export default App;
