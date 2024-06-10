import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const navigate = useNavigate();
    function back() {
        navigate(-1);
     }

    return (
        <div>
            <div className="contact">
                <span><strong>Email:</strong></span> <span>abcdefg@aol.com</span> <br /> <br />
                <span><strong>Phone:</strong></span> <span>+1 (123) 456 7890</span> <br /> <br />
                <span><strong>Address:</strong></span> <br />
                <span>123 Main Street</span> <br />
                <span>Houston, TX 77002</span> <br />
                <span>United States</span>
            </div>
        </div>
    )
}
export default Contact