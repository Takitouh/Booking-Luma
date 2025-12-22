import {LogOutProcess} from "../utils/LogOutProcess.js";
import {UserProfileMenu} from "../elements/UserProfileMenu.js";

export class UserStatusLoggedDiv {
    constructor(header, userStatus) {
        this.header = header
        this.userStatus = userStatus
    }

    init() {
        this.userMenuInstance = new UserProfileMenu(document.getElementById("app"))
    }

    mount() {
        const userStatusDiv = this.render()
        this.header.appendChild(userStatusDiv)
        this.bindListener()
        this.init()
    }

    render() {
        const userStatusDiv = document.createElement("div")
        userStatusDiv.id = "user-status"

        const registerHotelLink = document.createElement("a")
        registerHotelLink.id = "register"
        registerHotelLink.textContent = "Register your hotel"
        registerHotelLink.href = "/register-hotel.html"

        const menuContainer = document.createElement("div")
        menuContainer.id = "menu-account-container"
        const menuAccountButton = document.createElement("button")
        menuAccountButton.id = "menu-account-button"
        menuAccountButton.textContent = this.userStatus.fullName

        const menuDropDown = document.createElement("ul")
        menuDropDown.className = "menu-account-drop-down"

        const profileLinkItem = document.createElement("li")
        profileLinkItem.className = "menu-account-li"
        const profileLink = document.createElement("a")
        profileLink.id = "profile-link"
        profileLink.className = "menu-account-item"
        profileLink.textContent = "*    Profile"
        profileLink.href = "/my-profile/settings.html"

        const logOutButtonItem = document.createElement("li")
        logOutButtonItem.className = "menu-account-li"
        const logOutButton = document.createElement("button")
        logOutButton.id = "log-out"
        logOutButton.className = "menu-account-item"
        logOutButton.textContent = "*   Log out"
        logOutButton.type = "button"

        profileLinkItem.appendChild(profileLink)
        logOutButtonItem.appendChild(logOutButton)

        menuDropDown.appendChild(profileLinkItem)
        menuDropDown.appendChild(logOutButtonItem)

        menuContainer.appendChild(menuAccountButton)
        menuContainer.appendChild(menuDropDown)

        userStatusDiv.appendChild(registerHotelLink)
        userStatusDiv.appendChild(menuContainer)

        return userStatusDiv
    }

    bindListener() {
        const menuButton = document.getElementById("menu-account-button")
        menuButton.addEventListener("click", () => {
            document.querySelector(".menu-account-drop-down").classList.toggle("show-menu-account-drop-down")
        })

        window.addEventListener("click", (event) => {
            if (!event.target.matches("#menu-account-button")) {
                document.querySelector(".menu-account-drop-down").classList.toggle("show-menu-account-drop-down",
                    false)
            }
        })

        const logOutButton = document.getElementById("log-out")
        logOutButton.addEventListener("click", LogOutProcess.process)

    }


}