import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function Confirmation() {
    const userContext = useContext(UserContext);

    return (
        <div>
            <div className="confirmation">
                <p>
                    Thank you for choosing our website for your financial management needs. Should you have any questions or feedback, please don't hesitate to reach out to our support team. We're here to assist you every step of the way. <span>Please click on <Link to="/userbilltracker"><strong className="confirmation-link"> My Bill Trackers</strong></Link> to see a list of Bills.</span>
                </p>
            </div>
        </div>
    )
}

export default Confirmation