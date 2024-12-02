import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <main className="App">
        <LandingPage />
      </main>
    </Router>
  );
}

export default App;
