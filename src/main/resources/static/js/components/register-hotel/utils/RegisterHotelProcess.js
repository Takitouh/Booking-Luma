import {ValidationRegisterHotelInputs} from "./ValidationRegisterHotelInputs.js";
import {HotelAPI} from "../../../api/HotelAPI.js";

export class RegisterHotelProcess {
    async process() {
        const validationRegister = new ValidationRegisterHotelInputs()
        if (validationRegister.validate()) {
            return false;
        }


        const hotel = this.HotelJson()
        const roomsList = this.RoomListJson()
        const imageHotel = document.getElementById("inp-image-hotel").files[0]

        //Create a new FormData and append the hotel, rooms and hotel image to it
        const form = new FormData()
        form.append('hotel', new Blob([hotel], {type: 'application/json'}))
        form.append('rooms', new Blob([roomsList], {type: 'application/json'}))
        form.append('file', imageHotel)

        return await HotelAPI.registerHotel(form)
    }

    HotelJson() {
        //Get the values of the inputs
        const hotelName = document.getElementById("hotel-name").value.trim()
        const description = document.getElementById("description").value.trim()
        const location = document.getElementById("location").value.trim()
        const checkIn = document.getElementById("schedule-check-in").value.trim()
        const checkOut = document.getElementById("schedule-check-out").value.trim()

        const accommodation = document.querySelector("input[name = 'accommodation']:checked")
        const accommodationValue = accommodation.value

        //Get the checkboxes selected
        const ameniChecked = document.querySelectorAll('input[name =  "amenities"]:checked')

        //Map the values of the chosen amenities
        const arrayAmenities = Array.from(ameniChecked).map(el => el.value)

        return JSON.stringify({
            name: hotelName,
            description: description,
            location: location,
            accommodationType: accommodationValue,
            scheduleCheckIn: checkIn,
            scheduleCheckOut: checkOut,
            amenities: arrayAmenities
        })
    }

    RoomListJson() {
        //Get the containers of the rooms
        const roomCards = document.querySelectorAll(".new-room-container")

        //Map the number and fee of each container room
        const roomsList = Array.from(roomCards).map(room => {
            let roomNum = room.querySelector(".number")
            let roomFee = room.querySelector(".fee")

            return {number: roomNum.value, fee: roomFee.value}
        })

        return JSON.stringify(roomsList)
    }
}