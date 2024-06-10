import React, { useContext, useState } from "react";
import { UserContext } from "./UserContextProvider"

function Login() {
    const userContext = useContext(UserContext);
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });

    if (loginForm.username === "" && loginForm.password === "") {
        userContext.setErrMsg("");
    }

    function loginOnChangeForm(event) {
        const { name, type, checked, value } = event.target;
        setLoginForm((prev) => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function login(event) {
        event.preventDefault();
        userContext.login(loginForm);
    }

    return (
        <div>
            <form className="signup" onSubmit={login}>
                {userContext.errMsg && <p className="error">{userContext.errMsg}</p>}
                <label className="form-title">UserName:</label> <br />
                <input
                    className="form-input"
                    placeholder="Enter Username"
                    name="username"
                    onChange={loginOnChangeForm}
                    value={loginForm.username}
                    required
                /> <br />

                <label className="form-title">Password:</label> <br />
                <input
                    type="password"
                    className="form-input"
                    placeholder="Enter Password"
                    name="password"
                    onChange={loginOnChangeForm}
                    value={loginForm.password}
                    required
                /> <br />

                <button className="form-input">Login</button>
            </form>

        </div>
    )
}
export default Login