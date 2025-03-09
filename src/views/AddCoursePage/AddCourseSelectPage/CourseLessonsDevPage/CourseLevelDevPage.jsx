import React from "react"
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import "./CourseLevelDevPage.css"

export default function CourseLevelDevPage() {
    const [listLevels, setListLevels] = useState([]);
    const [listLessons, setListLesson] = useState([]);
    const { course_id } = useParams();
    const [ searchParam ] = useSearchParams();
    const levelDropped = searchParam.get("levelDropped")
    console.log(levelDropped);
    useEffect(() => {
        fetch(`http://localhost:5000/levels?course_id=${course_id}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Ha ocurrido un error");
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setListLevels(data);
            })
            .catch((error) => {
                console.error("Error en fetch:");
            });
    }, [course_id]);

    useEffect(() => {
        fetch(`http://localhost:5000/lessons?course_id=${course_id}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Ha ocurrido un error");
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setListLesson(data);
            })
            .catch((error) => {
                console.error("Error en fetch:");
            });
    }, [course_id]);

    useEffect(() => {
        console.log(listLevels);
    }, [listLevels]);
    useEffect(() => {
        console.log(listLessons);
    }, [listLessons]);
    return (
        <section id="CourseLevelDevPage">
            <header id="CourseLevelDevPage_header">
                {/*Cusnav */}
            </header>
            <main id="CourseLevelDevPage_main">
                <aside>
                    {listLevels.map((level) => (
                        <LevelElem levelTitle={level.titulo} displayed={level.nivel_id == levelDropped} levelID={level.nivel_id} key={level.nivel_id}>
                            {listLessons
                                .filter((lesson) => lesson.nivel_id === level.nivel_id)
                                .map((lesson) => (
                                    <li key={lesson.leccion_id}>{"leccion" + lesson.leccion_id}</li>
                                ))}
                        </LevelElem>
                    ))}
                    <AddLevelArea />
                </aside>
            </main>
        </section>
    )
}

function LevelElem(props) {
    const [display, setDisplay] = useState(props.displayed ? "d-block" : "d-none");
    const [displayInputs, setDisplayInputs] = useState(false);
    const nivelID = props.levelID;
    const navigate = useNavigate();

    const switchDisplay = () => setDisplay(display == "d-none" ? "d-block" : "d-none");
    const handleAddLesson = async () => {
        if(!(nivelID < 1)){
            try {
                const response = await fetch('http://localhost:5000/add/lesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({nivelID, orden: 1, contenido: ""}),
                });
    
                if (response.ok) {
                    alert("Registrado");
                    navigate(`?levelDropped=${nivelID}`, { replace: true });
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    if(errorData.message == "ER_NO_REFERENCED_ROW_2") alert("No existe el elemento referenciado");
                    else alert("Ha ocurrido un error: " + errorData.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        else alert("Llene los campos con el valor correcto");
    }
    return (
        <div className="levelItem">
            <div className="itemLevelName" onClick={switchDisplay}>{props.levelTitle}</div>
            <div className={`levelItemList ${display}`}>
                <ul className={`levelItemList`}>
                    {props.children}
                </ul>
                <div className="addLessonArea">
                    {!displayInputs && 
                        <button className="addLessonBtn" onClick={() => setDisplayInputs(true)}>+</button>
                    }
                    {displayInputs && 
                        <div className="addLessonInputs">
                            <span>¿Agrgar nueve leccion?</span>
                            <button className="confirmAddLesson" onClick={() => handleAddLesson()}>♥</button>
                            <button className="cancelAddLesson" onClick={() => setDisplayInputs(false)}>X</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function AddLevelArea() {
    const [titulo, setTitulo] = useState("");
    const { course_id } = useParams();
    const handleAddLevel = async (e) => {
        e.preventDefault();

        if (!(titulo.trim() == "")) {
            try {
                const response = await fetch('http://localhost:5000/add/level', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ titulo, cursoID: course_id, orden: 1, duracion: 1 }),
                });

                if (response.ok) {
                    alert("Registrado");
                } else {
                    const errorData = await response.json();
                    if (errorData.message == "ER_NO_REFERENCED_ROW_2") alert("No existe el elemento referenciado");
                    else alert("Ha ocurrido un error: " + errorData.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        else alert("Llene los campos con el valor correcto");
    }

    return (
        <div className="addLevelArea">
            <input type="text"
                placeholder="Nombre del nivel"
                id="addLevelTextInput"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)} />
            <button id="addLevelBtn" onClick={(e) => handleAddLevel(e)} disabled={titulo.trim() == ""}>+</button>
        </div>
    )
}