import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import HoloBooksMainPage from "./views/HoloBooksMainPage/HoloBooksMainPage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import './App.css';

function App() {
	return (
		<div className="Aplicacion">
			<Routes>
				<Route path="/" element={<HoloBooksMainPage />} />
				<Route path="login-page" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;