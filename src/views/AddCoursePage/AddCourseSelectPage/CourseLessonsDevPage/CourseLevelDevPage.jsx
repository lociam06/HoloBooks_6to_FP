import React from "react"
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import "./CourseLevelDevPage.css"
//import "../../../../../public/Images/"


export default function CourseLevelDevPage() {
    let starterContentPageState = `{
        "encabezado": "Nueva leccion",
        "completable": false,
        "content": []
    }`
    
    //Navegacion
    const navigate = useNavigate();

    //listas de lecciones y niveles
    const [listLevels, setListLevels] = useState([]);
    const [listLessons, setListLesson] = useState([]);

    //parametros de busqueda
    const { course_id } = useParams();
    const [searchParam] = useSearchParams();
    const levelDropped = searchParam.get("levelDropped");

    //Estado para el contenido de la leccion
    const [lessonPageContent, setLessonPageContent] = useState(starterContentPageState);
    const [lessonDisplayedID, setLessonDisplayedID] = useState(0);

    //fetch de los niveles
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
                console.error("Error en fetch: " + error.mensage);
            });
    }, [course_id]);

    //fecth de las lecciones
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
                if (data.length > 0) {
                    setLessonPageContent(data[0].contenido);
                    setLessonDisplayedID(data[0].leccion_id);
                }
            })
            .catch((error) => {
                console.error("Error en fetch:");
                console.log(error);
            });

    }, [course_id]);

    /*useEffect(() => {
        console.log(listLevels);
    }, [listLevels]);*/
    /*useEffect(() => {
        console.log(listLessons);
    }, [listLessons]);*/


    return (
        <section id="CourseLevelDevPage">
            <header id="CourseLevelDevPage_header">
                {/*Cusnav */}
            </header>
            <main id="CourseLevelDevPage_main">
                <aside>
                    <button className="goBackBtn" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button>
                    {listLevels.map((level) => (
                        <LevelElem levelTitle={level.titulo} displayed={level.nivel_id == levelDropped} levelID={level.nivel_id} key={level.nivel_id}>
                            {listLessons
                                .filter((lesson) => lesson.nivel_id === level.nivel_id)
                                .map((lesson) => (
                                    <li onClick={() => {setLessonPageContent(lesson.contenido); setLessonDisplayedID(lesson.leccion_id);}} 
                                    key={lesson.leccion_id}
                                    className="lessonItem"
                                    >{"leccion" + lesson.leccion_id}
                                    </li>
                                ))}
                        </LevelElem>
                    ))}
                    <AddLevelArea />
                </aside>
                <LessonPageContent lessonDisplayed={lessonPageContent} lessonID={lessonDisplayedID} setLessonPageContent={setLessonPageContent} listLessons={listLessons}/>
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
        if (!(nivelID < 1)) {
            try {
                const response = await fetch('http://localhost:5000/add/lesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        nivelID: nivelID,
                        orden: 1,
                        contenido : JSON.stringify({
                            "header": "Nueva leccion",
                            "completable": false,
                            "lessonType": "",
                            "content": []
                        })
                    }),
                });

                if (response.ok) {
                    navigate(`?levelDropped=${nivelID}`, { replace: true });
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    if (errorData.message == "ER_NO_REFERENCED_ROW_2") alert("No existe el elemento referenciado");
                    else console.log(errorData);
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
                            <span>¿Agregar nueve leccion?</span>
                            <button className="confirmAddLesson" onClick={() => handleAddLesson()}>✓</button>
                            <button className="cancelAddLesson" onClick={() => setDisplayInputs(false)}>X</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function LessonElem(props) {
    return (
        <li>

        </li>
    )
}

function AddLevelArea() {
    const [titulo, setTitulo] = useState("");
    const [ displayInput, setDisplayInput ] = useState(false);
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
                    window.location.reload();
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
            <button id="addLevelBtn" onClick={(e) => handleAddLevel(e)} disabled={titulo.trim() == ""} className={titulo.trim() == "" ? "disabled" : ""}>Agregar nivel</button>
        </div>
    )
}

