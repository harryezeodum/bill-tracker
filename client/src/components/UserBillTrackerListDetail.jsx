import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function UserBillTrackerListDetail() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        userContext.getUserBillTrackers();
    }, [])

    const { billTrackerId } = useParams();

    const foundBillTracker = userContext?.userState?.billtracker?.find(billtracker => billtracker._id === billTrackerId);
    console.log(foundBillTracker);

    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        setEditForm({
            billName: foundBillTracker?.billName,
            amount: foundBillTracker?.amount,
            category: foundBillTracker?.category,
            date: foundBillTracker?.date
        });
    }, [foundBillTracker])

    const [isEdit, setIsEdit] = useState(false);

    function editForms() {
        setIsEdit(prev => !prev);
    }

    function cancelForm() {
        setIsEdit(prev => !prev)
    }

    function editFormChanges(event) {
        const { name, type, checked, value } = event.target;
        setEditForm(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function updateBillTracker() {
        userContext.editBillTrackerForm(foundBillTracker._id, editForm);
        setIsEdit(prev => !prev);
    }

    function deleteBillTracker() {
        userContext.deleteBillTracker(foundBillTracker._id);
    }

    if (!foundBillTracker) {
    return <div></div>
}

    return (
        <div>
            {!isEdit && <div className="billtrackerlistdetail">
                <span><strong>Bill Name:</strong></span> <span className="billtrackerlistdetail-text">{foundBillTracker?.billName}</span> <br /> <br />
                <span><strong>Amount:</strong></span> <span className="billtrackerlistdetail-text">${foundBillTracker?.amount}</span> <br /> <br />
                <span><strong>Category:</strong></span> <span className="billtrackerlistdetail-text">{foundBillTracker?.category}</span> <br /> <br />
                <span><strong>Date:</strong></span> <span className="billtrackerlistdetail-text">{foundBillTracker?.date}</span> <br /> <br />
                <button onClick={editForms}>Edit Bill</button> <button onClick={deleteBillTracker}>Delete Bill</button>
            </div>}

            {isEdit && <form className="form">
                <label className="form-title">Bill Name:</label>
                <input
                    placeholder="Bill Name"
                    name="billName"
                    value={editForm.billName}
                    onChange={editFormChanges}
                    className="form-input"
                    required
                />

                <label className="form-title">Amount:</label>
                <input
                    placeholder="Amount"
                    name="amount"
                    value={editForm.amount}
                    type="number"
                    onChange={editFormChanges}
                    className="form-input"
                    required
                />

                <label className="form-title">Category:</label>
                <select
                    name="category"
                    onChange={editFormChanges}
                    value={editForm.category}
                    className="form-input"
                    required
                >
                    <option value="">---Choose---</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Internet and Cable">Internet and Cable</option>
                    <option value="Auto">Auto</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Sport/Gym">Sport/Gym</option>
                    <option value="Electric/Gas">Electric/Gas</option>
                    <option value="Insurance">Insurance</option>
                </select>

                <label className="form-title">Date:</label>
                <input
                    placeholder="Date"
                    name="date"
                    value={editForm.date}
                    type="date"
                    onChange={editFormChanges}
                    className="form-input"
                    required
                />

            </form>}

            {isEdit && <div className="editform-button">
                <button onClick={updateBillTracker}>Update Bill</button> <button onClick={cancelForm}>Cancel</button>
            </div>}

        </div>
    )
}
export default UserBillTrackerListDetail