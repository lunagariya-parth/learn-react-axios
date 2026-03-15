import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SupabasePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);
  return <h1>supabase page</h1>;
}
