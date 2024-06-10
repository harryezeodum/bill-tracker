import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [editProfile, setEditProfile] = useState({});
    const [password, setPassword] = useState({});

    useEffect(() => {
        setPassword({
            password: userContext.user.password
        })
        setEditProfile({
            username: userContext.user.username,
            fullName: userContext.user.fullName,
            email: userContext.user.email,
            phoneNumber: userContext.user.phoneNumber
        })
    }, []);

    const [isEdit, setIsEdit] = useState(false);
    const [isPasswordEdit, setIsPasswordEdit] = useState(false);

    function editPassword() {
        setIsPasswordEdit(prev => !prev);
    }

    function cancelPasswordEdit() {
        setIsPasswordEdit(prev => !prev)
    }

    function editUser() {
        setIsEdit(prev => !prev);
    }

    function cancelEdit() {
        setIsEdit(prev => !prev)
    }

    function editProfileChanges(event) {
        const { name, type, checked, value } = event.target;
        setEditProfile(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function editPasswordChanges(event) {
        const { name, type, checked, value } = event.target;
        setPassword(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function updateProfile() {
        userContext.editProfileForm(userContext.user.username, editProfile);
        setIsEdit(prev => !prev);
    }

    function updatePassword() {
        userContext.editPassword(userContext.user.username, password);
        setIsPasswordEdit(prev => !prev);
    }

    return (
        <div>
            {!isEdit && !isPasswordEdit && <div className="signup">
                <span className="profile">Username: </span>
                <span>{userContext.user.username}</span> <br /> <br />

                <span className="profile">Member Since: </span>
                <span>{userContext.user.memberSince.slice(0, 10)}</span> <br /> <br />

                <span className="profile">Is an Admin User: </span>
                <span>{userContext.user.isAdmin ? "Yes" : "No"}</span> <br /> <br />

                <span className="profile">Full Name: </span>
                <span>{userContext.user.fullName}</span> <br /> <br />

                <span className="profile">Email: </span>
                <span>{userContext.user.email}</span> <br /> <br />

                <span className="profile">Phone Number: </span>
                <span>{userContext.user.phoneNumber}</span> <br /> <br />


                <button onClick={editUser}>Edit Profile</button> <button onClick={editPassword}>Edit Password</button>
            </div>}

            {isPasswordEdit && <form className="signup">
                <label className="form-title">Password:</label> <br />
                <input
                    className="form-input"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={editPasswordChanges}
                    value={password.password}
                    required
                /> <br />

                <button onClick={updatePassword}>Update Password</button> <button onClick={cancelPasswordEdit}>Cancel</button>
            </form>}

            {isEdit && <form className="signup">
                <label className="form-title">UserName:</label> <br />
                <input
                    className="form-input"
                    name="username"
                    onChange={editProfileChanges}
                    value={editProfile.username}
                    required
                    readOnly
                /> <br />

                <label className="form-title">Full Name:</label> <br />
                <input
                    className="form-input"
                    name="fullName"
                    onChange={editProfileChanges}
                    value={editProfile.fullName}
                    required
                    readOnly
                /> <br />

                <label className="form-title">Email:</label> <br />
                <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    onChange={editProfileChanges}
                    value={editProfile.email}
                    required
                /> <br />

                <label className="form-title">Phone Number:</label> <br />
                <input
                    className="form-input"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={editProfileChanges}
                    value={editProfile.phoneNumber}
                    required
                />

            </form>}
            {isEdit && <div className="editform-button">
                <button onClick={updateProfile}>Update Profile</button> <button onClick={cancelEdit}>Cancel</button>
            </div>}
        </div>
    )
}
export default Profile