import React from "react";
import { Link } from "react-router-dom";
import "./CourseCreationPage.css";
import CusNav from "../../componets/CusNav/CusNav.jsx";

function CourseCreationPage(){
    return(
        <>
            <CusNav></CusNav>
            <div id="courseSelectionContainer">
                <Link to="/course-creation-page/courses">Cursos</Link>
                <Link to="/course-creation-page/levels">Niveles</Link>
                <Link to="/course-creation-page/lessons">Lecciones</Link>
            </div>
        </>
    )
}

export default CourseCreationPage;