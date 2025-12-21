import {PaymentAPI} from "../../../api/PaymentAPI.js";

export class ConfirmBookingProcess {
    static async process(){
        const params = new URLSearchParams(window.location.search)
        const paymentId = params.get("paymentId")
        const payerId = params.get("PayerID")
        const url = '/api/v1/payment/execute-payment?paymentId=' + paymentId + '&payerId=' + payerId

        const response = await PaymentAPI.confirmBooking(url)

        return response.ok

    }
}