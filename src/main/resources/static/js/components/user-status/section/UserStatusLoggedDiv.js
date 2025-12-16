import {LogOutProcess} from "../utils/LogOutProcess.js";

export class UserStatusLoggedDiv {
    constructor(header, userStatus) {
        this.header = header
        this.userStatus = userStatus
    }

    mount(){
        const userStatusDiv = this.render()
        this.header.appendChild(userStatusDiv)
        this.bindListener()
    }

     render() {
        const userStatusDiv = document.createElement("div")
        userStatusDiv.id = "user-status"

        const registerHotelLink = document.createElement("a")
        registerHotelLink.id = "register"
        registerHotelLink.textContent = "Register your hotel"
        registerHotelLink.href = "/register-hotel.html"

        const userProfileLink = document.createElement("a")
        userProfileLink.textContent = this.userStatus.fullName
        userProfileLink.href = "/my-profile.html"

        const logOutButton = document.createElement("button")
        logOutButton.id = "log-out"
        logOutButton.textContent = "Log Out"

        userStatusDiv.appendChild(registerHotelLink)
        userStatusDiv.appendChild(userProfileLink)
        userStatusDiv.appendChild(logOutButton)

        return userStatusDiv
    }

    bindListener(){
        const logOutButton = document.getElementById("log-out")
        logOutButton.addEventListener("click", LogOutProcess.process)
    }
}