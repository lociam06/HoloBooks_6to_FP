//libraries
import { Routes, Route } from "react-router-dom"

//Vista protegida elemento
import ProtectedView from "./componets/ProtectedView/ProtectedView.jsx";

//view
import HoloBooksMainPage from "./views/HoloBooksMainPage/HoloBooksMainPage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import FaqPage from "./views/FaqPage/FaqPage.jsx";
import AddCoursePage from "./views/AddCoursePage/AddCoursePage.jsx";
import CourseCreationPage from "./views/CourseCreationPage/CourseCreationPage.jsx";
import CreateCourseForm from "./views/CourseCreationPage/forms/CreateCourseForm.jsx";
import CreateLevelForm from "./views/CourseCreationPage/forms/CreateLevelForm.jsx";
import CreateLessonForm from "./views/CourseCreationPage/forms/CreateLessonForm.jsx";
import CoursesSelectionPage from "./views/CoursesSelectionPage/CoursesSelectionPage.jsx";
import CourseSelector from "./componets/CourseComponents/CourseSelector/CourseSelector.jsx"
import CoursePage from "./views/CoursePage/CoursePage.jsx";
import AddCourseSelectPage from "./views/AddCoursePage/AddCourseSelectPage/AddCourseSelectPage.jsx";
import CourseLevelDevPage from "./views/AddCoursePage/AddCourseSelectPage/CourseLessonsDevPage/CourseLevelDevPage.jsx";
import CourseSelectorPage from "./views/CourseSelectorPage/CourseSelectorPage.jsx";
import LevelSelectorPage from "./views/LevelSelectorPage/LevelSelectorPage.jsx";

//imagenes


//styles
import './App.css';

function App() {
	return (
		<div className="Aplicacion">
			<Routes>
				{/*El login*/}
				<Route path="/" element={<HoloBooksMainPage />} />
				<Route path="/login-page" element={<LoginPage />} />
				<Route path="/faq-page" element={<FaqPage />} />

				<Route path="/add-course-page" element={<AddCoursePage />} />
    			<Route path="/add-course-page/:filialName" element={<AddCourseSelectPage />} />
    			<Route path="/add-course-page/:filialName/:course_id" element={<CourseLevelDevPage />} />

				{/*Pagianas de los cursos*/}
				<Route path="/course-page/:filialName" element={<CoursePage />}></Route>				
				<Route path="/course-selection-page" element={<CoursesSelectionPage />}></Route>

				{/*Paginas de selecion de cursos*/}
				<Route path="/course-selector-page/:filial/" element={<ProtectedView><CourseSelectorPage /></ProtectedView>}></Route>
				{/*Pagina de seleccion de niveles*/}	
				<Route path="/course-selector-page/:filial/:courseId" element={<ProtectedView><LevelSelectorPage /></ProtectedView>}></Route>


				{/*----------Lo de Keily-------------------*/}
				<Route path="/course-creation-page" element={<CourseCreationPage />} />
				<Route path="/course-creation-page/courses" element={<CreateCourseForm />} />
				<Route path="/course-creation-page/levels" element={<CreateLevelForm />} />
				<Route path="/course-creation-page/lessons" element={<CreateLessonForm />} />
				<Route path="/course-selector" element={<CourseSelector />} />
			</Routes>
		</div>
	);
}

export default App;