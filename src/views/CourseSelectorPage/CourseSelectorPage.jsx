import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./CourseSelectorPage.css"

export default function CourseSelectorPage(){
    const navigate = useNavigate();
    const [ coursesList, setCoursesList ] = useState([]);
    const { filial } = useParams();
    const initialCourseDescription = {
        Name: "Nombre del curso",
        Description: "Descripcion del curso Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus doloribus repudiandae nisi voluptatum eligendi libero dolores laboriosam, laudantium dolore, harum enim aperiam animi reprehenderit. Iste sequi voluptatem itaque quas.",
        CodeExample: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    }
    const [ courseDescriptionContent, setCourseDescriptionContent ] = useState(initialCourseDescription);

    useEffect(() => {
        fetch(`http://localhost:5000/courses?filial=${filial}`)
            .then((response) => {
                if(!response.ok){
                    console.log("ha ocuurido un errror");
                    return;
                }else{
                    return response.json();
                }
            })
            .then((data) => {
                setCoursesList(data);
                console.log(data)
                setCourseDescriptionContent({
                    Name: data[0].titulo,
                    Description: data[0].descripcion,
                    CodeExample: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione animi quae esse atque, facilis deleniti itaque, minus laborum et autem distinctio sequi. Architecto voluptates ipsum facilis nobis enim, omnis pariatur."
                });
            })
        }, []);

    return(
        <section id="courseSelectorPage_body">
            <header>
                {/*Navbar*/}
            </header>
            <main>
                <aside>
                    <i className="fa-solid fa-arrow-left" onClick={() => navigate("/course-page/" + filial)}></i>
                    {
                        coursesList.map((course) => {
                            return <CouseCard key={course.curso_id} setCourseDescription={setCourseDescriptionContent} course={course}/>
                        })
                    }
                </aside>
                <CourseDescription courseDescriptionContent={courseDescriptionContent}/>
            </main>
        </section>
    )
}

function CouseCard({ setCourseDescription, course }){
    function handleCourseCardClick(){
        setCourseDescription({
            Name: course.titulo,
            Description: course.descripcion,
            CodeExample: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione animi quae esse atque, facilis deleniti itaque, minus laborum et autem distinctio sequi. Architecto voluptates ipsum facilis nobis enim, omnis pariatur."
        });
    }
    return(
        <div className="courseCard" onClick={() => handleCourseCardClick()}>
            <img src={`../../../public/CourseLogos/${course.imagen}`} alt="" />
            {/*<img src={`https://cdn.pixabay.com/photo/2018/05/08/21/37/html5-3384039_1280.png`} alt="" />*/}
        </div>
    )
}

function CourseDescription({ courseDescriptionContent }){
    const [ file, setFile ] = useState(null);
    const handleFileChange = (event) => {
        console.log(event.target);
        const selectedFile = event.target.files[0];
        if(selectedFile){
            setFile(selectedFile);
        }
    }
    return(
        <section className="courseDescription">
            <img className="filialIcon" src="../../../public/icons/webBook_white.png" alt="" />
            <div className="courseDescription_content">
                <h1>{ courseDescriptionContent.Name }</h1>
                <p className="courseDescription_text">
                    { courseDescriptionContent.Description}
                </p>
                <code className="codeExample">
                    { courseDescriptionContent.CodeExample}
                </code>
            </div>
            <div className="courseDescription_StartBtn">
                <button>Empezar</button>
            </div>
        </section>
    )
}