function LessonPageContent(props) {
    const lesson = JSON.parse(props.lessonDisplayed);
    let elementsDisplay = [];

    elementsDisplay.push(<h1 key={-1} className="lesson-header">{lesson.header}</h1>);
    for (let i = 0; i < lesson.content.length; i++) {
        const elem = lesson.content[i];
        if (elem.elementType == "img") {
            elementsDisplay.push(
                <img className="img" key={i} src={`../../../../../public/Images/${elem.content}`} alt="Imagen ilustrativa" />
            );
        } else if (elem.elementType == "paragraph") {
            elementsDisplay.push(
                <p key={i} className="paragraph">
                    {elem.content}
                </p>
            );
        } else if (elem.elementType == "header") {
            switch (elem.level) {
                case "1": elementsDisplay.push(<h1 key={i} className="header level-1">{elem.content}</h1>); break;
                case "2": elementsDisplay.push(<h2 key={i} className="header level-2">{elem.content}</h2>); break;
                case "3": elementsDisplay.push(<h3 key={i} className="header level-3">{elem.content}</h3>); break;
                default: elementsDisplay.push(<h1 key={i} className="header level-1">{elem.content}</h1>); break;
            };
        } else if (elem.elementType == "note") {
            elementsDisplay.push(
                <div key={i} className="note">
                    <span className="note_title">Nota</span>
                    <span className="note_content">{elem.content}</span>
                </div>
            );
        } else if (elem.elementType == "code") {
            elementsDisplay.push(
                <div key={i} className="code">
                    <div className="code_language">{ elem.language }</div>
                    <code className="code_code">
                        { elem.content }
                    </code>
                </div>
            );
        }
    }

    return (
        <section className="lessonPageContent">
            {elementsDisplay}
            {props.listLessons.length > 0 ?
                (<AddLessonContent lessonID={props.lessonID} lessonDisplayed={props.lessonDisplayed} setLessonDisplayed={props.setLessonPageContent}/>
                ): (
                <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        height:"100%"
                    }}>
                    <h1 style={{fontSize:"2.5rem"}}>Agrega una leccion</h1>
                </div>)
            }
        </section>
    )
}
function AddLessonContent({ lessonID, lessonDisplayed, setLessonDisplayed, }) {

    let lessonDisplayedObj = JSON.parse(lessonDisplayed);

    const [isButtonsDisplayed, setIsButtonsDisplayed] = useState(false)
    const [contentOpedend, setContentOpedend] = useState([
        { header: false },
        { paragraph: false },
        { img: false },
        { note: false },
        { code: false }
    ]);

    const stateEnum = {
        header: 0,
        paragraph: 1,
        img: 2,
        note: 3,
        code: 4
    }

    const closeOthers = (notToClose) => {
        setContentOpedend((prevState) =>
            prevState.map((item) => {
                const key = Object.keys(item)[0];
                if (key == notToClose) return { [key]: true };
                else return { [key]: false }
            })
        );
    }

    const [ headerInput, setHeaderInput ] = useState({
        elementType: "header",
        level: 1,
        content: ""
    });
    const [ paragrapshInput, setParagraphInput ] = useState({
        elementType: "paragraph",
        content: ""
    });
    const [ imgInput, setImgInput ] = useState({
        elementType: "img",
        content: ""
    });
    const [ noteInput, setNoteInput ] = useState({
        elementType: "note",
        content: ""
    });
    const [ codeInput, setCodeInput ] = useState({
        elementType: "code",
        language: "JS",
        content: ""
    });

    const addElment = async (elem) => {
        console.log("se intento anadir un header");
        lessonDisplayedObj.content.push(elem);

        let newLessonDisplayedJSON = JSON.stringify(lessonDisplayedObj);
        setLessonDisplayed(newLessonDisplayedJSON);
        
        const response = await fetch('http://localhost:5000/update/lesson', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ lesson_id: lessonID, content: newLessonDisplayedJSON}),
        });
        if (response.ok) {
            console.log("Se ha modificado correctamente");
        } else {
            console.log(response);
            const errorData = await response.json();
            console.log( errorData);
            alert("Ha ocurrido un error")
        }
    }
    return (

        <div className="addLessonContent">
            <button onClick={() => setIsButtonsDisplayed(!isButtonsDisplayed)}>Añadir</button>
            {
                isButtonsDisplayed &&
                <div className="addLessonContentButtons">
                    <div className="">
                        <button onClick={() => closeOthers("header")}>Encabezado</button>
                        {
                            contentOpedend[stateEnum["header"]]["header"] &&
                            <div className="addContentArea">
                                <select name="" id="" onChange={(e) => setHeaderInput((prev) => ({...prev, level: e.target.value}))}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <input type="text" placeholder="Encabezado" maxLength={20} value={headerInput.content} onChange={(e) => setHeaderInput((prev) => ({...prev, content: e.target.value}))}/>
                                <button onClick={() => addElment(headerInput)}>Añadir</button>
                            </div>
                        }
                    </div>
                    <div className="">
                        <button onClick={() => closeOthers("paragraph")}>Parrafo</button>
                        {
                            contentOpedend[stateEnum["paragraph"]]["paragraph"] &&
                            <div className="addContentArea">
                                <textarea name="" id="" value={paragrapshInput.content} onChange={(e) => setParagraphInput((prev) => ({...prev, content: e.target.value}))}></textarea>
                                <button onClick={() => addElment(paragrapshInput)}>Añadir</button>
                            </div>
                        }
                    </div>
                    <div className="">
                        <button onClick={() => closeOthers("img")}>Imagen</button>
                        {
                            contentOpedend[stateEnum["img"]]["img"] &&
                            <div className="addContentArea">
                                <input type="file" value={imgInput.content} onChange={(e) => setImgInput((prev) => ({...prev, content: e.target.value}))}/>
                                <button onClick={() => addElment(imgInput)}>Añadir</button>
                            </div>
                        }
                    </div>
                    <div className="">
                        <button onClick={() => closeOthers("note")}>Nota</button>
                        {
                            contentOpedend[stateEnum["note"]]["note"] &&
                            <div className="addContentArea">
                                <textarea name="" id="" value={noteInput.content} onChange={(e) => setNoteInput((prev) => ({...prev, content: e.target.value}))}></textarea>
                                <button onClick={() => addElment(noteInput)}>Añadir</button>
                            </div>
                        }
                    </div>
                    <div className="">
                        <button onClick={() => closeOthers("code")}>Codigo</button>
                        {
                            contentOpedend[stateEnum["code"]]["code"] &&
                            <div className="addContentArea">
                                <input type="text" placeholder="Lenguaje de programacion" value={codeInput.language} onChange={(e) => setCodeInput((prev) => ({...prev, language: e.target.value}))}/>
                                <textarea name="" id="" value={codeInput.content} onChange={(e) => setCodeInput((prev) => ({...prev, content: e.target.value}))}></textarea>
                                <button onClick={() => addElment(codeInput)}>Añadir</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}