export const AuthAPI = {
    signUp: async function (body) {
       const response = await fetch("/auth/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!response.ok){
            throw new Error("Error in the response of the server.")
        }

        return response
    },
    logIn: async function (body) {
        const response = await fetch("/auth/log-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!response.ok){
            throw new Error("Error in the response of the server.")
        }

        return response
    }
}