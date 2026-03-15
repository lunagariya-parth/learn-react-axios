import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ROUTES } from "./routes/routes";
import AuthLayout from "./layout/auth-layout";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, name, component }) => (
          <Route key={name} path={path} element={component} />
        ))}
        <Route path="/auth/" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
