import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

const BillTrackerContext = React.createContext();

function BillTrackerContextProvider(props) {
    const navigate = useNavigate();
    //const [billTrackerData, setBillTrackerData] = useState([{}]);
    const [billTrackerForm, setBillTrackerForm] = useState({
        billName: "",
        amount: "",
        date: "",
        category: ""
    });
    //const [billTrackerSubmit, setBillTrackerSubmit] = useState([]);

    function billTrackerChanges(event) {
        const { name, type, checked, value } = event.target;
        setBillTrackerForm((prev) => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    // function billTrackerSubmitForm(event) {
    //     event.preventDefault();
    //     axios.post("/api/billtracker", billTrackerForm)
    //         .then(response => {
    //             setBillTrackerSubmit(prev => {
    //                 return [
    //                     ...prev, response.data
    //                 ]
    //             })

    //             setBillTrackerForm({
    //                 billName: "",
    //                 amount: "",
    //                 date: "",
    //                 category: ""
    //             });
    //         })
    //         .catch(err => console.log(err))

    //     navigate("/confirmation");

    //     axios.get("/api/billtracker")
    //         .then(response => setBillTrackerData(response.data))
    //         .catch(err => console.log(err));
    // }

    // function editBillTrackerForm(id, update) {
    //     axios.put(`/api/billtracker/${id}`, update)
    //         .then(response => setBillTrackerForm(response.data))
    //         .catch(err => console.log(err));

    //     axios.get("/api/billtracker")
    //         .then(response => setBillTrackerData(response.data))
    //         .catch(err => console.log(err));

    //     navigate(`/allbilltrackers/${id}`);
    // }

    // function deleteBillTracker(id) {
    //     const deletedBillTracker = billTrackerSubmit.filter(billtracker => billtracker._id !== id)
    //     axios.delete(`/api/billtracker/${id}`)
    //         .then(response => setBillTrackerSubmit(deletedBillTracker))
    //         .catch(err => console.log(err))

    //     navigate("/allbilltrackers");

    //     axios.get("/api/billtracker")
    //         .then(response => setBillTrackerData(response.data))
    //         .catch(err => console.log(err));
    // }

    // useEffect(() => {
    //     axios.get("/api/billtracker")
    //         .then(response => setBillTrackerData(response.data))
    //         .catch(err => console.log(err));
    // }, [])
    //console.log(billTrackerData);

    return (
        <BillTrackerContext.Provider value={{
            billTrackerForm,
            billTrackerChanges,
            setBillTrackerForm
        }}>
            {props.children}
        </BillTrackerContext.Provider>
    )
}
export { BillTrackerContext, BillTrackerContextProvider }