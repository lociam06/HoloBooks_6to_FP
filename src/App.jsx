import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import HoloBooksMainPage from "./views/HoloBooksMainPage/HoloBooksMainPage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import FaqPage from "./views/FaqPage/FaqPage.jsx";
import WebIndex from "./views/WebIndex/WebIndex.jsx";
import CodeIndex from "./views/CodeIndex/CodeIndex.jsx";
import DbaseIndex from "./views/DbaseIndex/DbaseIndex.jsx";
import './App.css';

function App() {
	return (
		<div className="Aplicacion">
			<Routes>
				<Route path="/" element={<HoloBooksMainPage />} />
				<Route path="login-page" element={<LoginPage />} />
				<Route path="faq-page" element={<FaqPage />} />
				<Route path="web-index" element={<WebIndex />} />
				<Route path="code-index" element={<CodeIndex />} />
				<Route path="dbase-index" element={<DbaseIndex />} />
			</Routes>
		</div>
	);
}

export default App;