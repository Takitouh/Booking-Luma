export class ValidationLogIn {
    static validate() {
        let flag = false

        const email = document.getElementById("user-email").value.trim()
        const password = document.getElementById("user-password").value.trim()

        const errorEmail = document.getElementById("error-user-email")
        const errorPassword = document.getElementById("error-user-password")

        if (email === undefined || email.length < 2) {
            errorEmail.textContent = "Email must have at least 3 characters"
            flag = true
        } else {
            errorEmail.textContent = ""
        }

        if (!email.includes("@")) {
            errorEmail.textContent = "Email must have @"
            flag = true
        } else {
            errorEmail.textContent = ""
        }

        if (password === undefined || password.length < 7) {
            errorPassword.textContent = "Password must have at least 8 characters"
            flag = true
        } else {
            errorPassword.textContent = ""
        }

        return flag
    }
}