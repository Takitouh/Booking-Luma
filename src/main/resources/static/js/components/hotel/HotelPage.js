import {HotelInfoSection} from "./section/HotelInfoSection.js";
import {GuestInputBookingForm} from "./section/GuestInputBookingForm.js";
import {HotelAPI} from "../../api/HotelAPI.js";

export class HotelPage {
    constructor(container) {
        this.appContainer = container
    }

    async mount() {
        const html = this.render()
        this.appContainer.appendChild(html)

        await this.init(html)

        this.hotelInfoInstance.mount()
        this.bookingFormInstance.mount()
    }

    async init(container) {
        const params = new URLSearchParams(window.location.search)
        const idHotel = params.get("id")
        const hotelData = await HotelAPI.getHotelByID(idHotel)

        this.hotelInfoInstance = new HotelInfoSection(container, hotelData)
        this.bookingFormInstance = new GuestInputBookingForm(container, hotelData.rooms)
    }

    render() {
        const hotelPageContainer = document.createElement("div")
        hotelPageContainer.id = "hotel-container"

        return hotelPageContainer

    }
}