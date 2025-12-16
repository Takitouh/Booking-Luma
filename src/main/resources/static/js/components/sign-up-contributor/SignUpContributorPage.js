import {SignUpForm} from "../sign-up/section/SignUpForm.js";
import {SignUpContributorTitle} from "./section/SignUpContributorTitle.js";
import {BuilderToast} from "../common/BuilderToast.js";

export class SignUpContributorPage {
    constructor(container) {
        this.appContainer = container
    }

    init(page) {
        this.builderToastInstance = new BuilderToast(page)
        this.signUpTitleInstance = new SignUpContributorTitle(page)
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
        const page = document.createElement("div")
        page.id = "page"
        return page
    }
}