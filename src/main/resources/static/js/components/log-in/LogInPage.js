import {LogInTitle} from "./section/LogInTitle.js";
import {LogInForm} from "./section/LogInForm.js";
import {BuilderToast} from "../common/BuilderToast.js";

export class LogInPage {
    constructor(container) {
        this.container = container
    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)

        this.initInstances(html)

        this.builderToastInstance.mount()
        this.logInTitleInstance.mount()
        this.logInFormInstance.mount()
    }

    initInstances(container) {
        this.builderToastInstance = new BuilderToast(container)
        this.logInTitleInstance = new LogInTitle(container)
        this.logInFormInstance = new LogInForm(container)
    }

    render() {
        const logInPage = document.createElement("div")
        logInPage.id = "log-in-page"

        return logInPage
    }
}