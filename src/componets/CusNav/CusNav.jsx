import { Link } from "react-router-dom";
import "./CusNav.css"

function CusNav(props){
    return(
        <nav>
            <div className="left-side">
                <img src="/public/icons/holo_white.png" alt="holoBooksLogo"/>
            </div>
            <div className="right-side">
                <div className="buttons">
                    <Link to="/">Inicio</Link>
                    <Link to="#">Cursos</Link>
                    <Link to="#">Contacto</Link>
                    <Link to="#">FQA</Link>
                    <Link to="#">Info</Link>
                    <Link to="login-page">Perfil</Link>
                </div>
            </div>
        </nav>
    )
}

export default CusNav;