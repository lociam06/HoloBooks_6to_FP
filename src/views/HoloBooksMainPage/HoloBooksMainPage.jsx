import React, { useState } from 'react';
import CusNav from "../../componets/CusNav/CusNav.jsx";
import "./HoloBooksMainPage.css";

function HoloBooksMainPage(){
    return(
        <>
            <CusNav></CusNav>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum veniam suscipit ipsum ducimus minima placeat quod, optio odit, eos, quo rerum quidem rem soluta aut dolorem reprehenderit distinctio magnam mollitia?
            </p>
            <section id="course-selection">
                <h2>Explora nuestros cursos</h2>
                <div className="courses-card-continer">
                    <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web"/>
                    <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web"/>
                    <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web"/>
                </div>
                <button>Ir a los cursos</button>
            </section>

            <section id="user-testimonials">

            </section>
        </>
    )
}

function CourseCard(props){
    return(
        <div className="course-card">
            <h2 className="title">{props.courseTitle}</h2>
            <div className="card">
                <img src={"../../../public/icons/" + props.imgUrl} alt="logoDelCurso" />
                <div className="go-btn">
                    <button>Ir</button>
                </div>
            </div>
        </div>
    )
}

function UserComment(props){
    return(
        <div className="user-commet">
            <div className="user">
                <img src={props.userAvatar} alt="avatar" className="avatar" />
                <span className="userName">{props.userName}</span>
            </div>
            <p className="comment">{props.comment}</p>
        </div>
    )
}

function UserCommentCarrusel({comments}){
    const [actualIndex, setActualIndex] = useState(0);

    const nextComment = () =>{
        setActualIndex((prevIndex) => prevIndex == comments.leght - 1 ? 0 : prevIndex + 1);
    }

    const prevComment = () =>{
        setActualIndex((prevIndex) => prevIndex == 0 ? comments.leght - 1 : prevIndex - 1);
    }
}
export default HoloBooksMainPage;