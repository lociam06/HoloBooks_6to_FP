import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import Banner from "../../componets/Banner/Banner.jsx"
import CusFooter from "../../componets/CusFooter/CusFooter.jsx";
import { UserCommentCarrusel, UserComment } from '../../componets/UserCommentCarrusel/UserCommentCarrusel.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./HoloBooksMainPage.css";

function HoloBooksMainPage() {
    const comments = [
        <UserComment key="1" userAvatar="whitoutAvatarPhoto.png" userName="User Example1" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="2" userAvatar="whitoutAvatarPhoto.png" userName="User Example2" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="3" userAvatar="whitoutAvatarPhoto.png" userName="User Example3" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="4" userAvatar="whitoutAvatarPhoto.png" userName="User Example4" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
    ];
    return (
        <>
            <header>
                <CusNav />
            </header>
            <main id="mainHoloBookPage">
                <Banner />
                <p id="page-label">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum veniam suscipit ipsum ducimus minima placeat quod, optio odit, eos, quo rerum quidem rem soluta aut dolorem reprehenderit distinctio magnam mollitia?, Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis molestiae porro natus veniam repudiandae amet voluptatibus eaque illum mollitia? Itaque at repellat ut eius dolor iusto optio illum nisi.
                </p>
                <section id="course-selection">
                    <h2>Explora nuestros cursos</h2>
                    <div id="courses-card-container">
                        <CourseCard imgUrl="webBook_white.png" courseTitle="Desarrollo web" color="web" course="web-index"/>
                        <CourseCard imgUrl="codeBook_white.png" courseTitle="Programacion" color="code" course="code-index"/>
                        <CourseCard imgUrl="dbaseBook_white.png" courseTitle="Base de datos" color="dbase" course="dbase-index"/>
                    </div>
                    <button id="go-to-courses-btn">Ir a los cursos</button>
                </section>

                <section className="user-testimonials">
                    <h1 className="user-testimonials-title">Testimonios de nuestros usuarios</h1>
                    <UserCommentCarrusel comments={comments}/>
                </section>

            </main>
            <CusFooter />

            <Link to=""/>

        </>
    )
}

function CourseCard(props) {
    let style = {backgroundImage: `linear-gradient(to bottom, var(--${props.color}_dark) , var(--${props.color}_mid) , var(--${props.color}_light))`}
    let btnStyle = {background: `var(--${props.color}_mid)`}
    let navigate = useNavigate();
    const handleGoBtn = () => {
        window.scrollTo(0, 0);
        navigate("/course-page/" + props.color);
    }
    return (
        <div className="course-card">
            <h2 className="title">{props.courseTitle}</h2>
            <div className="card" style={style}>
                <img src={"../../../public/icons/" + props.imgUrl} alt="logoDelCurso" />
                <div className="go-btn">
                        {<button style={btnStyle} onClick={() => handleGoBtn()}>Ir</button>}
                </div>
            </div>
        </div>
    )
}
export default HoloBooksMainPage;