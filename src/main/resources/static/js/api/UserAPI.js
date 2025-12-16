export const UserAPI = {
    editUserData: async function (body) {
        const response = await fetch('/api/v1/guests/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return response
    },
    userStatus: async function () {
        const response = await fetch('/api/v1/guests/getLogged', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return await response.json()
    },
    userLogOut: async function () {
        const response = await fetch('/auth/log-out', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok){
            throw new Error("Error in the server reply.")
        }

    },
    getUserData: async function(){
        const response = await fetch('/api/v1/guests/get-profile-data' , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Error in the server reply.")
        }

        return await response.json()
    }
}