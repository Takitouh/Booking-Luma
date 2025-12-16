import {AuthAPI} from "../../../api/AuthAPI.js";
import {ValidationLogIn} from "./ValidationLogIn.js";

export class LogInProcess {
    static async process() {
        if (ValidationLogIn.validate()) {
            return false
        }

        const email = document.getElementById("user-email").value
        const password = document.getElementById("user-password").value


        const logInData = {
            email: email,
            password: password
        }

        const response = await AuthAPI.logIn(logInData)

        return response.ok
    }
}