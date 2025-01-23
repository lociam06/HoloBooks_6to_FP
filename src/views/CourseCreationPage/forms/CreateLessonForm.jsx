import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLessonForm(){
    const [nivelID, setNivelID] = useState('');
    const [orden, setOrden] = useState('');
    const [contenido, setContenido] = useState('');    

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/add/lesson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nivelID, orden, contenido}),
            });

            if (response.ok) {
                alert("registrado dique");
            } else {
                const errorData = await response.json();
                if(errorData.message == "ER_DUP_ENTRY") {
                    alert("Ese usuario ya existe");
                    return;
                }
                throw new Error(errorData.message || "Register failed");
            }
        } catch (err) {
            alert(err.message);
        }
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