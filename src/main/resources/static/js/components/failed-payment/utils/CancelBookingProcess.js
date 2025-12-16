import {PaymentAPI} from "../../../api/PaymentAPI.js";

export class CancelBookingProcess {
    static process(){
        const params = new URLSearchParams(window.location.search)
        const idBooking = params.get("idBooking")

        const url = '/api/v1/bookings/cancel-booking?idBooking=' + idBooking

        const response = PaymentAPI.cancelBooking(url)

        alert("Payment failed. Please try again.")
    }
}