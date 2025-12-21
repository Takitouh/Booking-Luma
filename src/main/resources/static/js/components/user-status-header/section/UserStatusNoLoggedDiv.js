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

        const authWrapper = document.createElement("div")
        const signUpLink = document.createElement("a")
        signUpLink.id = "sign-up"
        signUpLink.className = "auth-button"
        signUpLink.href = "sign-up.html"
        signUpLink.textContent = "Sign Up"
        const logInLink = document.createElement("a")
        logInLink.id = "log-in"
        logInLink.className = "auth-button"
        logInLink.href = "log-in.html"
        logInLink.textContent = "Log In"
        authWrapper.appendChild(signUpLink)
        authWrapper.appendChild(logInLink)


        userStatusDiv.appendChild(registerHotelLink)
        userStatusDiv.appendChild(authWrapper)

        return userStatusDiv
    }


}