import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./CourseSelectorPage.css"

export default function CourseSelectorPage(){
    console.log(localStorage.getItem("userToken"));
    const navigate = useNavigate();
    const [ coursesList, setCoursesList ] = useState([]);
    const { filial } = useParams();
    const initialCourseDescription = {
        CourseId: 0,
        Name: "Nombre del curso",
        Description: "Descripcion del curso Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus doloribus repudiandae nisi voluptatum eligendi libero dolores laboriosam, laudantium dolore, harum enim aperiam animi reprehenderit. Iste sequi voluptatem itaque quas.",
        CodeExample: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    }
    const [ courseDescriptionContent, setCourseDescriptionContent ] = useState(initialCourseDescription);

    useEffect(() => {
        fetch(`https://holobooks-6to-fp-be.onrender.com/courses?filial=${filial}`)
            .then((response) => {
                if(!response.ok){
                    console.log("ha ocurido un errror");
                    return;
                }else{
                    return response.json();
                }
            })
            .then((data) => {
                setCoursesList(data);
                console.log(data)
                setCourseDescriptionContent({
                    CourseId: data[0].curso_id,
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
    const [ courseImg, setCourseImg ] = useState(course.imagen);
    function handleCourseCardClick(){
        setCourseDescription({
            CourseId: course.curso_id,
            Name: course.titulo,
            Description: course.descripcion,
            CodeExample: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione animi quae esse atque, facilis deleniti itaque, minus laborum et autem distinctio sequi. Architecto voluptates ipsum facilis nobis enim, omnis pariatur."
        });
    }
    return(
        <div className="courseCard" onClick={() => handleCourseCardClick()}>
            <img src={`/CourseLogos/${courseImg}`} alt="" onError={() => setCourseImg(`no_course_logo.png`)}/>
            {/*<img src={`https://cdn.pixabay.com/photo/2018/05/08/21/37/html5-3384039_1280.png`} alt="" />*/}
        </div>
    )
}

function CourseDescription({ courseDescriptionContent, courseId }){
    const navigate = useNavigate()
    const { filial } = useParams();
    const styles = {
        background: `linear-gradient(45deg, var(--${filial}_light), var(--${filial}_dark))`,
    }
    const colorStyle = {color: `var(--${filial}_mid)`}
    return(
        <section className="courseDescription" style={styles}>
            <img className="filialIcon" src={`/icons/${filial}Book_white.png`} alt="" />
            <div className="courseDescription_content">
                <h1>{ courseDescriptionContent.Name }</h1>
                <p className="courseDescription_text">
                    { courseDescriptionContent.Description}
                </p>
                <code className="codeExample" style={colorStyle}>
                    { courseDescriptionContent.CodeExample}
                </code>
            </div>
            <div className="courseDescription_StartBtn">
                <button onClick={() => navigate(`/course-selector-page/${filial}/${courseDescriptionContent.CourseId}`)} style={colorStyle}>Empezar</button>
            </div>
        </section>
    )
}