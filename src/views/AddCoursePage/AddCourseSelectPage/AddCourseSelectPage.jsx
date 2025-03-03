import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AddCourseSelectPage.css";

export default function AddCourseSelectPage(props) {
    const [listCourses, setListCourses] = useState([]);
    const { filialName } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/courses?filial=${filialName}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Ha ocurrido un error");
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setListCourses(data);
            })
            .catch((error) => {
                console.error("Error en fetch:");
            });
    }, [filialName]);

    // Este useEffect se ejecutará cada vez que `listCourses` cambie
    useEffect(() => {
        console.log(listCourses);
    }, [listCourses]);

    return (
        <>
            <header id="AddCourseSelectPage_header">
                <div id="title">
                    <img src="" alt="" />
                    <span></span>
                </div>
            </header>

            <main id="AddCourseSelectPage_main">
                <div id="courses_container">
                    {listCourses.map((course) => (
                        <Course key={course.curso_id} courseName={course.titulo} />
                    ))}
                </div>
            </main>
        </>
    )
}

function Course(props) {
    return (
        <div className="course">
            <span>{props.courseName}</span>
            <img src="" alt="" />
        </div>
    )
}

function CreateCourseModal() {

}