import { useState } from "react";
import supabase from "../supabase";



export const prayerFilter = [
    { name: "Healing" },
    { name: "Cancer" },
    { name: "Provision" },
    { name: "Human Trafficing" },
    { name: "Peace" },
    { name: "Wisdom" },
    { name: "Courage" },
    { name: "Spiritual Life" },
    { name: "Marriage" },
];

export const requestOptions = [
    { request: "Prayer Request" },
    { request: "Praise Report" }
]

function PrayerRequestForm({ setLists, setCloseForm }) {
    const [userName, setUserName] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [requestType, setRequestType] = useState("");

    async function handleSubmit(e) {
        // 1. prevent page from reload
        e.preventDefault();
        // 2. data is valid ? create a new prayer request : display err msg
        if (userName && category && message && requestType) {
            // 3. upload prayer requests to supabase
            const { data: newPrayerRequest, error } = await supabase
                .from("prayer-app-db")
                .insert([{
                    userName,
                    requestType,
                    message,
                    category,
                    date: new Date().toISOString().split("T")[0],
                }])
                .select()
                .order('date', { descending: true });
            console.log(newPrayerRequest)
            // 4. add new prayer object to UI: add prayer to state
            if (!error)
                setLists((lists) => [newPrayerRequest[0], ...lists])
            // 5. reset input fields
            setUserName("");
            setCategory("");
            setMessage("");
            setRequestType("");

            // 6. close form
            setCloseForm(false);
        }
    }

    return (
        <form
            className="fill-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="First name:"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <select
                name="selection"
                id="selection"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option>Choose prayer category</option>
                {prayerFilter.map((filt) => (
                    <option
                        key={filt.name}
                        value={filt.name}
                    >
                        {filt.name.toUpperCase()}
                    </option>
                ))}
            </select>
            <textarea
                name="prayer"
                rows="1"
                cols="40"
                placeholder="Type your prayer request"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            >
            </textarea>
            <select name="selection" id=""
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
            >
                <option value="">Choose Prayer/Praise Catagory</option>
                {requestOptions.map((req) => (
                    <option
                        key={req.request}
                        value={req.request}
                    >
                        {req.request}
                    </option>
                ))}
            </select>
            <button id="submit-post" className="btn btn-large">Post Your Prayer</button>
        </form>
    );
}


export default PrayerRequestForm;
