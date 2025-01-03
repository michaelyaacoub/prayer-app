import { useState, useEffect } from "react";

function HeaderPopUp() {
    const [close, setClose] = useState(true);

    // Use `useEffect` to set a timer for closing the pop-up
    useEffect(() => {
        const timer = setTimeout(() => {
            setClose(false); // Close the pop-up after 5 seconds
        }, 3000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only once

    const HandleClose = () => {
        setClose(false); // Manual close when the button is clicked
    };

    return (
        close ? (
            <div className="pop-up">
                <button onClick={HandleClose}>x</button>
                <p>This app does not collect any personal data or track any web activities!</p>
            </div>
        ) : null
    );
}

export default HeaderPopUp;
