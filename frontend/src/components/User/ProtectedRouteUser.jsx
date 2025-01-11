import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRouteUser = ({ element }) => {
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
    return (
        <>
            {element}
        </>
    );
};
ProtectedRouteUser.propTypes = {
    element: PropTypes.node.isRequired,
};

export default ProtectedRouteUser;
