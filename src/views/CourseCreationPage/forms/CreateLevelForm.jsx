import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLevelForm(){
    const [titulo, setTitulo] = useState('');
    const [cursoID, setCursoID] = useState(1);
    const [orden, setOrden] = useState(1);
    const [duracion, setDuracion] = useState(1);

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        if(!(titulo == "" || cursoID < 1 || orden < 1 || duracion < 1)){
            try {
                const response = await fetch('http://localhost:5000/add/level', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({titulo, cursoID, orden, duracion}),
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
    }    
        
    
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
                        <input type="number" id="levelCursoID" name="levelCursoID" min="1" value={cursoID} onChange={(e) => setCursoID(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="levelOrden">Orden</label>
                        <input type="number" id="levelOrden" name="levelOrden" min="1" value={orden} onChange={(e) => setOrden(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="levelDuracion">Duracion</label>
                        <input type="number" id="levelDuracion" name="levelDuracion" min="1" value={duracion} onChange={(e) => setDuracion(e.target.value)}/>
                    </div>
                    <button className="agregar-btn" type="submit" onClick={handleAddReg}>Agregar</button>
                </form>
            </main>
        </>
    )
}

export default CreateLevelForm;