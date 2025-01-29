import React, { useEffect, useState } from "react";
import CusNav from "../../../componets/CusNav/CusNav";
import "./formsStyles.css";

function CreateLevelForm(){
    
    const [titulo, setTitulo] = useState('');
    const [cursoID, setCursoID] = useState(1);
    const [orden, setOrden] = useState(1);
    const [duracion, setDuracion] = useState(1);
    
    const [courses, setCourses] = useState([]); // Estado para almacenar los cursos
    useEffect(() => {
        // Función para obtener los cursos desde el backend
        const fetchCourses = async () => {
            const response = await fetch("http://localhost:5000/get/course", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Error al obtener los cursos");
            }
            const data = await response.json(); // Convertir la respuesta a JSON
            setCourses(data); // Guardar los cursos en el estado
            if (data.length > 0) {
                setCursoID(data[0].curso_id); // Establece el curso inicial solo si hay datos
            }
        };

        fetchCourses(); // Llamar a la función para obtener los cursos
    }, []);
    
    const handleAddReg = async (e) => {
        e.preventDefault();
        
        if(!(titulo.trim() == "" || cursoID < 1 || orden < 1 || duracion < 1)){
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
                    if(errorData.message == "ER_NO_REFERENCED_ROW_2") alert("No existe el elemento referenciado");
                    else alert("Ha ocurrido un error: " + errorData.message);
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
                        <label htmlFor="levelCursoID">Curso</label>
                        <select name="levelCursoID" id="levelCursoID" onChange={(e) => setCursoID(e.target.value)}>
                            {courses.map(course => (
                                <option key={course.curso_id} value={course.curso_id}>
                                    {course.titulo}
                                </option>
                            ))}
                        </select>
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