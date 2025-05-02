import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "./conectionDB.js";
import multer from "multer";
const db = connection;
import { } from "dotenv/config";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

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
		console.log("Sin problemas dique")
		res.send(user);
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

//Para el fetch de los cursos
app.get("/courses", (req, res) => {
	const { filial } = req.query;

	if (!filial) {
		return res.status(400).json({ error: "Falta el parámetro 'filial'" });
	}

	if (filial) {
		db.query("SELECT * FROM cursos WHERE filial = ?", [filial], async (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).json({ error: "E un toyasoooo carasooo no sirvee" });
			} else {
				res.send(results);
			}
		});
	}
});

//Fetch de las niveles de un curso
app.get("/levels", (req, res) => {
	const { course_id } = req.query;

	if (!course_id) {
		return res.status(400).json({ error: "Falta el parámetro 'course_id'" });
	}

	if (course_id) {
		db.query("SELECT * FROM niveles WHERE curso_id = ?", [course_id], async (err, results) => {
			if (err) {
				res.status(500).json({ error: "E un toyasoooo carasooo no sirvee" });
			} else {
				res.send(results);
			}
		});
	}
});

//fetch de las lecciones
app.get("/lessons", async (req, res) => {
	const { course_id, level_id } = req.query;

	if (!course_id && !level_id) {
		return res.status(400).json({ error: "Se requiere un paramtro de consulta" });
	}

	if (level_id) {
		const query = `SELECT * FROM lecciones WHERE nivel_id = ?`;
		db.query(query, [level_id], async (err, results) => {
			if (err) {
				res.status(500).json({ error: "E un toyasoooo carasooo no sirvee" });
			} else {
				res.send(results);
			}
		});
	}

	if (course_id) {
		const query = `
            SELECT lecciones.*
			FROM lecciones
			JOIN niveles lv ON lecciones.nivel_id = lv.nivel_id
			WHERE lv.curso_id = ?;
        `;
		db.query(query, [course_id], async (err, results) => {
			if (err) {
				res.status(500).json({ error: "E un toyasoooo carasooo no sirvee" });
			} else {
				res.send(results);
			}
		});
	}
});

app.get("/progress", (req, res) => {
	const { course_id, user_id } = req.query;

	if (!course_id) {
		return res.status(400).json({ error: "Falta el parámetro 'course_id'" });
	}

	const query = `
		SELECT progreso.*, cursos.curso_id, niveles.nivel_id FROM progreso
		join niveles on progreso.nivel_id = niveles.nivel_id
		join cursos on cursos.curso_id = niveles.curso_id
		WHERE cursos.curso_id = ?
		AND progreso.usuario_id = ?
	`
	if (course_id) {
		db.query(query, [course_id, user_id], async (err, results) => {
			if (err) {
				res.status(500).json({ error: "E un toyasoooo carasooo no sirvee" });
			} else {
				res.send(results);
			}
		});
	}
});

//Updates
//lecciones
app.post("/update/lesson", (req, res) => {
	const { lesson_id, content } = req.body;

	if (!lesson_id) {
		return res.status(400).json({ error: "Falta el parámetro 'lesson_id'" });
	}

	if (lesson_id) {
		db.query("UPDATE lecciones SET contenido = ? WHERE lecciones.leccion_id = ?", [content, lesson_id], async (err, results) => {
			if (err) {
				res.status(500).json({ error: "Error al modificar la leccion" });
			} else {
				res.send(results);
			}
		});
	}
});


//---------------Subir imagenes------------------
const logoStorage = multer.diskStorage({
	destination: "./public/CourseLogos/",
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		console.log(req.body.fileName);
		const fileName = req.body.fileName;
		cb(null, fileName + extension);
	}
});
const upload = multer({ storage: logoStorage });

app.post('/upload-course-image', upload.single("image"), (req, res) => {
	if (!req.file) {
		return res.status(400).send('No imagen');
	}
	res.send(`Imagen subida correctamente: /imagenes/${req.file.filename}"`);
});

app.post("/add/course", (req, res) => {
	const { titulo, descripcion, filial, imageName } = req.body;
	// Agregar curso a la base de datops
	db.query("INSERT INTO cursos(titulo, descripcion, filial, imagen) VALUES(?, ?, ?, ?)", [titulo, descripcion, filial, imageName], async (err, results) => {
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

app.post("/add/progress", (req, res) => {
	const { userId, levelId } = req.body;
	// Buscar usuario en la base de datos
	db.query("INSERT INTO progreso(usuario_id, nivel_id) VALUES(?, ?)", [userId, levelId], async (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: err.code });
		}
		console.log("si: ", results);
		res.status(201).send({ message: "Progreso" });
		console.log("Registro exitoso");
	});
});


//gets
app.get("/get/course", (req, res) => {
	// Buscar los cursos
	db.query("Select curso_id, titulo from cursos", async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}
		// Si no hay errores, devuelve los resultados de la consulta
		return res.status(200).json(results);
	});

});

app.get("/get/levels", (req, res) => {
	// Buscar los cursos
	db.query("Select nivel_id, curso_id, titulo from niveles", async (err, results) => {
		if (err) {
			return res.status(500).send({ message: err.code });
		}

		// Si no hay errores, devuelve los resultados de la consulta
		return res.status(200).json(results);
	});

});