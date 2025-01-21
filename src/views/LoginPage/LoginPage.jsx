import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
import CusNav from "../../componets/CusNav/CusNav";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    //login
    const [LEmail, setLEmail] = useState('');
    const [LPassword, setLPassword] = useState('');
    
    //Register
    const [RName, setRName] = useState('');
    const [REmail, setREmail] = useState('');
    const [Rpassword, setRPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("try handle");
        try {
            // Realizar la solicitud HTTP con fetch
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({LEmail, LPassword,}),
            });

            // Verificar si la respuesta fue exitosa
            console.log(response.ok);
            if (response.ok) {
                // Redirigir al dashboard u otra página
                console.log("Si dique");
                navigate("/");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            const { token } = data;

            // Guardar el token en localStorage
            localStorage.setItem("token", token);
            setMessage("Login successful!");
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("try Reg");
        try {
            // Realizar la solicitud HTTP con fetch
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RName, REmail, Rpassword,}),
            });

            // Verificar si la respuesta fue exitosa
            console.log(response.ok);
            if (response.ok) {
                // Redirigir al dashboard u otra página
                console.log("Si dique");
                navigate("/");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Register failed");
            }
        } catch (err) {
            setMessage(err.message);
        }
    };
    return (
        <>
            <header>
                <CusNav />
            </header>
            <main id="mainLoginPage">
                <section id="container">
                    <div id="loginCont" className="formCont">
                        <form action="/login" id="loginForm">
                            <h2>Log in</h2>
                            <div>
                                <label htmlFor="emailInput">Email</label>
                                <input 
                                    type="text" 
                                    name="emailInput" 
                                    id="logEmailInput" 
                                    placeholder="Email" 
                                    value={LEmail}
                                    onChange={(e) => setLEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Password</label>
                                <input 
                                    type="text" 
                                    name="passwordInput" 
                                    id="logPasswordInput" 
                                    placeholder="Password" 
                                    value={LPassword}
                                    onChange={(e) => setLPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" onClick={handleLogin}>Log in</button>
                        </form>
                    </div>
                    <div id="registreCont" className="formCont">
                        <form action="/register" id="registreForm">
                            <h2>Sin up</h2>
                            <div>
                                <label htmlFor="userNameInput">Name</label>
                                <input type="text" name="userNameInput" id="regUserNameInput" placeholder="Name" onChange={(e) => setRName(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="emailInput">Email</label>
                                <input type="text" name="emailInput" id="regEmailInput" placeholder="Email" onChange={(e) => setREmail(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Password</label>
                                <input type="text" name="passwordInput" id="regPasswordInput" placeholder="Password" onChange={(e) => setRPassword(e.target.value)} required/>
                            </div>
                            <button type="submit" onClick={handleRegister}>Sing up</button>
                        </form>
                    </div>

                    <SwitchableElemnt />
                </section>
            </main>
        </>
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
        console.log(activeForm);

    }
    return (
        <div id="switchable" style={switchableStyles}>
            <h2>HELLO, friend!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button id="switch-form-btn" onClick={switchForm}>Hola</button>
        </div>
    )
}

export default LoginPage;