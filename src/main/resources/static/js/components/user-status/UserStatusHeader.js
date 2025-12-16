import {UserAPI} from "../../api/UserAPI.js";
import {UserStatusLoggedDiv} from "./section/UserStatusLoggedDiv.js";
import {UserStatusNoLoggedDiv} from "./section/UserStatusNoLoggedDiv.js";

export class UserStatusHeader {
    constructor() {
    }

    async init(header) {
        this.userStatus = await UserAPI.userStatus()

        this.userLoggedInstance = new UserStatusLoggedDiv(header, this.userStatus)
        this.userNoLoggedInstance = new UserStatusNoLoggedDiv(header)

    }

    async mount() {
        const userStatusHeader = this.render()

        await this.init(userStatusHeader)

        if (this.userStatus.isLogged) {
            this.userLoggedInstance.mount()
        } else {
            this.userNoLoggedInstance.mount()
        }
    }

    render() {
        const header = document.querySelector("header")

        const indexLink = document.createElement("a")
        indexLink.id = "logo"
        indexLink.href = "/index.html"
        const logo = document.createElement("img")
        logo.src = "/imgs/Booking-Luma.png"
        logo.alt = "Logo luma booking"

        indexLink.appendChild(logo)
        header.appendChild(indexLink)

        return header
    }
}