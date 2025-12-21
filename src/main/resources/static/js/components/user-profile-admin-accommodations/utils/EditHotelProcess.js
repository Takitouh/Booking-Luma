import {HotelAPI} from "../../../api/HotelAPI.js";

export class EditHotelProcess {
    static process(idHotel){
        if (!confirm("Are you sure about the changes?")){
            return
        }

        const hotelNameInput = document.getElementById("hotel-name").value.trim()
        const hotelLocationInput = document.getElementById("location").value.trim()
        const hotelDescriptionInput = document.getElementById("description").value.trim()
        const hotelCheckInInput = document.getElementById("schedule-check-in").value.trim()
        const hotelCheckOutInput = document.getElementById("schedule-check-out").value.trim()
        const hotelImageInput = document.getElementById("inp-image-hotel").files[0]

        let amenityChecked = new Set();
        document.querySelectorAll("input[name='amenities']").forEach(amenity => {
            if (amenity.checked === true) {
                amenityChecked.add(amenity.value)
            }

        })

        const hotelInfo = {
            name: hotelNameInput,
            location: hotelLocationInput,
            description: hotelDescriptionInput,
            scheduleCheckIn: hotelCheckInInput,
            scheduleCheckOut: hotelCheckOutInput,
            amenities: Array.from(amenityChecked)
        }

        const request = new FormData()
        request.append('hotelInfo', new Blob([JSON.stringify(hotelInfo)], {type: 'application/json'}))
        request.append('file', hotelImageInput)

        HotelAPI.editHotel(request, idHotel)

        alert("Hotel edited successfully.")
        window.location.reload()

    }
}