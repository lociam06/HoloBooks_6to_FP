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
                            //console.log((levelIndex % 5) == 0) levelClass = "rowEnd0");
                            for(let i = 1; i <= 100; i++){
                                console.log("indice: " + i)
                                console.log(Math.trunc((i - 1) / 5) % 2);
                            }
                            console.log("level index: " + levelIndex)
                            console.log(Math.trunc(levelIndex / 5) % 2);
                            if(levelIndex == 1) levelClass = "start";
                            if(Math.trunc(levelIndex / 5) % 2 == 0){
                                if((levelIndex % 5) == 0) levelClass = "rowEnd0";
                                else levelClass = "mid0";
                                //console.log("level index: " + levelIndex)
                                //console.log(levelIndex % 5);
                            }
                            levelIndex++;
                            return <Level key={level.nivel_id} levelName={level.titulo} completed="" styleClass={levelClass}/>
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
            <div className={"level-name " + styleClass}>{ levelName }</div>
            <div className={"level-circle " + styleClass}>
                {completed
                    ? <i className="level-completed-icon fa-solid fa-check"></i>
                    : <i className="level-uncompleted-icon fa-solid fa-circle"></i>
                }
            </div>
        </div>
    )
}
