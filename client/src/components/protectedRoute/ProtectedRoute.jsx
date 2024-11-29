import { useCart } from "../cartContext/CartContext";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useCart();

  if (!token) {
    return <Link to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
