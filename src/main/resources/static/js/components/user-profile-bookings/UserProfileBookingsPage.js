import {UserBookingsSection} from "./section/UserBookingsSection.js";
import {UserProfileTitle} from "./elements/UserProfileTitle.js";
import {BookingAPI} from "../../api/BookingAPI.js";
import {TopBarProfile} from "../user-profile-account/elements/TopBarProfile.js";

export class UserProfileBookingsPage {
    constructor(container) {
        this.appContainer = container
        this.topBarProfile = new TopBarProfile(container)
    }

    async init(bookingsPage) {
        const bookings = await BookingAPI.getBookingsByEmail()

        this.bookingsTitleInstance = new UserProfileTitle(bookingsPage, "Your bookings")
        this.bookingsSectionInstance = new UserBookingsSection(bookingsPage, bookings)
    }


    async mount() {
        this.topBarProfile.mount()
        const bookingsPage = this.render()
        this.appContainer.appendChild(bookingsPage)
        await this.init(bookingsPage)
        this.bookingsTitleInstance.mount()
        this.bookingsSectionInstance.mount()
    }

    render(){
        const page = document.createElement("div")

        return page
    }
}