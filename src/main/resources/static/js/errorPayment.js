const params = new URLSearchParams(window.location.search)
const idBooking = params.get("idBooking")

const url = 'api/v1/bookings/cancel-booking?idBooking=' + idBooking

cancelBooking()

function cancelBooking() {
     fetch(url, {
        // Adding method type
        method: "POST",

        body: JSON.stringify({}),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

}