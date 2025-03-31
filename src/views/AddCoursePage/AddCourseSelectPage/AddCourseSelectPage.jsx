import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddCourseSelectPage.css";

export default function AddCourseSelectPage(props) {
    const [listCourses, setListCourses] = useState([]);
    const { filialName } = useParams();
    const navitage = useNavigate();
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

    return (
        <section id="AddCourseSelectPage_body">
            <header id="AddCourseSelectPage_header">
                <button onClick={() => navitage("/add-course-page")} className="go_back_btn"><i className="fa-solid fa-arrow-left"></i></button>
                <div className="title">
                    <img src={`../../../../public/icons/${filialName}Book.png`} alt="" />
                    <span>{`Cursos ${filialName}Book`}</span>
                </div>
            </header>

            <main id="AddCourseSelectPage_main">
                <div id="courses_container">
                    {listCourses.map((course) => (
                        <Course key={course.curso_id} course_id={course.curso_id} courseName={course.titulo} />
                    ))}
                <AddCourseBtn />
                </div>
            </main>
        </section>
    )
}

function Course(props) {
    const { filialName } = useParams();
    const [ filialNameS, setFilianame ] = useState(filialName);
    const navigate = useNavigate();

    const handleCourse = () => {
        navigate(`/add-course-page/${filialNameS}/${props.course_id}`);
    }
    return (
        <div className="course" onClick={() => handleCourse()}>
            <img src="../../../../public/icons/HTML5.png" alt="Imagen de la tecnologia" />
            <span>{props.courseName}</span>
        </div>
    )
}

function AddCourseBtn(){
    const { filialName } = useParams();

    const [ titulo, setTitulo ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ duracion, setDuracion ] = useState("");
    const [ filial, setFilial ] = useState(filialName);

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const handleAddReg = async (e) => {
        e.preventDefault();
        if(!(titulo.trim() == "" || descripcion.trim() == "")){
            try {
                const response = await fetch('http://localhost:5000/add/course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({titulo, descripcion, filial}),
                });
    
                if (response.ok) {
                    alert("Registrado");
                    setIsModalOpen(false);
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    alert("Ha ocurrido un error: " + errorData.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        else alert("Llene los campos con el valor correcto");
    }

    return(
        <div className="addCourseBtn_container">
            <button className="addCourseBtn" onClick={() => setIsModalOpen(true)}>Agregar curso</button>

            {isModalOpen &&
                <div className="addCourseModal">
                    <form>
                        <h1>Agregar curso</h1>
                        <div>
                            <label htmlFor="courseTitulo">Titulo</label>
                            <input type="text" id="courseTitulo" name="courseTitle" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="courseDescripcion">Descripcion</label>
                            <input type="text" id="courseDescripcion" name="courseDescripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="courseDuracion">Filial</label>
                            <input type="text" id="courseDuracion" name="courseDuracion" minLength={1} value={filial} onChange={(e) => setFilial(e.target.value)} disabled/>
                        </div>
                        <div className="buttonsContainer">
                            <button className="add-btn" type="submit" onClick={handleAddReg}>Agregar</button>
                            <button className="close-btn" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}