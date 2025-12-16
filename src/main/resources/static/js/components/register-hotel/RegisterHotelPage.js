import {RegisterHotelForm} from "./section/RegisterHotelForm.js";
import {BuilderToast} from "../common/BuilderToast.js";

export class RegisterHotelPage {
    constructor(container) {
        this.appContainer = container
    }

    mount(){
        const html = this.render()
        this.appContainer.appendChild(html)
        this.builderToastInstance.mount()
        this.registerFormInstance.mount()
    }

    render(){
        const registerHotelPage = document.createElement("div")
        registerHotelPage.id = "register-hotel-page"
        this.builderToastInstance = new BuilderToast(registerHotelPage)
        this.registerFormInstance = new RegisterHotelForm(registerHotelPage)

        return registerHotelPage
    }
}