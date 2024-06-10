import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BillTrackerForms from "./components/BillTrackerForms";
import Confirmation from "./components/Confirmation";
import BillTrackerList from "./components/BillTrackerList";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Login from "./components/Login";
import UserBillTracker from "./components/UserBillTracker";
import AdminSignUp from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import UserBillTrackerListDetail from "./components/UserBillTrackerListDetail";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import AllUsers from "./components/AllUsers";
import BillTrackerListDetail from "./components/BillTrackerListDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./components/UserContextProvider";
import { useIdleTimer } from "react-idle-timer";

function App() {
  const userContext = useContext(UserContext);
  // const onIdle = () => {
  //   console.log("Fires after 10 seconds");
  //   userContext.logout();
  // }

  // const { isIdle } = useIdleTimer({
  //   onIdle,
    // timeout: 1000 * 60 * 20,
    // promptBeforeIdle: 5,
    // events: [
    //   'mousemove',
    //   'keydown',
    //   'wheel',
    //   'DOMMouseScroll',
    //   'mousewheel',
    //   'mousedown',
    //   'touchstart',
    //   'touchmove',
    //   'MSPointerDown',
    //   'MSPointerMove',
    //   'visibilitychange',
    //   'focus'
    // ],
    // immediateEvents: [],
    // debounce: 0,
    // throttle: 0,
    // eventsThrottle: 200,
    // element: document,
    // startOnMount: true,
    // startManually: false,
    // stopOnIdle: false,
    // crossTab: false,
    // name: 'idle-timer',
    // syncTimers: 0,
    // leaderElection: false
  //});

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProtectedRoute token={!userContext.userState.token} reDirect="/">
          <Home />
        </ProtectedRoute>} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/addbill" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <BillTrackerForms />
        </ProtectedRoute>} />

        <Route path="/confirmation" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <Confirmation />
        </ProtectedRoute>} />


        <Route path="/allbilltrackers" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <BillTrackerList />
        </ProtectedRoute>} />

        <Route path="/userbilltracker/:billTrackerId" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <UserBillTrackerListDetail />
        </ProtectedRoute>} />

        <Route path="/allbilltrackers/:billTrackerId" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <BillTrackerListDetail />
        </ProtectedRoute>} />

        <Route path="/userbilltracker" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <UserBillTracker />
        </ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <Profile />
        </ProtectedRoute>} />

        <Route path="/allusers" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <AllUsers />
        </ProtectedRoute>} />

        <Route path="/adminsignup" element={<ProtectedRoute token={userContext.userState.token} reDirect="/profile">
          <AdminSignUp />
        </ProtectedRoute> } />

      </Routes>
    </div>
  )
}

export default App
