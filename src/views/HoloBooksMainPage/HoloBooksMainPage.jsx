import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import CusFooter from "../../componets/CusFooter/CusFooter.jsx";
import Banner from "../../componets/Banner/Banner.jsx"

import "./HoloBooksMainPage.css";
import "../../App.css";

function HoloBooksMainPage() {
    return (
        <>
            <header>
                <CusNav />
            </header>
            <main>
                <Banner />
                <p id="page-label">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum veniam suscipit ipsum ducimus minima placeat quod, optio odit, eos, quo rerum quidem rem soluta aut dolorem reprehenderit distinctio magnam mollitia?, Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis molestiae porro natus veniam repudiandae amet voluptatibus eaque illum mollitia? Itaque at repellat ut eius dolor iusto optio illum nisi.
                </p>
                <section id="course-selection">
                    <h2>Explora nuestros cursos</h2>
                    <div id="courses-card-container">
                        <CourseCard imgUrl="webBook_white.png" courseTitle="Desarrollo web" color="web"/>
                        <CourseCard imgUrl="codeBook_white.png" courseTitle="Programacion" color="code"/>
                        <CourseCard imgUrl="dbaseBook_white.png" courseTitle="Base de datos" color="dbase"/>
                    </div>
                    <button id="go-to-courses-btn">Ir a los cursos</button>
                </section>

                <section id="user-testimonials">
                    <h1 id="user-testimonials-title">Testimonios de nuestros usuarios</h1>
                    <UserCommentCarrusel />
                </section>

            </main>
            <CusFooter />
        </>
    )
}

function CourseCard(props) {
    let style = {backgroundImage: `linear-gradient(to bottom, var(--${props.color}_dark) , var(--${props.color}_mid) , var(--${props.color}_light))`}
    let btnStyle = {background: `var(--${props.color}_mid)`}
    return (
        <div className="course-card">
            <h2 className="title">{props.courseTitle}</h2>
            <div className="card" style={style}>
                <img src={"../../../public/icons/" + props.imgUrl} alt="logoDelCurso" />
                <div className="go-btn">
                    {<button style={btnStyle}>Ir</button>}
                </div>
            </div>
        </div>
    )
}

function UserComment(props) {
    return (
        <div className="user-comment">
            <div className="user">
                <img src={props.userAvatar} alt="avatar" className="avatar" />
                <span className="userName">{props.userName}</span>
            </div>
            <p className="comment">{props.comment}</p>
        </div>
    )
}

function UserCommentCarrusel() {
    const comments = [
        <UserComment key="1" userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example1" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="2" userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example2" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="3" userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example3" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment key="4" userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example4" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
    ]
    const [actualIndex, setActualIndex] = useState(0);
    let styles = {transform: `translateX(${actualIndex * (-34)}em)`,}

    const prevComment = () => {
        setActualIndex((prevIndex) => prevIndex == 0 ? comments.length - 2 : prevIndex - 1);
    }

    const nextComment = () => {
        setActualIndex((prevIndex) => prevIndex == comments.length - 2 ? 0 : prevIndex + 1);
    }
    
    return (
        <div id="carousel">
            <button className="carousel-button prev" onClick={prevComment}>
                ◀
            </button>
            <div id="carousel-comment-container">
                <div id="comments" style={styles}>
                    {comments}
                </div>
            </div>
            <button className="carousel-button next" onClick={nextComment}>
                ▶
            </button>
        </div>
    );
}
export default HoloBooksMainPage;