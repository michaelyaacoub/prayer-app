console.log('Hi mom');
console.log("Hi dad");

const activate_btn = document.querySelector(".activate-btn");
const form = document.querySelector(".fill-form");

activate_btn.addEventListener("click", function () {
    if (form.classList.contains("hide-form")) {
        form.classList.remove("hide-form");
        activate_btn.textContent = "Close";
        console.log('Form opened!')
    }
    else {
        form.classList.add("hide-form");
        console.log("Form closed!");
        activate_btn.textContent = "Share A Prayer";
    }
});

