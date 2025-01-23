import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import HoloBooksMainPage from "./views/HoloBooksMainPage/HoloBooksMainPage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import FaqPage from "./views/FaqPage/FaqPage.jsx";
import CourseCreationPage from "./views/CourseCreationPage/CourseCreationPage.jsx";
import CreateCourseForm from "./views/CourseCreationPage/forms/CreateCourseForm.jsx";
import CreateLevelForm from "./views/CourseCreationPage/forms/CreateLevelForm.jsx";
import CreateLessonForm from "./views/CourseCreationPage/forms/CreateLessonForm.jsx";
import WebIndex from "./views/WebIndex/WebIndex.jsx";
import CodeIndex from "./views/CodeIndex/CodeIndex.jsx";
import DbaseIndex from "./views/DbaseIndex/DbaseIndex.jsx";
import './App.css';

function App() {
	return (
		<div className="Aplicacion">
			<Routes>
				<Route path="/" element={<HoloBooksMainPage />} />
				<Route path="/login-page" element={<LoginPage />} />
				<Route path="/faq-page" element={<FaqPage />} />

				<Route path="/course-creation-page" element={<CourseCreationPage />} />
				<Route path="/course-creation-page/courses" element={<CreateCourseForm />} />
				<Route path="/course-creation-page/levels" element={<CreateLevelForm />} />
				<Route path="/course-creation-page/lessons" element={<CreateLessonForm />} />

				<Route path="web-index" element={<WebIndex />} />
				<Route path="code-index" element={<CodeIndex />} />
				<Route path="dbase-index" element={<DbaseIndex />} />
			</Routes>
		</div>
	);
}

export default App;