import React, { useEffect, useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLessonForm(){
    const [nivelID, setNivelID] = useState(1);
    const [orden, setOrden] = useState(1);
    const [contenido, setContenido] = useState("");  
    
    const [levels, setLevels] = useState([]);
    const [courses, setCourses] = useState([]);
        useEffect(() => {
            // Función para obtener los cursos desde el backend
            const fetchCoursesAndLevels = async () => {
                let response = await fetch("https://holobooks-6to-fp-be.onrender.com/get/levels", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Error al obtener los cursos");
                }
                let data = await response.json(); // Convertir la respuesta a JSON
                setLevels(data); // Guardar los cursos en el estado
                if (data.length > 0) {
                    setNivelID(data[0].curso_id); // Establece el curso inicial solo si hay datos
                }

                response = await fetch("https://holobooks-6to-fp-be.onrender.com/get/course", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Error al obtener los cursos");
                }
                data = await response.json(); // Convertir la respuesta a JSON
                setCourses(data); // Guardar los cursos en el estado
            };
    
            fetchCoursesAndLevels(); // Llamar a la función para obtener los cursos
        }, []);

    const handleAddReg = async (e) => {
        e.preventDefault();
        
        if(!(nivelID < 1 || orden < 1 || contenido.trim() == "")){
            try {
                const response = await fetch('https://holobooks-6to-fp-be.onrender.com/add/lesson', {
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
                    if(errorData.message == "ER_NO_REFERENCED_ROW_2") alert("No existe el elemento referenciado");
                    else alert("Ha ocurrido un error: " + errorData.message);
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
                        <select name="levelCursoID" id="levelCursoID" onChange={(e) => setNivelID(e.target.value)}>
                            {
                                (levels.length != 0 && courses.length != 0) ? (
                                    levels.map(level => (
                                        <option key={level.nivel_id} value={level.nivel_id}>
                                            {level.titulo + " (" + courses.find(course => course.curso_id == level.curso_id).titulo + ")"}
                                        </option>
                                    ))) : ""
                                }
                        </select>
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