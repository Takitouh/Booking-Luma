import {BuilderInputs} from "../../common/BuilderInputs.js";
import {BuilderCheckBoxAmenities} from "../../common/BuilderCheckBoxAmenities.js";
import {BuilderRoomCard} from "../../common/BuilderRoomCard.js";
import {RegisterHotelProcess} from "../utils/RegisterHotelProcess.js";
import {BuilderToast} from "../../common/BuilderToast.js";
import {BuilderAccommodationTypeRadioButton} from "../../common/BuilderAccommodationTypeRadioButton.js";

export class RegisterHotelForm {
    constructor(container) {
        this.appContainer = container
    }

    mount() {
        const html = this.render()
        this.appContainer.appendChild(html)
        this.bindListener()
    }

    render() {
        const builderAmenities = new BuilderCheckBoxAmenities()
        const builderRoomCard = new BuilderRoomCard()

        const registerForm = document.createElement("form")
        registerForm.id = "register-form"

        const fields = [{id: 'hotel-name', label: 'Hotel Name', type: 'text'},
            {id: 'description', label: 'Description', type: 'text'},
            {id: 'location', label: 'Location', type: 'text'},
            {id: 'schedule-check-in', label: 'Check-in Time', type: 'time'},
            {id: 'schedule-check-out', label: 'Check-out Time', type: 'time'}]

        BuilderInputs.builder(fields, registerForm)

        const accommodationTypes = [{value: 'HOTEL', name: "Hotel"},
            {value: "HOSTEL", name: "Hostel"},
            {value: "APARTMENT", name: "Apartment"},
            {value: "RESORT", name: "Resort"},
            {value: "MOTEL", name: "Motel"},
            {value: "VILLAS", name: "Villas"}]

        const fieldSetAccommodation = BuilderAccommodationTypeRadioButton.builder(accommodationTypes)
        registerForm.appendChild(fieldSetAccommodation)

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

        builderAmenities.builder(amenitiesList, registerForm)

        const spanErrorImage = document.createElement("span")
        spanErrorImage.id = "error-inp-image-hotel"
        spanErrorImage.className = "error-input"
        const imageLabel = document.createElement("label")
        const imageInput = document.createElement("input")
        imageLabel.textContent = "Main image from hotel:"
        imageInput.type = "file"
        imageInput.id = "inp-image-hotel"
        imageLabel.appendChild(imageInput)

        registerForm.appendChild(spanErrorImage)
        registerForm.appendChild(imageLabel)

        const addRoomButton = document.createElement("button")
        addRoomButton.id = "add-room"
        addRoomButton.type = "button"
        addRoomButton.textContent = "+ Add Room"

        registerForm.appendChild(addRoomButton)

        //The principal div where the others divRooms are going to be appended
        const divMainRoom = document.createElement("div")
        divMainRoom.id = "room-div"
        const errorRooms = document.createElement("span");
        errorRooms.id = "error-rooms"
        errorRooms.className = "error-input"
        divMainRoom.appendChild(errorRooms)
        //Add one room card by default
        builderRoomCard.builder(divMainRoom)

        registerForm.appendChild(divMainRoom)

        const registerHotelButton = document.createElement("button")
        registerHotelButton.id = "reg-button"
        registerHotelButton.className = "btn-stl1"
        registerHotelButton.type = "button"
        registerHotelButton.textContent = "Register Hotel"
        registerForm.appendChild(registerHotelButton)

        return registerForm
    }

    bindListener() {
        const builderRoomCard = new BuilderRoomCard()
        const registerHandler = new RegisterHotelProcess()

        const addRoomButton = document.getElementById("add-room")
        addRoomButton.addEventListener("click", () => {
            let divMainRoom = document.getElementById("room-div")
            builderRoomCard.builder(divMainRoom)
        })

        const registerHotelButton = document.getElementById("reg-button")
        registerHotelButton.addEventListener("click", async () => {
            const response = await registerHandler.process()
            BuilderToast.renderMsg(response, "Register successful, redirecting to main page.",
                "Register failed, redirecting to main page.")
        })
    }
}