import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLessonForm(){
    const [nivelID, setNivelID] = useState(1);
    const [orden, setOrden] = useState(1);
    const [contenido, setContenido] = useState("");    

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        if(!(nivelID < 1 || orden < 1 || contenido == "")){
            try {
                const response = await fetch('http://localhost:5000/add/lesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({nivelID, orden, contenido}),
                });
    
                if (response.ok) {
                    alert("Registrado");
                } else {
                    const errorData = await response.json();
                    alert("Ha ocurrido un error: " + errorData.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        else alert("Llene los campos con el valor correcto");
        
    };
    return(
        <>
            <CusNav></CusNav>
            <main className="creationFormContainer">
            <h1 className="form-title">Lecciones</h1>
                <form action="/add/lesson">
                    <div>
                        <label htmlFor="lessonNivel_ID">Nivel_ID</label>
                        <input type="number" id="lessonNivel_ID" name="lessonNivel_ID" min="1" value={nivelID} onChange={(e) => setNivelID(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="lessionOrden">Orden</label>
                        <input type="number" id="lessionOrden" name="lessionOrden" min="1" value={orden} onChange={(e) => setOrden(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="lessonContenido">Contenido</label>
                        <input type="text" id="lessonContenido" name="lessonContenido" value={contenido} onChange={(e) => setContenido(e.target.value)}/>
                    </div>
                    <button className="agregar-btn" type="submit" onClick={handleAddReg}>Agregar</button>
                </form>
            </main>
        </>
    )
}

export default CreateLessonForm;