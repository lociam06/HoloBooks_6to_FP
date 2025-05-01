import React from "react";
import "./AddCoursePage.css";
import { Navigate, useNavigate } from "react-router-dom";

import CusNav from "../../componets/CusNav/CusNav";

import AddCourseSelectPage from "./AddCourseSelectPage/AddCourseSelectPage";
export default function AddCoursePage(){
    return(
        <>
            <header>
                <CusNav />
            </header>
            <main id="addCoursePage_container">
                <h1 className="title">Seleccione que curso quiere modificar</h1>
                <div className="courses">
                    <Course course="web" title="Web"/>
                    <Course course="dbase" title="DBase"/>
                    <Course course="code" title="Code"/>
                </div>
            </main>
        </>
    )
}
function Course(props){
    let imgContStyles = {backgroundImage: `linear-gradient(to bottom, var(--${props.course}_dark) , var(--${props.course}_mid) , var(--${props.course}_light))`}
    const navigate = useNavigate();
    const handleFilial = () =>{
        navigate(`/add-course-page/${props.course}`);
    }
    return(
        <div className="course" onClick={() => handleFilial()}>
            <span className="title">{props.title}</span>
            <div className="img_cont" style={imgContStyles}>
                <img src={"/icons/" + props.course + "Book_white.png"} alt="" />
            </div>
        </div>
    )
}