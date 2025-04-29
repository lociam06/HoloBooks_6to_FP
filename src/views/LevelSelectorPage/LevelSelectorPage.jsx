import { useEffect, useState } from "react";
import "./LevelSelectorPage.css";
import { useNavigate, useParams } from "react-router-dom";

export default function LevelSelectorPage() {
    const { courseId, filial } = useParams();
    const navigate = useNavigate();
    const [levelsList, setLevelsList] = useState([]);
    const [progressList, setProgressList] = useState([]);
    let levelIndex = 1;
    let levelClass = "start" || "mid0" || "mid1" || "rowEnd0" || "rowEnd1" || "end";

    useEffect(() => {
        fetch(`http://localhost:5000/levels?course_id=${courseId}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Ha ocurrido un error");
                    return;
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                setLevelsList(data);
            })
    }, []);
    return (
        <section id="level-selector-page" style={{background: `linear-gradient(90deg, var(--${filial}_light), var(--${filial}_dark))`}}>
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
                        // Agrupar niveles de a 5
                        levelsList.reduce((rows, level, i) => {
                            const rowIndex = Math.floor(i / 5);
                            if (!rows[rowIndex]) rows[rowIndex] = [];
                            rows[rowIndex].push(level);
                            return rows;
                        }, []).map((row, rowIndex) => {
                            // Invertir filas impares
                            const orderedRow = rowIndex % 2 === 1 ? [...row].reverse() : row;

                            return (
                                <div key={rowIndex} className={`row ${rowIndex % 2 === 0 ? 'normal' : 'reversed'}`}>
                                    {
                                        orderedRow.map((level, iInRow) => {
                                            let levelIndex = rowIndex * 5 + iInRow + 1;
                                            let levelClass = "";

                                            if (levelIndex === 1) levelClass = "start";
                                            else if (levelIndex === levelsList.length) levelClass = "end";
                                            else if (rowIndex % 2 === 0) {
                                                levelClass = (iInRow === 4) ? "rowEnd0" : "mid0";
                                            } else {
                                                levelClass = (iInRow === 0) ? "rowEnd1" : "mid1";
                                            }

                                            return <Level key={level.nivel_id} levelName={level.titulo} completed="" styleClass={levelClass} />
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </section>
    )
}

function Level({ levelName, completed, styleClass }) {
    return (
        <div className="level">
            <div className={"level-name " + styleClass}>{levelName}</div>
            <div className={"level-circle " + styleClass}>
                {completed
                    ? <i className="level-completed-icon fa-solid fa-check"></i>
                    : <i className="level-uncompleted-icon fa-solid fa-circle"></i>
                }
            </div>
        </div>
    )
}
