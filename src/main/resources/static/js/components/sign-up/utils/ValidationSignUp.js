export class ValidationSignUp {
    static validate() {
        let flag = false

        const firstName = document.getElementById("user-first-name").value.trim()
        const lastName = document.getElementById("user-last-name").value.trim()
        const email = document.getElementById("user-email").value.trim()
        const phone = document.getElementById("user-phone").value.trim()
        const password = document.getElementById("user-password").value.trim()

        const errorFirstName = document.getElementById("error-user-first-name")
        const errorLastName = document.getElementById("error-user-last-name")
        const errorEmail = document.getElementById("error-user-email")
        const errorPhone = document.getElementById("error-user-phone")
        const errorPassword = document.getElementById("error-user-password")


        if (firstName === undefined || firstName.length < 2) {
            errorFirstName.textContent = "First name must have at least 3 characters"
            flag = true
        } else {
            errorFirstName.textContent = ""
        }

        if (lastName === undefined || lastName.length < 2) {
            errorLastName.textContent = "Last name must have at least 3 characters"
            flag = true
        } else {
            errorLastName.textContent = ""
        }

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
        
        if (phone === undefined || phone.length !== 10) {
            errorPhone.textContent = "Invalid phone number"
            flag = true
        } else {
            errorPhone.textContent = ""
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