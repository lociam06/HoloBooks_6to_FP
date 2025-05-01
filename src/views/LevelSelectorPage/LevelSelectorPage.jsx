import { useEffect, useState } from "react";
import "./LevelSelectorPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../utils/authCheck.js"

export default function LevelSelectorPage() {
    const { courseId, filial } = useParams();
    const navigate = useNavigate();
    const [levelsList, setLevelsList] = useState([]);
    const [progressList, setProgressList] = useState([]);
    let levelIndex = 1;
    let levelClass = "start";//|| "mid0" || "mid1" || "rowEnd0" || "rowEnd1" || "end";
    const userInfo = getUserInfo();

    //Fetch de progreso
    useEffect(() => {
        fetch(`http://localhost:5000/progress?course_id=${courseId}&user_id=${userInfo.usuario_id}`)
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
                setProgressList(data);
            })
    }, []);

    //Fetch de niveles
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

    let listProgresNoDuplicated = Array.from(
        new Map(progressList.map(p => [p.nivel_id, p])).values()
    );
    console.log(listProgresNoDuplicated);
    let progressPorcent = parseInt((listProgresNoDuplicated.length / levelsList.length) * 100);

    return (
        <section id="level-selector-page" style={{background: `linear-gradient(90deg, var(--${filial}_light), var(--${filial}_dark))`}}>
            <header>
                <button onClick={() => navigate(-1)} className="go-back-btn btn"><i className="fa-solid fa-arrow-left"></i></button>
                <img src="/icons/codeBook_white.png" alt="" className="filial-icon" />
                <div className="progress-bar-container">
                    <span className="porcent">{progressPorcent || 0}%</span>
                    <div className="progress-bar">
                        <div className="bar-fill" style={{width: `${progressPorcent || 0}%`}}></div>
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
                                            const isProgress = progressList.find(p => p.nivel_id === level.nivel_id);
                                            let levelIndex = rowIndex * 5 + iInRow + 1;
                                            if (levelIndex == 1) levelClass = "start";
                                            if (level.nivel_id === levelsList[levelsList.length - 1]?.nivel_id) levelClass = "end";
                                            else if (rowIndex % 2 === 0) {
                                                levelClass = (iInRow === 4) ? "rowEnd0" : "mid0";
                                            } else {
                                                levelClass = (iInRow === 0) ? "rowEnd1" : "mid1";
                                            }

                                            return <Level key={level.nivel_id} levelName={level.titulo} completed={isProgress} styleClass={levelClass} levelId={level.nivel_id} levelIndex={levelIndex} iInRow={iInRow}/>
                                            //<i class="fa-solid fa-lock"></i>
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

function Level({ levelName, completed, styleClass, levelId, levelIndex, iInRow }) {
    const navigate = useNavigate();
    return (
        <div className="level" data-levelidx={levelIndex} data-iin={iInRow}>
            <div className={"level-name " + styleClass}>{levelName}</div>
            <div className={"level-circle " + styleClass} onClick={() => navigate("" + levelId)}>
                {completed
                    ? <i className="level-completed-icon fa-solid fa-check"></i>
                    : <i className="level-uncompleted-icon fa-solid fa-circle"></i>
                }
            </div>
        </div>
    )
}
