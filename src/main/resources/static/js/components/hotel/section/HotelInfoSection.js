export class HotelInfoSection {
    constructor(container, hotelData) {
        this.container = container
        this.hotelData = hotelData
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)
    }

    render() {
        const informationHotelSection = document.createElement("section")
        informationHotelSection.id = "hotel-info"

        //General information
        const hotelTitle = document.createElement("h2")
        hotelTitle.id = "hotel-title"
        hotelTitle.textContent = this.hotelData.name
        const hotelDescription = document.createElement("p")
        hotelDescription.id = "hotel-description"
        hotelDescription.textContent = this.hotelData.description || "No description available."
        const hotelLocation = document.createElement("h4")
        hotelLocation.id = "hotel-location"
        hotelLocation.textContent = this.hotelData.location
        // Schedule
        const hotelScheduleTitle = document.createElement("h3")
        hotelScheduleTitle.textContent = "Check-in / Check-out Schedule:"
        const hotelScheduleCheckingCheckout = document.createElement("p")
        hotelScheduleCheckingCheckout.id = "hotel-schedule"
        hotelScheduleCheckingCheckout.textContent = this.hotelData.scheduleCheckIn + " - " + this.hotelData.scheduleCheckOut

        // Amenities
        const amenitiesTitle = document.createElement("h3")
        amenitiesTitle.textContent = "Amenities:"
        const amenitiesList = document.createElement("ul");
        amenitiesList.id = "hotel-amenities-list"
        amenitiesList.title = "Amenities"

        //List all the amenities of the hotel
        if (this.hotelData.amenities.length === 0) {
            const msg = document.createElement("p");
            msg.className = "hotel-amenities-item";
            msg.textContent = "No amenities available.";
            amenitiesList.appendChild(msg);
        } else {
            this.hotelData.amenities.forEach(amenityItem => {
                const amenity = document.createElement("li");
                amenity.className = "hotel-amenities-item";
                amenity.textContent = amenityItem;
                amenitiesList.appendChild(amenity);
            })
        }

        informationHotelSection.appendChild(hotelTitle)
        informationHotelSection.appendChild(hotelLocation)
        informationHotelSection.appendChild(hotelDescription)
        informationHotelSection.appendChild(hotelScheduleTitle)
        informationHotelSection.appendChild(hotelScheduleCheckingCheckout)
        informationHotelSection.appendChild(amenitiesTitle)
        informationHotelSection.appendChild(amenitiesList)

        return informationHotelSection
    }
}