import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "./conectionDB.js";
const db = connection;
import {} from "dotenv/config";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

app.get("/", (req, res) => {
	res.send("Servidor funcionando");
});

app.get("/login", (req, res) => {
	res.send("Login disque funcionando");
});

// Endpoint para login
app.post("/login", (req, res) => {
	const { LEmail, LPassword } = req.body;
	// Buscar usuario en la base de datos
	db.query('SELECT * FROM usuarios WHERE email = ?', [LEmail], async (err, results) => {
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
		const isPasswordValid = LPassword == user.password;
		if (!isPasswordValid) {
			return res.status(401).send({ message: 'Invalid password' });
		}
		// Generar token
		res.send({ message: 'Login successful'});
	});
});

app.post("/register", (req, res) => {
	const { RName, REmail, RPassword } = req.body;
	// Buscar usuario en la base de datos
	db.query("INSERT INTO usuarios(tipo_usuario, nombre, email, password) VALUES('estudiante', ?, ?, ?)", [RName, REmail, RPassword], async (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: err.code });
		}
		console.log("si: ", results);
		res.status(201).send({ message: "User registered successfully" });
		console.log("Registro exitoso");
	});
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

//Para el fetch de los cursos
app.get("/courses", (req, res) => {
	const { filial } = req.query;

	if(!filial){
		return res.status(400).json({ error: "Falta el parámetro 'filial'" });
	}

	if(filial){
		db.query("SELECT * FROM cursos WHERE filial = ?", [filial], async (err, results) => {
			if(err){
				res.status(500).json({ error: "Error al obtener los cursos" });
			}else{
				res.send(results);
			}
		});
	}
});



























//-----------------------------Keily isn't the best
app.post("/add/course", (req, res) => {
	const { titulo, descripcion, duracion } = req.body;
	// Buscar usuario en la base de datos
	db.query("INSERT INTO cursos(titulo, descripcion, duracion) VALUES(?, ?, ?)", [titulo, descripcion, duracion], async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}
		res.status(201).send({ message: "registered successfully" });
	});
});

app.post("/add/level", (req, res) => {
	const { titulo, cursoID, orden, duracion } = req.body;
	// Buscar usuario en la base de datos
	db.query("INSERT INTO niveles(titulo, curso_id, orden, duracion) VALUES(?, ?, ?, ?)", [titulo, cursoID, orden, duracion], async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}
		res.status(201).send({ message: "registered successfully" });
	});
});

app.post("/add/lesson", (req, res) => {
	const { nivelID, orden, contenido } = req.body;
	// Buscar usuario en la base de datos
	db.query("INSERT INTO lecciones(nivel_id, orden, contenido) VALUES(?, ?, ?)", [nivelID, orden, contenido], async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}
		res.status(201).send({ message: "registered successfully" });
	});
});

//gets
app.get("/get/course", (req, res) => {
	// Buscar los cursos
	db.query("Select curso_id, titulo from cursos",async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}

		// Si no hay errores, devuelve los resultados de la consulta
		return res.status(200).json(results);
	});

});

app.get("/get/levels", (req, res) => {
	// Buscar los cursos
	db.query("Select nivel_id, curso_id, titulo from niveles",async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}

		// Si no hay errores, devuelve los resultados de la consulta
		return res.status(200).json(results);
	});

});