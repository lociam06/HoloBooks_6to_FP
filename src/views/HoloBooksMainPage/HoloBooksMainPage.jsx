import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import CusFooter from '../../componets/CusFooter/CusFooter.jsx';

import "./HoloBooksMainPage.css";
import "../../App.css";

function HoloBooksMainPage() {
    const commentsCards = [
        <UserComment userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
        <UserComment userAvatar="../../../icons/whitoutAvatarPhoto.png" userName="User Example" comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati velit nihil nam aliquam culpa eveniet dolorum quisquam voluptatem? Commodi sequi, deserunt atque libero explicabo autem voluptates veniam delectus labore." />,
    ]

    return (
        <>
            <header>
                <CusNav />
            </header>
            <main>
                <p id="page-label">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum veniam suscipit ipsum ducimus minima placeat quod, optio odit, eos, quo rerum quidem rem soluta aut dolorem reprehenderit distinctio magnam mollitia?, Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis molestiae porro natus veniam repudiandae amet voluptatibus eaque illum mollitia? Itaque at repellat ut eius dolor iusto optio illum nisi.
                </p>
                <section id="course-selection">
                    <h2>Explora nuestros cursos</h2>
                    <div id="courses-card-container">
                        <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web" />
                        <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web" />
                        <CourseCard imgUrl="webBook.png" courseTitle="Desarrollo web" />
                    </div>
                    <button>Ir a los cursos</button>
                </section>

                <section id="user-testimonials">
                    <UserCommentCarrusel comments={commentsCards} />
                </section>

            </main>
            <CusFooter />
        </>
    )
}

function CourseCard(props) {
    let style = {}
    if(true){
        style = {backgroundImage: "linear-gradient(to right, var(--web-dark) , var(--web-mid) , var(--web-light))"}
    }
    return (
        <div className="course-card" style={style}>
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

function UserComment(props) {
    return (
        <div className="user-commet">
            <div className="user">
                <img src={props.userAvatar} alt="avatar" className="avatar" />
                <span className="userName">{props.userName}</span>
            </div>
            <p className="comment">{props.comment}</p>
        </div>
    )
}

function UserCommentCarrusel({ comments }) {
    const [actualIndex, setActualIndex] = useState(0);

    const nextComment = () => {
        setActualIndex((prevIndex) => prevIndex == comments.leght - 1 ? 0 : prevIndex + 1);
    }

    const prevComment = () => {
        setActualIndex((prevIndex) => prevIndex == 0 ? comments.leght - 1 : prevIndex - 1);
    }
    return (
        <div className="carousel">
            <button className="carousel-button prev" /*onClick={prevComment}*/>
                ◀
            </button>
            <div className="carousel-image-container">
                {comments[actualIndex]}
                {comments[actualIndex]}
            </div>
            <button className="carousel-button next" /*onClick={nextComment}*/>
                ▶
            </button>
        </div>
    );
}
export default HoloBooksMainPage;