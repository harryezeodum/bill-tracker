import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

function UserContextProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        billtracker: []
    };
    let timer;

    const [userState, setUserState] = useState(initState);
    const [errMsg, setErrMsg] = useState("");
    const [allUser, setAllUser] = useState({
        users: JSON.parse(localStorage.getItem("users")) || []
    });
    const navigate = useNavigate();

    function adminSignup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(response => {
                console.log(response.data);
                navigate("/allusers");
                getAllBillTrackers();
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function signup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(response => {
                const { user, token, isAdmin } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setUserState(prevUser => {
                    return {
                        ...prevUser, user, token
                    }
                })

                if (token && !isAdmin) {
                    //logoutTimer();
                    navigate("/profile");
                    getUserBillTrackers();
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function adminLogin(credentials) {
        axios.post("/api/auth/login", credentials)
            .then(response => {
                const { user, token, user: { isAdmin } } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setUserState(prevUser => {
                    return {
                        ...prevUser, user, token
                    }
                })
                if (token && isAdmin) {
                    //logoutTimer();
                    getAllBillTrackers();
                    getAllUsers();
                    navigate("/profile");
                }
                else {
                    setUserState({
                        token: ""
                    })
                    setErrMsg("You are not an Admin, please login as a standard user");
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function login(credential) {
        axios.post("/api/auth/login", credential)
            .then(response => {
                const { user, token, user: { isAdmin } } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setUserState(prevUser => {
                    return {
                        ...prevUser, user, token
                    }
                })
                if (token && !isAdmin) {
                    //logoutTimer();
                    navigate("/profile");
                    getUserBillTrackers();
                }
                else {
                    setUserState({
                        token: ""
                    })
                    setErrMsg("Please login as Admin on home page");
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function logoutTimer() {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            timer = setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("users");

                setUserState({
                    user: {},
                    token: "",
                    billtracker: []
                });

                navigate("/");
            }, 15000);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("users");

        setUserState({
            user: {},
            token: "",
            billtracker: []
        });

        clearTimeout(timer);
        
    }

    function getAllUsers() {
        userAxios.get("/api/auth/allusers")
            .then(response => {
                const { users } = response.data;
                localStorage.setItem("users", JSON.stringify(users));
                setAllUser(prev => {
                    return {
                        ...prev, users
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserBillTrackers() {
        userAxios.get("/api/billtracker/user")
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, billtracker: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getUserBillTracker(id) {
        userAxios.get(`/api/billtracker/${id}`)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, billtracker: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getUser(username) {
        userAxios.get(`/api/auth/allusers/${username}`)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getAllBillTrackers() {
        userAxios.get("/api/billtracker")
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, billtracker: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addBillTracker(billtracker) {
        userAxios.post("/api/billtracker", billtracker)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, billtracker: [...prev.billtracker, response.data]
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg));
    }

    function editBillTrackerForm(id, update) {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        userAxios.put(`/api/billtracker/${id}`, update)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, billtracker: prev.billtracker.map(bill => bill._id === id ? response.data : bill)
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        if (token && !user.isAdmin) {
            getUserBillTrackers();
            navigate(`/userbilltracker/${id}`);
        }
        else if (token && user.isAdmin) {
            getAllBillTrackers();
            navigate(`/allbilltrackers/${id}`);
        }
    }

    function editProfileForm(username, update) {
        userAxios.put(`/api/auth/allusers/${username}`, update)
            .then(response => {
                getUser(username);
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        navigate("/profile");
    }

    function editPassword(username, update) {
        userAxios.put(`/api/auth/password/${username}`, update)
            .then(response => {
                getUser(username);
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        navigate("/profile");
    }

    function deleteBillTracker(id) {
        userAxios.delete(`/api/billtracker/${id}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        getUserBillTrackers();
        navigate("/userbilltracker");
    }

    function deleteUser(username) {
        userAxios.delete(`/api/auth/allusers/${username}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        getAllUsers();
        navigate("/allusers");
    }

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            addBillTracker,
            adminSignup,
            adminLogin,
            setErrMsg,
            getUserBillTrackers,
            getAllBillTrackers,
            editBillTrackerForm,
            deleteBillTracker,
            getAllUsers,
            getUser,
            getUserBillTracker,
            editProfileForm,
            deleteUser,
            editPassword,
            logoutTimer,
            allUser,
            errMsg,
            userState
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }