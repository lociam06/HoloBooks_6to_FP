import React from "react";
import CoursesPageDatas from "./CoursePageDatas";
import CusNav from "../../componets/CusNav/CusNav";
import Banner from "../../componets/Banner/Banner";
import CusFooter from "../../componets/CusFooter/CusFooter";
import { UserCommentCarrusel, UserComment } from "../../componets/UserCommentCarrusel/UserCommentCarrusel";
import { Link } from "react-router-dom";

import "./CoursePage.css";

function CoursePage(props){
    let pageData;
    pageData = CoursesPageDatas.find(course => course.page = props.course);
    console.log(pageData);

    let comments = [];
    pageData.userTestimony.forEach(comment => {
        comments.push(<UserComment key={comment.key} userAvatar={comment.userAvatar} userName={comment.userName} comment={comment.comment}/>)
    });
    return(
        <>
            <header>
                <CusNav color={pageData.page}/>
            </header>
            <main id="coursePage">
                <Banner />
                <div className="page-label">
                    <img src={"../../../public/icons/" + pageData.page + "Book.png"} alt="Icono del curso" />
                    <p>{pageData.label}</p>
                </div>
                <div className="page-description" style={{background: `var(--${pageData.page}_mid)`}}>
                    <div className="content">
                        <p>{pageData.courseDescription}</p>
                        <Link to="course-selector">
                            <button>Ir al curso</button>
                        </Link>
                    </div>
                    <img src={"../../../public/icons/" + pageData.page + "Book_white.png"} alt="Imagen alusiva" />
                </div>
                <div className="registered-users">
                    <span className="num-of-users" style={{backgroundImage: `linear-gradient(90deg, var(--${pageData.page}_dark) , var(--${pageData.page}_mid) , var(--${pageData.page}_light))`}}>{pageData.numOfUsers.toLocaleString("en-US")}</span>
                    <span className="label">Usuarios que han completado nuestros cursos, con resultados satisfactorios.</span>
                </div>
                <section className="user-testimonials">
                    <h1 className="user-testimonials-title">Testimonios de nuestros usuarios</h1>
                    <UserCommentCarrusel comments={comments}/>
                </section>
                <CusFooter color={pageData.page}/>
            </main>
        </>
    )
}

export default CoursePage;