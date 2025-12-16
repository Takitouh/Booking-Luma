import {AuthCard} from "../../common/AuthCard.js";
import {BuilderInputs} from "../../common/BuilderInputs.js";
import {BuilderToast} from "../../common/BuilderToast.js";
import {LogInProcess} from "../utils/LogInProcess.js";

export class LogInForm {
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

    render(){

        const authCard = document.getElementById("auth-card")
        const form = document.createElement("form")
        form.id = "auth-form"


        const inputs = [
            {id: 'user-email', label: 'Email', type: 'email'},
            {id: 'user-password', label: 'Password', type: 'password'}]


        BuilderInputs.builder(inputs, form)

        const logInButton = document.createElement("button")
        logInButton.id = "auth-button"
        logInButton.type = "button"
        logInButton.textContent = "Log in"

        const logInFooter = document.createElement("p")
        logInFooter.id = "log-in-footer"
        logInFooter.textContent = "Don't have an account? Create one"

        const signUpLink = document.createElement("a")
        signUpLink.href = "sign-up.html"
        signUpLink.textContent = "Sign up"

        form.appendChild(logInButton)
        form.appendChild(logInFooter)
        form.appendChild(signUpLink)

        authCard.appendChild(form)
        return authCard
    }

    bindListener(){
        const logInButton = document.getElementById("auth-button")

        logInButton.addEventListener('click', async () => {
            const response = await LogInProcess.process()

            BuilderToast.renderMsg(response, "Log in successful!", "Log in failed")
        })
    }
}