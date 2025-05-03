import React, { useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CourseCreationPage(){
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState(1);    

    const handleAddReg = async (e) => {
        e.preventDefault();
        if(!(titulo.trim() == "" || descripcion.trim() == "" || duracion < 1)){
            try {
                const response = await fetch('https://holobooks-6to-fp-be.onrender.com/add/course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({titulo, descripcion, duracion}),
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