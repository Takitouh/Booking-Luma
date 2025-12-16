export const RoomAPI = {
    editRoom: async function (request, roomID) {
        const response = await fetch("/api/v1/rooms/patch/" + roomID, {
            headers: {
                "Content-type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response.ok
    },
    deleteRoom: async function (roomID) {
        const response = await fetch('/api/v1/rooms/delete/' + roomID, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response.ok;
    },
    createBatchRooms: async function (request, hotelID){
        const response = await fetch('/api/v1/rooms/postBatch/' + hotelID, {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response.ok
    }
}