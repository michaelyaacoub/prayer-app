import { useState } from "react";
import supabase from "../supabase";


function PrayerBox({ list, setList }) {
    const [isUpdateing, setIsUpdating] = useState(false);
    const isPriority = (list.praying + list.hug + 2) < list.liked_prayer;
    async function handleVotes(columnName) {
        setIsUpdating(true)
        const { data: updatedVote, error } = await supabase
            .from("prayer_request")
            .update({ [columnName]: list[columnName] + 1 })
            .eq("id", list.id)
            .select()

        console.log(updatedVote)
        if (!error)
            setList((lists) => lists.map((l) => (l.id === list.id ?
                updatedVote[0] : l))
            )
    }
    return (
        <ul>
            <li className="list-requests">
                <div className="box">
                    <div className="post-details">
                        <div style={{ fontFamily: "Sono" }}>
                            <p><span>From: </span>{list.userName}</p>
                            <p><span>Posted on: </span>{list.date}</p>
                        </div>
                        <p><span className="hashtag">#</span>{list.requestType}</p>
                    </div>
                    <p>
                        {isPriority ? <span className="priority-tag">[❗️PRIORITY]</span> : null}
                        {list.message}
                    </p>
                    <div className="vote-buttons">
                        <button
                            onClick={() => handleVotes("liked_prayer")}
                            disabled={isUpdateing}>👍 {list.liked_prayer}</button>
                        <button
                            onClick={() => handleVotes("praying")}
                            disabled={isUpdateing}
                        >🙏 {list.praying}</button>
                        <button
                            onClick={() => handleVotes("hug")}
                            disabled={isUpdateing}
                        >🤗 {list.hug}</button>
                    </div>
                    <div className="prayer-tags">
                        <li className="tag">{list.category}</li>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default PrayerBox;