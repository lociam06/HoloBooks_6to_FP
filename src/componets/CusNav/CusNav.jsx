import "./CusNav.css"

function CusNav(course){
    return(
        <nav>
            <div className="left-side">
                <img src="/public/icons/holo_white.png" alt="holoBooksLogo"/>
            </div>
            <div className="right-side">
                <div className="buttons">
                    <a href="#">Inicio</a>
                    <a href="#">Cursos</a>
                    <a href="#">Contacto</a>
                    <a href="#">FQA</a>
                    <a href="#">Info</a>
                    <a href="#">Perfil</a>
                </div>
            </div>
        </nav>
    )
}

export default CusNav;