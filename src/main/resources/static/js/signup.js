async function signUpProcess(){
    
    if (validateSignUpInputs()) {
        return;
    }

    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const password = document.getElementById("password").value
    const divToast = document.getElementById("toast-div")
    const msgToast = document.getElementById("toast-msg")

    const signupData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
    }

    await fetch('auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(response => {
        if (!response.ok) {
            divToast.style.display = "block"
            divToast.style.color = "#fe5151"
            msgToast.textContent = "The sign up failed, redirecting to main page."
            console.log("There was a problem with the register of the hotel, redirecting to main page.")

            setTimeout(() => {
                window.location.href = "index.html"
            }, 2000)
            return
        }
        divToast.style.display = "block"
        divToast.style.backgroundColor = "#02a702"
        msgToast.textContent = "The sign up was successful, redirecting to login page."

        setTimeout(() => {
            window.location.href = "login.html"
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

function validateSignUpInputs() {
    let hasError = false;

    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    const firstNameContainer = firstNameInput ? (firstNameInput.closest('.input-div') || firstNameInput.parentElement) : document.body;
    const lastNameContainer = lastNameInput ? (lastNameInput.closest('.input-div') || lastNameInput.parentElement) : document.body;
    const emailContainer = emailInput ? (emailInput.closest('.input-div') || emailInput.parentElement) : document.body;
    const phoneContainer = phoneInput ? (phoneInput.closest('.input-div') || phoneInput.parentElement) : document.body;
    const passwordContainer = passwordInput ? (passwordInput.closest('.input-div') || passwordInput.parentElement) : document.body;

    const errorFirst = ensureErrorSpan('error-first-name', firstNameContainer);
    const errorLast = ensureErrorSpan('error-last-name', lastNameContainer);
    const errorEmail = ensureErrorSpan('error-email-signup', emailContainer);
    const errorPhone = ensureErrorSpan('error-phone', phoneContainer);
    const errorPassword = ensureErrorSpan('error-password-signup', passwordContainer);

    errorFirst.textContent = '';
    errorLast.textContent = '';
    errorEmail.textContent = '';
    errorPhone.textContent = '';
    errorPassword.textContent = '';

    const emailRegex = /\S+@\S+\.\S+/;

    if (!firstNameInput || firstNameInput.value.trim().length < 2) {
        errorFirst.textContent = 'First name must have at least 2 characters.';
        hasError = true;
    }

    if (!lastNameInput || lastNameInput.value.trim().length < 2) {
        errorLast.textContent = 'Last name must have at least 2 characters.';
        hasError = true;
    }

    if (!emailInput || emailInput.value.trim().length === 0) {
        errorEmail.textContent = 'Email is required.';
        hasError = true;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        errorEmail.textContent = 'Email is not valid.';
        hasError = true;
    }

    if (!phoneInput || phoneInput.value.trim().length === 0) {
        errorPhone.textContent = 'Phone is required.';
        hasError = true;
    } else {
        const digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length < 7) {
            errorPhone.textContent = 'Phone must have at least 7 digits.';
            hasError = true;
        }
    }

    if (!passwordInput || passwordInput.value.length < 6) {
        errorPassword.textContent = 'Password must have at least 6 characters.';
        hasError = true;
    }

    return hasError;
}

const signupButton = document.getElementById("signup-button")
if (signupButton) signupButton.addEventListener("click", signUpProcess)
