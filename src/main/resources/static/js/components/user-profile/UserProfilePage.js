import {UserProfilePersonalDataSection} from "./section/UserProfilePersonalDataSection.js";
import {UserProfileHotelsSection} from "./section/UserProfileHotelsSection.js";
import {HotelAPI} from "../../api/HotelAPI.js";
import {UserAPI} from "../../api/UserAPI.js";

export class UserProfilePage {
    constructor(container) {
        this.appContainer = container
    }

    async init() {
        const hotels = await HotelAPI.getHotelByOwnerEmail() ?? []
        const userData = await UserAPI.getUserData()

        this.userProfileDataInstance = new UserProfilePersonalDataSection(this.appContainer, userData)
        this.userProfileHotelsInstance = new UserProfileHotelsSection(this.appContainer, hotels)
    }

    async mount(){
        const page = this.render()
        this.appContainer.appendChild(page)
        await this.init()
        this.userProfileDataInstance.mount()
        this.userProfileHotelsInstance.mount()
    }

    render() {
        const page = document.createElement("div")
        page.id = "page"

        return page
    }
}