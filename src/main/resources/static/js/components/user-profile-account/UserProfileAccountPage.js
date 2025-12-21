import {UserProfileAccountDataSection} from "./section/UserProfileAccountDataSection.js";
import {UserAPI} from "../../api/UserAPI.js";
import {TopBarProfile} from "./elements/TopBarProfile.js";
import {UserProfileTitle} from "../user-profile-bookings/elements/UserProfileTitle.js";

export class UserProfileAccountPage {
    constructor(container) {
        this.appContainer = container
        this.topBarProfile = new TopBarProfile(container)
    }

    async init() {
        const userData = await UserAPI.getUserData()

        this.userProfileTitle = new UserProfileTitle(page, "Account settings")
        this.userProfileDataInstance = new UserProfileAccountDataSection(this.appContainer, userData)
    }

    async mount(){
        this.topBarProfile.mount()
        const page = this.render()
        this.appContainer.appendChild(page)
        await this.init()
        this.userProfileTitle.mount()
        this.userProfileDataInstance.mount()
    }

    render() {
        const page = document.createElement("div")
        page.id = "page"

        return page
    }
}