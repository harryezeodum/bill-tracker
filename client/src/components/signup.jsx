import React, { useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";

function SignUp() {
    const userContext = useContext(UserContext);
    const [signupForm, setSignupForm] = useState({
        username: "",
        password: ""
    });

    function signupOnChangeForm(event) {
        const { name, type, checked, value } = event.target;
        setSignupForm((prev) => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function signUp(event) {
        event.preventDefault();
        userContext.signup(signupForm);
    }

    return (
        <div>
            <form className="signup" onSubmit={signUp}>
                { userContext.errMsg && <p className="error">{userContext.errMsg}</p>}
                <label className="form-title">UserName:</label> <br />
                <input
                    className="form-input"
                    placeholder="Enter Username"
                    name="username"
                    onChange={signupOnChangeForm}
                    value={signupForm.username}
                    required
                /> <br />

                <label className="form-title">Password:</label> <br />
                <input
                    type="password"
                    className="form-input"
                    placeholder="Enter Password"
                    name="password"
                    onChange={signupOnChangeForm}
                    value={signupForm.password}
                    required
                /> <br />

                <button className="form-input">Sign up</button>
            </form>

        </div>
    )
}
export default SignUp