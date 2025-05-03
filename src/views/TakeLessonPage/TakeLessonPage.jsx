import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TakeLessonPage.css";
import { getUserInfo } from "../../utils/authCheck.js"

export default function TakeLessonPage() {
    const { levelId, filial } = useParams();
    const [ lessonList, setLessonList ] = useState([]);
    const [ carrouselIndex, setCarrouselIndex ] = useState(0);
    const navigate = useNavigate();

    const userInformation = getUserInfo();
    useEffect(() => {
        fetch(`https://holobooks-6to-fp-be.onrender.com/lessons?level_id=${levelId}`)
        .then((response) => {
            if(response.ok)return response.json();
            else console.log("Error en el fetch");
        })
        .then((data) => {
            setLessonList(data);
        });
    },[]);

    //Funciones del control del indice
    const carouselStyle = {transform: `translateX(${carrouselIndex * - 100}%)`}
    const next = () => {
        if(carrouselIndex < lessonList.length - 1) setCarrouselIndex((prev) => prev + 1);
        if(carrouselIndex == lessonList.length - 1) handleCompleteLesson();
    }
    const prev = () => {
        if(carrouselIndex > 0) setCarrouselIndex((prev) => prev - 1);
    }

    const handleCompleteLesson = async () => {
        const response = await fetch("https://holobooks-6to-fp-be.onrender.com/add/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: userInformation.usuario_id, levelId}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert("Ha ocurrido un error: " + errorData.message);
        }else{
            alert("Leccion completada");
            navigate(-1);
        }
    }
    console.log((lessonList.length))
    return (
        <section id="TakeLessonPage" style={{background: `linear-gradient(90deg, var(--${filial}_light), var(--${filial}_mid), var(--${filial}_dark))`}}>
            <main>
                <div className="quit-btn-container">
                    <button className="quit-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="lessons-carrousel" style={carouselStyle}>
                    <div className="lessons">
                        {
                            !(lessonList.length == 0)
                            ? lessonList.map((lesson) => {
                                return <Lesson key={lesson.leccion_id} lessonJ={lesson.contenido}/>
                            })
                            : <h1 style={{fontSize: "2rem", height:"100%", width:"100%", textAlign: "center"}}>No hay lecciones</h1>
                        }
                    </div>
                </div>
                <div className="control-buttons">
                    <button className="prev-btn" onClick={prev} disabled={carrouselIndex == 0}><span><i className="fa-solid fa-caret-left"></i> Anterior</span></button>
                    <button className="next-btn" onClick={next} disabled={carrouselIndex == lessonList.length}>
                        {
                            (carrouselIndex == lessonList.length - 1)
                            ? <span>Completar <i className="fa-solid fa-check"></i></span>
                            : <span>Siguiente <i className="fa-solid fa-caret-right"></i></span>
                        }
                    </button>
                </div>
            </main>
        </section>
    )
}

function Lesson({ lessonJ }) {
    const lesson = JSON.parse(lessonJ);
    let elementsDisplay = [];
    const { filial } = useParams();
    for (let i = 0; i < lesson.content.length; i++) {
        const elem = lesson.content[i];
        if (elem.elementType == "img") {
            elementsDisplay.push(
                <img className="img" key={i} src={`/Images/${elem.content}`} alt="Imagen ilustrativa" />
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
                    <p className="note_title" style={{backgroundColor:`var(--${filial}_mid)`}}>Nota</p>
                    <span className="note_content">{elem.content}</span>
                </div>
            );
        } else if (elem.elementType == "code") {
            elementsDisplay.push(
                <div key={i} className="code">
                    <div className="code_language">{ elem.language }</div>
                    <span className="code_content">
                        { elem.content }
                    </span>
                </div>
            );
        }
    }
    console.log(elementsDisplay)

    return(
        <div className="lesson">
            {
                elementsDisplay.length == 0
                ? <h1>No hay contenido</h1>
                : elementsDisplay
            }
        </div>
    )
}