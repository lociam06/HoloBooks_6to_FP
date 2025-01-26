import { Link } from "react-router-dom";
import "./CusNav.css"

function CusNav(props){
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
                    <Link to="/course-creation-page">Cursos+</Link>
                    <Link to="/course-selection-page">Cursos</Link>
                    <Link to="#">Contacto</Link>
                    <Link to="/faq-page">FQA</Link>
                    <Link to="#">Info</Link>
                    <Link to="/login-page">Perfil</Link>
                </div>
            </div>
        </nav>
    )
}

export default CusNav;