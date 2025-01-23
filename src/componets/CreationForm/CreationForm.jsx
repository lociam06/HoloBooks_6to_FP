function CreationForm(){
    return(
        <>
            <main className="creationFormContainer">
                <form action="/createForm">
                    <div>
                        <label htmlFor="courseTitulo">Titulo</label>
                        <input type="text" id="courseTitulo" name="courseTitle"/>
                    </div>
                    <div>
                        <label htmlFor="courseDescription">Descripcion</label>
                        <input type="text" id="courseDescription" name="courseDescription"/>
                    </div>
                    <div>
                        <label htmlFor="">Duracion</label>
                        <input type="text" id="courseDuracion" name="courseDuracion"/>
                    </div>
                </form>
            </main>
        </>
    )
}

export default CreationForm;