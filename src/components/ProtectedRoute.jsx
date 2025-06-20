import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

function ProtectedRoute({ children }) {
  const { user } = useMovieContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;
