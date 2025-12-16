import {AuthAPI} from "../../../api/AuthAPI.js";
import {ValidationSignUp} from "./ValidationSignUp.js";

export class SignUpProcess {
    static async process() {
        if (ValidationSignUp.validate()) {
            return false
        }


        const firstName = document.getElementById("user-first-name").value
        const lastName = document.getElementById("user-last-name").value
        const email = document.getElementById("user-email").value
        const phone = document.getElementById("user-phone").value
        const password = document.getElementById("user-password").value


        const signupData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        }

        const response = await AuthAPI.signUp(signupData)

        return response.ok
    }
}