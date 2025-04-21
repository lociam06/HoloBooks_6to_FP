import { useEffect } from "react";
import { isLogged } from "../../utils/authCheck";
import { useNavigate } from "react-router-dom";

export default function ProtectedView({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged()) navigate("/login-page");
    }, [navigate]);
    if (!isLogged()) {
        return null;
    }
    return children;
}