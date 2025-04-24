import { Link } from "react-router-dom";
import "./CusNav.css"
import { isLogged, getUserInfo } from "../../utils/authCheck.js"
import { useState } from "react";

function CusNav(props){
    const loggedUserInfo = getUserInfo();
    const [ isPerfilDrpdownDropped, setIsPerfilDrpdownDropped ] = useState(false);
    let styles;
    if(props.color){styles = {background: `var(--${props.color}_mid)`}}
    else{styles = {background: "var(--holo_dark)"}}
    return(
        <nav style={styles}>
            <div className="left-side">
                <Link to="/">
                    <img src={`/public/icons/${props.color ? props.color : "holo"}Book_white.png`} alt="holoBooksLogo"/>
                </Link>
            </div>
            <div className="right-side">
                <div className="buttons">
                    <Link to="/">Inicio</Link>
                    <Link to="/add-course-page">Cursos++</Link>
                    <Link to="/course-selection-page">Cursos</Link>
                    <Link to="#">Contacto</Link>
                    <Link to="#">Info</Link>
                    {isLogged() ? (
                            <button className="perfil-btn" onClick={() => setIsPerfilDrpdownDropped(!isPerfilDrpdownDropped)}>
                                <i class="fa-solid fa-circle-user"></i>
                                {loggedUserInfo.nombre}
                                {isPerfilDrpdownDropped &&
                                    <div className="perfil-dropdown">
                                        <Link>Perfin</Link>
                                        <Link to="/login-page">Cerrar sesion</Link>
                                    </div>
                                }
                            </button>
                            ) : (
                                <Link to="/login-page">Iniciar sesion</Link>
                            )
                        }
                </div>
            </div>
        </nav>
    )
}

export default CusNav;