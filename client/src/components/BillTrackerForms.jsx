import React, { useContext } from "react";
import { BillTrackerContext } from "./BillTrackerContextProvider";
import { UserContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

function BillTrackerForms() {
    const context = useContext(BillTrackerContext);

    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    function billTrackerSubmit(event) {
        event.preventDefault();
        userContext.addBillTracker(context.billTrackerForm);
        context.setBillTrackerForm({
            billName: "",
            amount: "",
            date: "",
            category: ""
        });

        navigate("/confirmation");
    }

    return (
        < div >
            <div>
                <h2 className="bill-text1">Add a Bill below</h2>
                <form className="form" onSubmit={billTrackerSubmit}>
                    <label className="form-title">Bill Name:</label>
                    <input
                        className="form-input"
                        placeholder="Bill Name"
                        name="billName"
                        onChange={context.billTrackerChanges}
                        value={context.billTrackerForm.billName}
                        required
                    />

                    <label className="form-title">Amount:</label>
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        onChange={context.billTrackerChanges}
                        value={context.billTrackerForm.amount}
                        required
                    />

                    <label className="form-title">Category:</label>
                    <select
                        className="form-input"
                        name="category"
                        onChange={context.billTrackerChanges}
                        value={context.billTrackerForm.category}
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
                        className="form-input"
                        type="date"
                        name="date"
                        onChange={context.billTrackerChanges}
                        value={context.billTrackerForm.date}
                        required
                    />

                    <button className="form-input">Add</button>
                </form>
            </div>
        </div >
    )
}
export default BillTrackerForms