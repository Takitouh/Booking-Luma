export const HotelAPI = {
    getAllHotels: async function () {
        const response = await fetch('/api/v1/hotels/get')
        if (!response.ok) {
            throw new Error("Error in the reply")
        }
        return await response.json()
    },
    getHotelByName: async function (hotelName) {
        const response = await fetch('/api/v1/hotels/find-by-name?name=' + hotelName)
        if (!response.ok) {
            throw new Error("Error in the reply")
        }
        return await response.json()
    },
    getHotelByID: async function (ID) {
        const response = await fetch('/api/v1/hotels/get/' + ID)
        if (!response.ok) {
            throw new Error("Error in the reply")
        }
        return await response.json()
    },
    getHotelByOwnerEmail: async function () {
        const response = await fetch('/api/v1/guests/gethotels-byemail', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return await response.json()
    },
    registerHotel: async function (form) {
        const response = await fetch('/api/v1/hotels/register-hotel', {
            method: "POST",
            body: form
        })
        if (!response.ok) {
            console.error("Error in the reply")
        }
        return response.ok;
    }
    ,
    deleteHotel: async function (hotelID) {
        const response = await fetch('/api/v1/hotels/delete/' + hotelID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }
    },
    editHotel: async function (request, hotelID) {
        const response = await fetch('/api/v1/hotels/patch/' + hotelID, {
            method: 'PATCH',
            body: request
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response
    }
}