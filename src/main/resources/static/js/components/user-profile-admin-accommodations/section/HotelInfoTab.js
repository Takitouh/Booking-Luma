import {BuilderFilledInputs} from "../../common/BuilderFilledInputs.js";
import {BuilderFilledCheckBoxAmenities} from "../elements/BuilderFilledCheckBoxAmenities.js";
import {EditHotelProcess} from "../utils/EditHotelProcess.js";

export class HotelInfoTab {
    constructor(container, hotelData, idHotel) {
        this.idHotel = idHotel
        this.container = container
        this.hotelData = hotelData
        this.didRender = false
        this.element = null // For caching the container
    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)
        this.bindListener()
    }

    render() {

        let infoTab
        if (!this.didRender) {
             infoTab = document.createElement("div")
            infoTab.id = "info-tab"
        } else {
             infoTab = document.getElementById("info-tab")
            infoTab.innerHTML = ""
        }

        const form = document.createElement("form")
        form.id = "edit-hotel-form"

        //We pass an array to create the html input and an array with the data to fill them
        let listInputs = [{id: 'hotel-name', label: 'Hotel Name', type: 'text'},
            {id: 'description', label: 'Description', type: 'text'},
            {id: 'location', label: 'Location', type: 'text'},
            {id: 'schedule-check-in', label: 'Check-in Time', type: 'time'},
            {id: 'schedule-check-out', label: 'Check-out Time', type: 'time'}]

        const data = [this.hotelData.name, this.hotelData.description,
            this.hotelData.location, this.hotelData.scheduleCheckIn, this.hotelData.scheduleCheckOut]

        BuilderFilledInputs.builder(listInputs, form, data)

        const amenitiesList = [{id: 'wifi', value: 'WiFi'},
            {id: 'pool', value: 'Pool'},
            {id: 'gym', value: 'Gym'},
            {id: 'spa', value: 'Spa'},
            {id: 'restaurant', value: 'Restaurant'},
            {id: 'bar', value: 'Bar'},
            {id: 'parking', value: 'Parking'},
            {id: 'airport-shuttle', value: 'Airport Shuttle'},
            {id: 'pet-friendly', value: 'Pet Friendly'},
            {id: 'air-conditioning', value: 'Air Conditioning'},
            {id: 'room-service', value: 'Room Service'},
            {id: 'laundry-service', value: 'Laundry Service'},
            {id: 'breakfast', value: 'Breakfast'}]

        //Construct the amenities checkboxes and fill the ones that belong to the hotel
        BuilderFilledCheckBoxAmenities.builder(amenitiesList, form, this.hotelData.amenities)

        const divInputImg = document.createElement("div")
        divInputImg.className = "div-input"
        const spanErrorImage = document.createElement("span")
        spanErrorImage.id = "error-inp-image-hotel"
        spanErrorImage.className = "error-input"
        const imageLabel = document.createElement("label")
        const imageInput = document.createElement("input")
        imageLabel.textContent = "Main image from hotel:"
        imageLabel.className = "label-input"
        imageInput.type = "file"
        imageInput.id = "inp-image-hotel"
        imageLabel.appendChild(imageInput)

        const editHotelButton = document.createElement("button")
        editHotelButton.id = "edit-hotel-btn"
        editHotelButton.className = "btn-stl1"
        editHotelButton.type = "button"
        editHotelButton.textContent = "Update Hotel"


        divInputImg.appendChild(spanErrorImage)
        divInputImg.appendChild(imageLabel)
        divInputImg.appendChild(editHotelButton)
        form.appendChild(divInputImg)
        form.appendChild(editHotelButton)

        infoTab.appendChild(form)

        this.didRender = true
        this.element = infoTab
        return infoTab

    }

    bindListener() {
        const registerHotelButton = document.getElementById("edit-hotel-btn")
        registerHotelButton.addEventListener("click", () => {
            EditHotelProcess.process(this.idHotel)
        })
    }
}