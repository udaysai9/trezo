import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../services/firebaseConfig";

function ProtectedRoute({ element: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
