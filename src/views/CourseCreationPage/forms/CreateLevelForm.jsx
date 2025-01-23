import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLevelForm(){
    const [titulo, setTitulo] = useState('');
    const [cursoID, setCursoID] = useState('');
    const [orden, setOrden] = useState('');
    const [duracion, setDuracion] = useState('');

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/add/level', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({titulo, cursoID, orden, duracion}),
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
            <h1 className="form-title">Nivel</h1>
                <form>
                    <div>
                        <label htmlFor="levelTitulo">Titulo</label>
                        <input type="text" id="levelTitulo" name="levelTitulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="levelCursoID">Curso_ID</label>
                        <input type="number" id="levelCursoID" name="levelCursoID" value={cursoID} onChange={(e) => setCursoID(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="levelOrden">Orden</label>
                        <input type="number" id="levelOrden" name="levelOrden" value={orden} onChange={(e) => setOrden(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="levelDuracion">Duracion</label>
                        <input type="number" id="levelDuracion" name="levelDuracion" value={duracion} onChange={(e) => setDuracion(e.target.value)}/>
                    </div>
                    <button className="agregar-btn" type="submit" onClick={handleAddReg}>Agregar</button>
                </form>
            </main>
        </>
    )
}

export default CreateLevelForm;