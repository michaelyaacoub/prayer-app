console.log('Hi mom');
console.log("Hi dad");

// consts
const activateBtn = document.querySelector(".activate-btn");
const form = document.querySelector(".fill-form");
const postForm = document.getElementById("submit-post");
const msgBtn = document.querySelector(".pop-up");

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

