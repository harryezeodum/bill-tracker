import React, {useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function Home() {
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.logoutTimer();
    }, []);

    return (
        <div>
            <div className="bill-title">
                <h1>Welcome to our Bill Tracker Homepage</h1>
                <p className="bill-text">Your ultimate tool for managing your finances effortlessly! Stay organized and in control of your expenses with our intuitive interface. Easily track your bills, set reminders, and monitor your spending all in one convenient place. Say goodbye to missed payments and hello to financial peace of mind. Start managing your bills smarter today!</p>
            </div>
            <p className="bill-more-text">Please <Link to="/login"><strong className="confirmation-link"> login</strong></Link> to access your bills or <Link to="/signup"><strong className="confirmation-link"> signup</strong></Link> to create an account</p>
            <h2 className="bill-more-text">Admins login <Link to="/adminlogin"><strong className="confirmation-link"> Here</strong></Link></h2>
        </div>
    )
}

export default Home