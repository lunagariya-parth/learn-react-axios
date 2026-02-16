import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ROUTES } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, name, component }) => (
          <Route key={name} path={path} element={component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
