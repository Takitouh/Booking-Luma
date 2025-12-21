import {DeleteHotelProcess} from "../../user-profile-account/utils/DeleteHotelProcess.js";

export class UserProfileHotelsSection {
    constructor(container, hotels) {
        this.container = container
        this.hotels = hotels
    }

    mount(){
        const userProfileHotelSection = this.render()
        this.container.appendChild(userProfileHotelSection)
        this.bindListener()
    }

    render() {
        const userProfileHotelSection = document.createElement("section")

        const hotelsList = document.createElement("ul")
        hotelsList.id = "hotel-list"

        this.hotels.forEach(hotel => {
            const hotelItem = document.createElement("li")
            hotelItem.dataset.id = hotel.id

            hotelItem.className = "hotel-item"

            const wrapperInfo = document.createElement("div")
            wrapperInfo.className = "hotel-info-wrapper"
            const hotelName = document.createElement("h3")
            const hotelLocation = document.createElement("p")
            hotelName.textContent = hotel.name
            hotelLocation.textContent = hotel.location

            hotelName.className = "hotel-name"
            hotelLocation.className = "hotel-location"

            const wrapperLinks = document.createElement("div")
            const seeHotelLink = document.createElement("a")
            seeHotelLink.href = "/hotel.html?id=" + hotel.id
            const editHotelLink = document.createElement("a")
            editHotelLink.href = "/edit-hotel/" + hotel.id + ".html"
            const deleteHotelLink = document.createElement("a")

            wrapperLinks.className = "hotel-links-wrapper"

            seeHotelLink.className = "hotel-see-button hotel-action-link"
            editHotelLink.className = "hotel-edit-button hotel-action-link"
            deleteHotelLink.className = "hotel-delete-button hotel-action-link"

            seeHotelLink.textContent = "See"
            editHotelLink.textContent = "Edit"
            deleteHotelLink.textContent = "Delete"

            wrapperInfo.appendChild(hotelName)
            wrapperInfo.appendChild(hotelLocation)

            wrapperLinks.appendChild(seeHotelLink)
            wrapperLinks.appendChild(editHotelLink)
            wrapperLinks.appendChild(deleteHotelLink)

            hotelItem.appendChild(wrapperInfo)
            hotelItem.appendChild(wrapperLinks)

            hotelsList.appendChild(hotelItem)

        })

        userProfileHotelSection.appendChild(hotelsList)

        return userProfileHotelSection
    }

    bindListener(){
        const containerHotels = document.querySelectorAll(".hotel-item")

        containerHotels.forEach(containerHotel => {
            const hotelID = containerHotel.dataset.id

            const deleteButton = containerHotel.querySelector(".hotel-delete-button")

            deleteButton.addEventListener("click", () => {
                DeleteHotelProcess.process(hotelID)
            })
        })
    }
}