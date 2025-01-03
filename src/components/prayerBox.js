import { useState } from "react";
import supabase from "../supabase";

function PrayerBox({ list, setLists }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [userReactions, setUserReactions] = useState({
        liked_prayer: false,
        praying: false,
        hug: false,
    });

    const isPriority = (list.praying + list.hug + 2) < list.liked_prayer;

    async function handleVotes(columnName) {
        // Prevent reacting multiple times
        if (userReactions[columnName]) {
            alert("You have already reacted!");
            return;
        }

        setIsUpdating(true);

        const { data: updatedVote, error } = await supabase
            .from("prayer-app-db")
            .update({ [columnName]: list[columnName] + 1 })
            .eq("id", list.id)
            .select();

        if (error) {
            console.error("Error updating votes:", error);
            alert("Failed to update reaction. Please try again.");
        } else {
            console.log("Updated vote:", updatedVote);

            // Update the local state with the new data
            setLists((lists) =>
                lists.map((l) => (l.id === list.id ? updatedVote[0] : l))
            );

            // Mark this reaction as completed
            setUserReactions((prev) => ({ ...prev, [columnName]: true }));
        }

        setIsUpdating(false);
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
                            disabled={isUpdating || userReactions.liked_prayer}>
                            👍 {list.liked_prayer}
                        </button>
                        <button
                            onClick={() => handleVotes("praying")}
                            disabled={isUpdating || userReactions.praying}>
                            🙏 {list.praying}
                        </button>
                        <button
                            onClick={() => handleVotes("hug")}
                            disabled={isUpdating || userReactions.hug}>
                            🤗 {list.hug}
                        </button>
                    </div>
                    <div className="prayer-tags">
                        <li className="tag">{list.category}</li>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default PrayerBox;
