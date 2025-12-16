import {SignUpForm} from "./section/SignUpForm.js";
import {BuilderToast} from "../common/BuilderToast.js";
import {SignUpTitle} from "./section/SignUpTitle.js";

export class SignUpPage {
    constructor(container) {
        this.appContainer = container
    }

    init(page) {
        this.builderToastInstance = new BuilderToast(page)
        this.signUpTitleInstance = new SignUpTitle(page)
        this.signUpFormInstance = new SignUpForm(page)
    }

    mount() {
        const page = this.render()
        this.appContainer.appendChild(page)
        this.init(page)
        this.builderToastInstance.mount()
        this.signUpTitleInstance.mount()
        this.signUpFormInstance.mount()
    }

    render() {
        const signUpPage = document.createElement("div")
        signUpPage.id = "sign-up-page"
        return signUpPage
    }
}