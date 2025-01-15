function LoginPage(){
    return(
        <>
            <main>
                <section id="container">
                    <div id="loginCont">
                        <form action="" id="loginForm">
                            <h2>Login</h2>
                            <div>
                                <label htmlFor="emailInput">Email</label>
                                <input type="text" name="emailInput" id="logEmailInput" placeholder="Email"/>
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Password</label>
                                <input type="text" name="passwordInput" id="logPasswordInput" placeholder="Password"/>
                            </div>
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                    <div id="registreCont">
                        <form action="" id="loginForm">
                        <h2>Login</h2>
                            <div>
                                <label htmlFor="userNameInput">Name</label>
                                <input type="text" name="userNameInput" id="regUserNameInput" placeholder="Name"/>
                            </div>
                            <div>
                                <label htmlFor="emailInput">Email</label>
                                <input type="text" name="emailInput" id="regEmailInput" placeholder="Email"/>
                            </div>
                            <div>
                                <label htmlFor="passwordInput">Password</label>
                                <input type="text" name="passwordInput" id="regPasswordInput" placeholder="Password"/>
                            </div>
                            <button type="submit">Sing up</button>
                        </form>
                    </div>

                    <div id="switchable">

                    </div>
                </section>
            </main>
        </>
    )
}

export default LoginPage;