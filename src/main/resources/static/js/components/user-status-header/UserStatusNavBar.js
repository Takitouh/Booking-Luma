import {HeaderImg} from "./section/HeaderImg.js";
import {UserAPI} from "../../api/UserAPI.js";
import {UserStatusLoggedDiv} from "./section/UserStatusLoggedDiv.js";
import {UserStatusNoLoggedDiv} from "./section/UserStatusNoLoggedDiv.js";


export class UserStatusNavBar {
    constructor(header) {
        this.header = header
    }

    async init(userStatusNavBar) {
        this.userStatusData = await UserAPI.userStatus()
        this.userStatusDiv = this.userStatusData.isLogged? new UserStatusLoggedDiv(userStatusNavBar, this.userStatusData) : new UserStatusNoLoggedDiv(userStatusNavBar)
        this.headerImg = new HeaderImg(userStatusNavBar)
    }

    async mount() {
        const userStatusNavBar = this.render()
        this.header.appendChild(userStatusNavBar)
        await this.init(userStatusNavBar)
        this.headerImg.mount()
        this.userStatusDiv.mount()

    }

    render() {
        const navBar = document.createElement("nav")
        navBar.className = "main-nav-bar"

        return navBar
    }
}