import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { UserContext } from "./UserContextProvider";

function BillTrackerList() {
    const userContext = useContext(UserContext);

    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const currentDate = moment();

    function billTrackerDetail(id) {
        navigate(`/allbilltrackers/${id}`);
    }

    const allBillTrackers = userContext.userState.billtracker.map((billtracker, index) => {
        return [
                <li className="" key={index} onClick={() => billTrackerDetail(billtracker._id)}>
                    <span className="due"><strong>{moment(billtracker.date).diff(currentDate, "days") < 0 ? `${Math.abs(moment(billtracker.date).diff(currentDate, "days"))} days Past Due` : `Due ${moment(billtracker.date).fromNow()}`}</strong></span>
                    <h3>{billtracker.billName}</h3>
                    <span> <strong>${billtracker.amount}</strong> </span>  <hr />
                </li> 
        ]
    });

    useEffect(() => {
        userContext.getAllBillTrackers();
    }, []);

    return (
        <div>
            <div className="billtrackerlist">
                <h2 className="welcome">Welcome {userContext.userState.user.username.toUpperCase()}!</h2>
                {allBillTrackers.length > 0 && <h2 className="billtracker-title">All Bill Trackers</h2>}
                <ol>
                    {allBillTrackers.length > 0 ? allBillTrackers : <h2>There is currently no user bill tracker.</h2>}
                </ol>
            </div>
        </div>
    )
}
export default BillTrackerList