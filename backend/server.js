import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "./conectionDB.js";
const db = connection;
import {} from "dotenv/config";

//const express = require("express");
//const cors = require('cors');
//const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const db = require('./conectionDB.js');
//require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Secret for JWT
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

app.get("/", (req, res) => {
	res.send("Servidor funcionando");
});

app.get("/login", (req, res) => {
	res.send("Login disque funcionando");
});

// Endpoint para login
app.post("/login", (req, res) => {
	const { email, password } = req.body;
	// Buscar usuario en la base de datos
	db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Error querying the database' });
		}

		if (results.length === 0) {
			console.log("Usuario no encontrado");
			return res.status(401).send({ message: 'User not found' });
		}

		const user = results[0];

		// Verificar contraseña
		const isPasswordValid = await password == user.password;
		if (!isPasswordValid) {
			return res.status(401).send({ message: 'Invalid password' });
		}

		console.log("Inicio");
		// Generar token
		res.send({ message: 'Login successful'});
	});
});

app.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	// Buscar usuario en la base de datos
	console.log(req.body);
	db.query("INSERT INTO usuarios(tipo_usuario, nombre, email, password) VALUES('estudiante', ?, ?, ?)", [name, email, password], async (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Error querying the database' });
		}

		res.status(201).send({ message: "User registered successfully" });
		console.log("Registro exitoso");
	});
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});