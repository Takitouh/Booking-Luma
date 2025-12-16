export class ValidationRegisterHotelInputs {
    validate(){
        let hasError = false;

        const hotelName = document.getElementById("hotel-name").value.trim();
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();
        const checkIn = document.getElementById("schedule-check-in").value.trim();
        const checkOut = document.getElementById("schedule-check-out").value.trim();
        const imageHotel = document.getElementById("inp-image-hotel").files[0];
        const roomCards = document.querySelectorAll(".new-room-container");

        // Error spans
        const errorName = document.getElementById("error-hotel-name");
        const errorLocation = document.getElementById("error-location");
        const errorDescription = document.getElementById("error-description");
        const errorCheckIn = document.getElementById("error-schedule-check-in");
        const errorCheckOut = document.getElementById("error-schedule-check-out");
        const errorRooms = document.getElementById("error-rooms");
        const errorImg = document.getElementById("error-inp-image-hotel");


        if (hotelName.length < 3) {
            errorName.textContent = "Hotel name must have at least 3 characters.";
            hasError = true;
        } else {
            errorName.textContent = "";
        }

        if (location.length < 3) {
            errorLocation.textContent = "Location must have at least 3 characters.";
            hasError = true;
        } else {
            errorLocation.textContent = "";
        }

        if (description.length < 30) {
            errorDescription.textContent = "Description must have at least 30 characters.";
            hasError = true;
        } else {
            errorDescription.textContent = "";
        }

        if (checkIn.length === 0) {
            errorCheckIn.textContent = "Check-in is required.";
            hasError = true;
        } else {
            errorCheckIn.textContent = "";
        }
        if (checkOut.length === 0) {
            errorCheckOut.textContent = "Check-out is required.";
            hasError = true;
        } else {
            errorCheckOut.textContent = "";
        }


        if (!imageHotel) {
            errorImg.textContent = "You must select an image.";
            hasError = true;
        } else if (
            imageHotel.type !== "image/png" &&
            imageHotel.type !== "image/jpeg" &&
            imageHotel.type !== "image/jpg"
        ) {
            errorImg.textContent = "Only PNG or JPEG images are allowed.";
            hasError = true;
        } else {
            errorImg.textContent = "";
        }

        let roomErrorMsg = "";
        if (roomCards.length === 0) {
            roomErrorMsg = "Add at least one room.";
            hasError = true;
        } else {

            roomCards.forEach(room => {
                const num = room.querySelector(".number");
                const fee = room.querySelector(".fee");
                if (!num || num.value.trim().length === 0) {
                    roomErrorMsg = "Each room must have a number.";
                    hasError = true;
                }
                if (!fee || isNaN(fee.value) || fee.value.trim().length === 0) {
                    roomErrorMsg = "Each room must have a valid fee.";
                    hasError = true;
                }
            });
        }
        errorRooms.textContent = roomErrorMsg;
        return hasError;
    }
}