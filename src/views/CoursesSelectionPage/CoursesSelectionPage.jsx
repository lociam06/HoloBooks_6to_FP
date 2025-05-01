import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesSelectionPage.css"
import CusNav from "../../componets/CusNav/CusNav.jsx"
import CusFooter from "../../componets/CusFooter/CusFooter.jsx"


function CoursesSelectionPage(){
    return(
        <>
            <CusNav />
            <main id="courses-selection-container">
                <h1>
                    Descubre nuestros cursos
                </h1>
                <section id="course-cards-container">
                    <CourseCard color="web"/>
                    <CourseCard color="code" reverse/>
                    <CourseCard color="dbase"/>
                </section>
            </main>
            <CusFooter />
        </>
    )
}

function CourseCard(props){

    const navigate = useNavigate();

    const goToPage = () =>{
        navigate(`/course-page/${props.color}`);
    }

    let style = {backgroundImage: `linear-gradient(280deg, var(--${props.color}_dark) , var(--${props.color}_mid) , var(--${props.color}_light))`}
    if(props.reverse) style["flexDirection"] = "row-reverse";
    
    return(
        <div className="course-card" style={style}>
            <div className="img-container">
                <img src={`/icons/${props.color}Book_white.png`} alt="imagen del curso" />
            </div>
            <div className="content">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                <button onClick={goToPage}>Ver mas</button>
            </div>
        </div>
    )
}

export default CoursesSelectionPage;