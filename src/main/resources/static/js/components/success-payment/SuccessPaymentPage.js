import {ConfirmBookingProcess} from "./utils/ConfirmBookingProcess.js";

export class SuccessPaymentPage {
    constructor(container) {
        this.appContainer = container
    }

    mount(){
        const page = this.render()
        this.appContainer.appendChild(page)
        setTimeout(() => {
            window.location.href = "index.html"
        }, 2000)
    }

    render() {
        const msg = document.createElement("h1")
        const success = ConfirmBookingProcess.process()

        if (success) {
            msg.textContent = "The booking was done! Redirecting to main page."
        }else{
            msg.textContent = "Something went wrong with the payment, Redirecting to main page"
        }

        return msg
    }
}