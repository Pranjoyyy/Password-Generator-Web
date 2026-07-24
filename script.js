const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

lengthValue.textContent = lengthSlider.value;

// Update slider value
lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = this.value;
});

// Generate password
function generatePassword() {

    const length = Number(lengthSlider.value);

    const includeNumbers = document.getElementById("numbers").checked;

    const includeSymbols = document.getElementById("symbols").checked;

    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) {
        characters += "0123456789";
    }

    if (includeSymbols) {
        characters += "!@#$%^&*()_+-=[]{}<>?";
    }

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    document.getElementById("password").value = password;

    checkStrength(password);
}

// Password strength
function checkStrength(password) {

    const fill = document.getElementById("strengthFill");

    const text = document.getElementById("strength");

    if (password.length < 10) {

        fill.style.width = "33%";

        fill.style.background = "#ff3b30";

        text.innerHTML = "🔴 Weak";

    }

    else if (password.length < 16) {

        fill.style.width = "66%";

        fill.style.background = "#ffd60a";

        text.innerHTML = "🟡 Medium";

    }

    else {

        fill.style.width = "100%";

        fill.style.background = "#30d158";

        text.innerHTML = "🟢 Strong";

    }
}

// Copy password
function copyPassword() {

    const password = document.getElementById("password");

    if (password.value === "") {

        return;
    }

    navigator.clipboard.writeText(password.value);

    const msg = document.getElementById("copiedMessage");

    msg.style.display = "block";

    setTimeout(function () {

        msg.style.display = "none";

    }, 2000);

}

// Show / Hide Password
function togglePassword() {

    const password = document.getElementById("password");

    const icon = document.querySelector(".fa-eye, .fa-eye-slash");

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}

// Press Enter to generate
document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        generatePassword();

    }

});

// Generate one password automatically
window.onload = generatePassword;