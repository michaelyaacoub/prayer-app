import React from "react";
import { lists } from "./prayerList";

const DBR = () => {
    let dbr = "";
    if (lists.length === 0) {
        dbr = <p>No requests under this category yet!</p>;
    } else if (lists.length === 1) {
        dbr = <p>There is <span style={{ color: "#36e338", fontWeight: "600" }}>{lists.length}</span> request in the database...</p>;
    } else {
        dbr = <p>There are total of <span style={{ color: "#36e338", fontWeight: "600" }}>{lists.length}</span> requests in the database...</p>;
    }

    return (
        <div>
            {dbr}
            {/* Other component content */}
        </div>
    );
}

export default DBR;




//  {/* dbr --> databaseReport
//             "let's have a route: something like prayer.com/dbr"
//         */}
//     {/* <p>There are {dataRequests.length} Prayer requests and 5 Praise reports in the database.</p> */ }