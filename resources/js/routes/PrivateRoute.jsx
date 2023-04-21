import {Navigate, Route, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({children}) => {
    const { authUser } = useSelector((state) => state.auth);

    const isLoggedIn = () => {
        if (authUser?.isLoggedIn && authUser) {
            return authUser.isLoggedIn;
        } else {
            return false;
        }
    };

    return isLoggedIn() ? children : <Navigate to={"/login"}/>;
};

export default PrivateRoute;
