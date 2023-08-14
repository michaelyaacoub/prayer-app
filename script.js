console.log('Hi mom');
console.log("Hi dad");


const dataRequests = [
    {
        user_name: "Michael",
        date: "08-07-2023",
        request_type: "Prayer Request",
        request_text: "Pray for my roommate Craig, he has stage 4 cancer and has been fighting cancer for the past 2 years. Just pray that God may be glorfied and heal him and he goes cancer free.",
        category: ["Cancer", "Healing", "Courage", "Peace"]
    },
    {
        user_name: "Diana",
        date: "08-11-2023",
        request_type: "Praise report",
        request_text: "Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances.",
        category: ["Peace", "Joy"]
    },
    {
        user_name: "Ryan",
        date: "08-12-2023",
        request_type: "Prayer Request",
        request_text: "My mom's cousin died on the 4th of July, and her mom has been a huge support. Her mom’s cousin’s parents are still alive, so pray for everyone involved and potential drama.",
        category: ["Peace", "Support", "Courage"]
    }
];


// DOM elements.
const activateBtn = document.querySelector(".activate-btn");
const form = document.querySelector(".fill-form");
const postForm = document.getElementById("submit-post");
const msgBtn = document.querySelector(".pop-up");
const requestList = document.querySelector(".request-list");

// Creating DOM element to render requests in the list.
requestList.innerHTML = ""


// Show/hide form.
activateBtn.addEventListener("click", () => {
    if (form.classList.contains("hide-form")) {
        form.classList.remove("hide-form");
        activateBtn.textContent = "Close";
        console.log('Form opened!');
    }
    else {
        form.classList.add("hide-form");
        console.log("Form closed!");
        activateBtn.textContent = "Share A Prayer";
    }
});

// Post form message
postForm.addEventListener("click", (e) => {
    e.preventDefault()
    postForm.textContent = "Thank you for submiting this request, We will review it and it should be posted within minutes."
})

// Hide footer message.
msgBtn.addEventListener("click", () => {
    msgBtn.classList.add("fade-out");
    // Hide message after fade-out
    msgBtn.addEventListener("animationend", () => {
        msgBtn.remove();
    });
});


createPostRquestList(dataRequests);

function createPostRquestList(dataArray) {
    const htmlContent = dataArray.map(
        (request) =>
            `<li class="box">
                <div class="post-details">
                    <div style="font-family: Sono;">
                        <p><span>From: </span>${request.user_name}</p>
                        <p><span>Posted on: </span>${request.date}</p>
                    </div>
                    <p><span class="hashtag">#</span>${request.request_type}</p>
                </div>
                <p>
                    ${request.request_text}
                </p>
                <div class="prayer-tags">
                    <span class="tag">${request.category}</span>
                </div>
            </li>
            `);

    const htmlElments = htmlContent.join("");
    requestList.insertAdjacentHTML("afterbegin", htmlElments);

};