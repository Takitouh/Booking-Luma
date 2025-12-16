import {DeleteHotelProcess} from "../utils/DeleteHotelProcess.js";

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
            const hotelListItem = document.createElement("li")
            hotelListItem.id = "hotel-item-" + hotel.id
            hotelListItem.className = "hotel-item"

            const wrapperInfo = document.createElement("div")
            wrapperInfo.className = "hotel-info-wrapper"
            const hotelName = document.createElement("h3")
            const hotelLocation = document.createElement("p")
            hotelName.textContent = hotel.name
            hotelLocation.textContent = hotel.location

            hotelName.className = "hotel-name"
            hotelLocation.className = "hotel-location"

            const wrapperButtons = document.createElement("div")
            const seeButton = document.createElement("button")
            const editButton = document.createElement("button")
            const deleteButton = document.createElement("button")

            wrapperButtons.className = "hotel-buttons-wrapper"

            seeButton.className = "hotel-see-button"
            editButton.className = "hotel-edit-button"
            deleteButton.className = "hotel-delete-button"

            seeButton.textContent = "See"
            editButton.textContent = "Edit"
            deleteButton.textContent = "Delete"

            wrapperInfo.appendChild(hotelName)
            wrapperInfo.appendChild(hotelLocation)

            wrapperButtons.appendChild(seeButton)
            wrapperButtons.appendChild(editButton)
            wrapperButtons.appendChild(deleteButton)

            hotelListItem.appendChild(wrapperInfo)
            hotelListItem.appendChild(wrapperButtons)

            hotelsList.appendChild(hotelListItem)

        })

        userProfileHotelSection.appendChild(hotelsList)

        return userProfileHotelSection
    }

    bindListener(){
        const containerHotels = document.querySelectorAll(".hotel-item")

        containerHotels.forEach(containerHotel => {
            const hotelID = containerHotel.id.substring(11)

            const seeButton = containerHotel.querySelector(".hotel-see-button")
            const editButton = containerHotel.querySelector(".hotel-edit-button")
            const deleteButton = containerHotel.querySelector(".hotel-delete-button")

            seeButton.addEventListener('click', () => {
                window.open("/hotel.html?id=" + hotelID, '_blank');
            })
            deleteButton.addEventListener("click", () => {
                DeleteHotelProcess.process(hotelID)
            })

            editButton.addEventListener('click', () => {
                window.location.href = "/edit-hotel/" + hotelID + ".html"
            })

        })
    }
}