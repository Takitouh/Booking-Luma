export const PaymentAPI = {
    confirmBooking: async function (url) {
        const response = await fetch(url, {
            // Adding method type
            method: "POST",
            body: JSON.stringify({}),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response.ok
    },
    cancelBooking: async function (url) {
        const response = await fetch(url, {
            // Adding method type
            method: "POST",

            body: JSON.stringify({}),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response.ok
    }
}