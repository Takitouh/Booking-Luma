import {TopBarProfile} from "../user-profile-account/elements/TopBarProfile.js";
import {HotelAPI} from "../../api/HotelAPI.js";
import {UserProfileHotelsSection} from "./section/UserProfileHotelsSection.js";
import {UserProfileTitle} from "../user-profile-bookings/elements/UserProfileTitle.js";

export class UserProfileAccommodationsPage {
    constructor(container) {
        this.appContainer = container
        this.topBarProfile = new TopBarProfile(container)
    }

    async init(page) {
        const hotels = await HotelAPI.getHotelByOwnerEmail() ?? []
        this.userAcommodationInstance = new UserProfileHotelsSection(page, hotels)
        this.userProfileTitle = new UserProfileTitle(page, "Your accommodations")
    }

    async mount() {
        this.topBarProfile.mount()
        const page = this.render()
        this.appContainer.appendChild(page)
        await this.init(page)
        this.userProfileTitle.mount()
        this.userAcommodationInstance.mount()
    }

    render(){
        const page = document.createElement("div")

        return page
    }

}