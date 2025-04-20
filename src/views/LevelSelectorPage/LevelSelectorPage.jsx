import { useEffect, useState } from "react";
import "./LevelSelectorPage.css";
import { useNavigate, useParams } from "react-router-dom";

export default function LevelSelectorPage() {
    const { courseId, filial } = useParams();
    const navigate = useNavigate();
    const [levelsList, setLevelsList] = useState([]);
    const [progressList, setProgressList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/levels?course_id=${courseId}`)
        .then((response) => {
            if(!response.ok){
                console.log("Ha ocurrido un error");
                return;
            }
            else{
                return response.json();
            }
        })
        .then((data) => {
            setLevelsList(data);
        })
    }, []);

    useEffect(() => {
        console.log(levelsList);
    }, [levelsList])
    return (
        <section id="level-selector-page">
            <header>
                <button onClick={() => navigate(-1)} className="go-back-btn btn"><i className="fa-solid fa-arrow-left"></i></button>
                <img src="/icons/codeBook_white.png" alt="" className="filial-icon" />
                <div className="progress-bar-container">
                    <span className="porcent">50%</span>
                    <div className="progress-bar">
                        <div className="bar-fill"></div>
                    </div>
                </div>
            </header>
            <main>
                <div className="levels-container">
                    {
                        levelsList.map((level) => {
                            return <Level levelName={level.titulo} completed=""/>
                        })
                    }
                </div>
            </main>
        </section>
    )
}

function Level({ levelName, completed }) {
    return (
        <div className="level">
            <div className="level-name">{ levelName }</div>
            <div className="level-circle">
                {completed
                    ? <i className="level-completed-icon fa-solid fa-check"></i>
                    : <i className="level-uncompleted-icon fa-solid fa-circle"></i>
                }
            </div>
        </div>
    )
}
