import {PaymentAPI} from "../../../api/PaymentAPI.js";

export class ConfirmBookingProcess {
    static process(){
        const params = new URLSearchParams(window.location.search)
        const paymentId = params.get("paymentId")
        const payerId = params.get("PayerID")
        const url = '/api/v1/payment/execute-payment?paymentId=' + paymentId + '&payerId=' + payerId

        const response = PaymentAPI.confirmBooking(url)

        return response.ok

    }
}