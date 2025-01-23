import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CourseCreationPage(){
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');    

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/add/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({titulo, descripcion, duracion}),
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
    }

    return(
        <>
            <CusNav></CusNav>
            <main className="creationFormContainer">
                <h1 className="form-title">Cursos</h1>
                <form action="/add/course">
                    <div>
                        <label htmlFor="courseTitulo">Titulo</label>
                        <input type="text" id="courseTitulo" name="courseTitle" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="courseDescripcion">Descripcion</label>
                        <input type="text" id="courseDescripcion" name="courseDescripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="courseDuracion">Duracion</label>
                        <input type="number" id="courseDuracion" name="courseDuracion" min="1" value={duracion} onChange={(e) => setDuracion(e.target.value)}/>
                    </div>
                    <button className="agregar-btn" type="submit" onClick={handleAddReg}>Agregar</button>
                </form>
            </main>
        </>
    )
}

export default CourseCreationPage;