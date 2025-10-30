async function logInProcess() {
    if (validateLoginInputs()) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const divToast = document.getElementById("toast-div")
    const msgToast = document.getElementById("toast-msg")

    const loginData = {
        email: email,
        password: password
    };

    await fetch('/auth/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                divToast.style.display = "block"
                divToast.style.color = "#fe5151"
                msgToast.textContent = "The log in failed, please try again."
                return
            }
            divToast.style.display = "block"
            divToast.style.backgroundColor = "#02a702"
            msgToast.textContent = "The log in was successful, redirecting to main page."

            setTimeout(() => {
                window.location.href = "index.html"
            }, 2000)
        })
}

function ensureErrorSpan(id, container) {
    let span = document.getElementById(id);
    if (span) return span;
    span = container.querySelector('#' + id);
    if (span) return span;
    span = document.createElement('span');
    span.className = 'error-msg';
    span.id = id;
    container.insertBefore(span, container.firstChild);
    return span;
}

function validateLoginInputs() {
    let hasError = false;
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const emailContainer = emailInput ? (emailInput.closest('.input-div') || emailInput.parentElement) : document.body;
    const passwordContainer = passwordInput ? (passwordInput.closest('.input-div') || passwordInput.parentElement) : document.body;

    const errorEmail = ensureErrorSpan('error-email-login', emailContainer);
    const errorPassword = ensureErrorSpan('error-password-login', passwordContainer);

    errorEmail.textContent = '';
    errorPassword.textContent = '';

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailInput || emailInput.value.trim().length === 0) {
        errorEmail.textContent = 'Email is required.';
        hasError = true;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        errorEmail.textContent = 'Email is not valid.';
        hasError = true;
    }

    if (!passwordInput || passwordInput.value.length === 0) {
        errorPassword.textContent = 'Password is required.';
        hasError = true;
    }

    return hasError;
}

const buttonLogIn = document.getElementById('login-button')
if (buttonLogIn) buttonLogIn.addEventListener("click", logInProcess)
