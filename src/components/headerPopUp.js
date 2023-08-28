import { useState} from "react";

function HeaderPopUp() {
    const [close, setClose] = useState(true);

    const HandleClose = () => {
        setClose(false)
    }
    return (
        close ? (
            <div className="pop-up">
                <button closebtn={close.toString()} onClick={HandleClose}>x</button>
                <p>This app does not collect any personl data or track any web activities!</p>
            </div>) : null
    )

}

export default HeaderPopUp;