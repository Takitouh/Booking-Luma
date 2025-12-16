import {AuthCard} from "../../common/AuthCard.js";
import {BuilderInputs} from "../../common/BuilderInputs.js";
import {SignUpProcess} from "../utils/SignUpProcess.js";
import {BuilderToast} from "../../common/BuilderToast.js";

export class SignUpForm {
    constructor(container) {
        this.container = container
    }

    init(){
        this.authCardInstance = new AuthCard(this.container)
    }

    mount(){
        this.init()
        this.authCardInstance.mount()
        const html = this.render()
        this.container.appendChild(html)
        this.bindListener()
    }

    render() {
        const authCard = document.getElementById("auth-card")

        const form = document.createElement("form")
        form.id = "auth-form"

        const inputs = [
            {id: 'user-first-name', label: 'First Name', type: 'text'},
            {id: 'user-last-name', label: 'Last Name', type: 'text'},
            {id: 'user-email', label: 'Email', type: 'email'},
            {id: 'user-phone', label: 'Phone', type: 'text'},
            {id: 'user-password', label: 'Password', type: 'password'}]

        BuilderInputs.builder(inputs, form)

        const signUpButton = document.createElement("button")
        signUpButton.id = "auth-button"
        signUpButton.type = "button"
        signUpButton.textContent = "Sign Up"

        const signUpFooter = document.createElement("p")
        signUpFooter.id = "sign-up-footer"
        signUpFooter.textContent = "Already have an account? "

        const logInLink = document.createElement("a")
        logInLink.href = "log-in.html"
        logInLink.textContent = "Log In"

        form.appendChild(signUpButton)
        form.appendChild(signUpFooter)
        form.appendChild(logInLink)

        authCard.appendChild(form)
        return authCard
    }

    bindListener(){
        const signUpButton = document.getElementById("auth-button")

        signUpButton.addEventListener('click', async () => {
            const response = await SignUpProcess.process()

            BuilderToast.renderMsg(response, "Sign up successful!", "Sign up failed")
        })
    }

}