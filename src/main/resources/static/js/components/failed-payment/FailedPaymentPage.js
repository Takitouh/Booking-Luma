import {CancelBookingProcess} from "./utils/CancelBookingProcess.js";

export class FailedPaymentPage {
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
        msg.textContent = "Payment failed, redirecting to main page."
        CancelBookingProcess.process()
        return msg
    }
}