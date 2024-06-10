import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const navigate = useNavigate();
    function back() {
        navigate(-1);
     }

    return (
        <div>
            <div className="bill-title">
                <h1>About Us</h1>
                <p className="bill-text">
                    At our company, we understand the importance of staying organized and in control of your finances. Our mission is to simplify your bill management process and empower you to take charge of your expenses effortlessly.

                    With our intuitive bill tracker, you can easily monitor your bills, track due dates, and manage payments all in one place. Whether you're managing household expenses, tracking business invoices, or simply staying on top of your personal finances, our platform offers the tools you need to stay organized and stress-free.

                    Backed by a team of dedicated professionals, we're committed to providing you with a seamless user experience and exceptional customer support every step of the way. Join thousands of satisfied users who rely on our company to streamline their bill management and achieve financial peace of mind.
                </p>
            </div>
        </div>
    )
}
export default AboutUs