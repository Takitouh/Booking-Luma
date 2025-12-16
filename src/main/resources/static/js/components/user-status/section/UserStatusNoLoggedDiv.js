export class UserStatusNoLoggedDiv {
    constructor(container) {
        this.appContainer = container
    }

    mount(){
        const userStatusDiv = this.render()
        this.appContainer.appendChild(userStatusDiv)
    }

    render(){
        const userStatusDiv = document.createElement("div")
        userStatusDiv.id = "user-status"

        //Only logged users could register hotels
        const registerHotelLink = document.createElement("a")
        registerHotelLink.id = "register"
        registerHotelLink.textContent = "Register your hotel"
        registerHotelLink.href = "sign-up-contributor.html"

        const signUpLink = document.createElement("a")
        signUpLink.id = "sign-up"
        signUpLink.href = "sign-up.html"
        signUpLink.textContent = "Sign Up"

        const logInLink = document.createElement("a")
        logInLink.id = "log-in"
        logInLink.href = "log-in.html"
        logInLink.textContent = "Log In"

        userStatusDiv.appendChild(registerHotelLink)
        userStatusDiv.appendChild(signUpLink)
        userStatusDiv.appendChild(logInLink)

        return userStatusDiv
    }


}