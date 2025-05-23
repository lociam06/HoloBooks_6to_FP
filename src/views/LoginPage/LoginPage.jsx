import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
import CusNav from "../../componets/CusNav/CusNav";
import { useState } from "react";

function LoginPage() {
    //Elimina la sesion
    localStorage.removeItem("userToken");

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    //login
    const [LEmail, setLEmail] = useState('');
    const [LPassword, setLPassword] = useState('');
    
    //Register
    const [RName, setRName] = useState('');
    const [REmail, setREmail] = useState('');
    const [RPassword, setRPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("try handle");
        try {
            // Realizar la solicitud HTTP con fetch
            const response = await fetch('https://holobooks-6to-fp-be.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({LEmail, LPassword,}),
            });

            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const data = await response.json();
                const token = data;
                // Guardar el token en localStorage
                localStorage.setItem("userToken", JSON.stringify(token));
                // Redirigir al dashboard u otra página
                navigate("/");
            } else {
                const errorData = await response.json();
                alert("Usuario o contraseña incorrecta");
                throw new Error(errorData.message || "Login failed");
            }            
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if(RName.trim() == "" || REmail.trim() == "" || RPassword.trim() == ""){
            alert("Complete los campos");
            return;
        }
        
        try {
            const response = await fetch('https://holobooks-6to-fp-be.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RName, REmail, RPassword,}),
            });

            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                // Redirigir al dashboard u otra página
                //navigate("/");
                alert("registrado dique");
            } else {
                const errorData = await response.json();
                if(errorData.message == "ER_DUP_ENTRY") {
                    alert("Ese usuario ya existe");
                    return;
                }
                throw new Error(errorData.message || "Register failed");
            }
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <section id="login-page">
            <header>
                <CusNav />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, facere ipsum veniam distinctio eos eligendi voluptatem facilis vel tempora qui, illo consectetur maxime corrupti beatae voluptate quas repellendus amet ipsam.
            </header>
            <main id="mainLoginPage">
                <section id="container">
                    <div id="loginCont" className="formCont">
                        <form action="/login" id="loginForm">
                            <h2>Iniciar Sesión</h2>
                            <div>
                                <label htmlFor="emailInput">Correo</label>
                                <input 
                                    type="text" 
                                    name="emailInput" 
                                    id="logEmailInput" 
                                    placeholder="Correo" 
                                    value={LEmail}
                                    onChange={(e) => setLEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="passwordInput" 
                                    id="logPasswordInput" 
                                    placeholder="Contraseña" 
                                    value={LPassword}
                                    onChange={(e) => setLPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" onClick={handleLogin}>Enviar</button>
                        </form>
                    </div>
                    <div id="registreCont" className="formCont">
                        <form action="/register" id="registreForm">
                            <h2>Registro</h2>
                            <div>
                                <label htmlFor="userNameInput">Nombre de Usuario</label>
                                <input type="text" name="userNameInput" id="regUserNameInput" placeholder="Nombre de Usuario" onChange={(e) => setRName(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="emailInput">Correo</label>
                                <input type="text" name="emailInput" id="regEmailInput" placeholder="Correo" onChange={(e) => setREmail(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Contraseña</label>
                                <input type="password" name="passwordInput" id="regPasswordInput" placeholder="Contraseña" onChange={(e) => setRPassword(e.target.value)} required/>
                            </div>
                            <button type="submit" onClick={handleRegister}>Enviar</button>
                        </form>
                    </div>

                    <SwitchableElemnt />
                </section>
            </main>
        </section>
    )
}

function SwitchableElemnt() {
    const [activeForm, setActiveForm] = useState("loginForm");
    const [switchableStyles, setSwitchableStyles] = useState({
        transform: "translateX(0)",
        borderRadius: "0 30px 30px 0"
    });

    const switchForm = () => {
        setActiveForm((prevForm) => {
            if (prevForm == "loginForm") {
                setSwitchableStyles({
                    transform: "translateX(-100%)",
                    borderRadius: "30px 0 0 30px"
                });
                return "singUpForm"
            } else if (prevForm == "singUpForm") {
                setSwitchableStyles({
                    transform: "translateX(0)",
                    borderRadius: "0 30px 30px 0"
                });
                return "loginForm"
            }
        });
    }
    return (
        <div id="switchable" style={switchableStyles}>
            {activeForm == "loginForm" 
                ?<h2>!Bienvenido de nuevo, amigo!</h2>
                :<h2>!Bienvenido a HOLOBOOKS!</h2>
            }
            <p>La mejor pagina para aprender a programar</p>
            <button id="switch-form-btn" onClick={switchForm} style={{fontFamily:"Cantarell", fontWeight:"bold", fontSize:"1rem"}}>
            {activeForm == "loginForm" 
                ?"Registrarse"
                :"Iniciar Sesión"
            }
            </button>
        </div>
    )
}

export default LoginPage;