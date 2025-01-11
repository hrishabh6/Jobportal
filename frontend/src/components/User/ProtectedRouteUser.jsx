import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      navigate("/login");
    } 
    // Redirect to home if user is not a "student"
    else if (user.role !== "student") {
      navigate("/");
    }
  }, [user, navigate]); // Only run effect when `user` changes

  // If user is logged in and has the correct role, render the protected content
  return <>{children}</>;
};
ProtectedRouteUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRouteUser;
