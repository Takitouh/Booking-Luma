const params = new URLSearchParams(window.location.search)
const paymentId = params.get("paymentId")
const payerId = params.get("PayerID")

const url = 'api/v1/payment/execute-payment?paymentId=' + paymentId + '&payerId=' + payerId

createInvoicePayment()

function createInvoicePayment() {
    const responsePayment = fetch(url, {
        // Adding method type
        method: "POST",

        body: JSON.stringify({}),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}