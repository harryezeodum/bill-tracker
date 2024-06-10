import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContextProvider";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

function UserBillTracker() {
    const userContext = useContext(UserContext);

    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const currentDate = moment();

    function userBillTrackerDetail(id) {
        navigate(`/userbilltracker/${id}`);
        userContext.getUserBillTrackers();
    }

    const allBillTrackers = userContext.userState.billtracker.map((billtracker, index) => {
        return [
            <div>
                <li className="" key={index} onClick={() => userBillTrackerDetail(billtracker._id)}>
                    <span className="due"><strong>{moment(billtracker.date).diff(currentDate, "days") < 0 ? `${Math.abs(moment(billtracker.date).diff(currentDate, "days"))} days Past Due` : `Due ${moment(billtracker.date).fromNow()}`}</strong></span>
                    <h3>{billtracker.billName}</h3>
                    <span> <strong>${billtracker.amount}</strong> </span>
                </li> <hr />
            </div>
        ]
    });

     useEffect(() => {
        userContext.getUserBillTrackers();
    }, []);

    return (
        < div >
            <div className="billtrackerlist">
                <Link to="/addbill"><button className="button">Add a New Bill Tracker</button></Link>
                <h2 className="welcome">Welcome {userContext.userState.user.username.toUpperCase()}!</h2>
                <h3> Click on each bill to see more details or the button at the top left to add a new bill</h3>
                {allBillTrackers.length > 0 && <h2 className="billtracker-title">{userContext.userState.user.username.toUpperCase()}'s Bill Tracker{allBillTrackers.length === 1 ? "" : "s"}</h2>}
                <ol>
                    {allBillTrackers.length > 0 ? allBillTrackers : <h2>You currently do not have any bill to track, please Add a new bill.</h2>}
                </ol>
            </div>
        </div >
    )
}
export default UserBillTracker