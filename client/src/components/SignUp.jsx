import React, { useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";

function SignUp() {
    const userContext = useContext(UserContext);
    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        phoneNumber: ""
    });

    if (signupForm.username === "" && signupForm.password === "") {
        userContext.setErrMsg("");
    }

    function signupOnChangeForm(event) {
        const { name, type, checked, value } = event.target;
        setSignupForm((prev) => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function signup(event) {
        event.preventDefault();
        userContext.signup(signupForm);
    }

    return (
        <div>
             <form className="signup" onSubmit={signup}>
                {userContext.errMsg && <p className="error">{userContext.errMsg}</p>}
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

                <label className="form-title">Full Name:</label> <br />
                <input
                    className="form-input"
                    placeholder="Full Name"
                    name="fullName"
                    onChange={signupOnChangeForm}
                    value={signupForm.fullName}
                    required
                /> <br />

                <label className="form-title">Email:</label> <br />
                <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    onChange={signupOnChangeForm}
                    value={signupForm.email}
                    required
                /> <br />

                <label className="form-title">Phone Number:</label> <br />
                <input
                    className="form-input"
                    placeholder="(XXX)-XXX-XXXX"
                    name="phoneNumber"
                    onChange={signupOnChangeForm}
                    value={signupForm.phoneNumber}
                    required
                /> <br />

                <button className="form-input">Sign up</button>
            </form>

        </div>
    )
}
export default SignUp