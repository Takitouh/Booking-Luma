function registerHandler() {
    if (validateRegisterInputs()) {
        return;
    }
    const divToast = document.getElementById("toast-div")
    const msgToast = document.getElementById("toast-msg")
    const hotel = createHotel()
    const roomsList = createRooms()
    const imageHotel = document.getElementById("inp-image-hotel").files[0]

    //Create a new FormData and append the hotel, rooms and hotel image to it
    const form = new FormData()
    form.append('hotel', new Blob([hotel], {type: 'application/json'}))
    form.append('rooms', new Blob([roomsList], {type: 'application/json'}))
    form.append('file', imageHotel)

    fetch('api/v1/hotels/register-hotel', {

        method: "POST",
        body: form

    }).then(r => {
        if (!r.ok) {
            divToast.style.display = "block"
            divToast.style.color = "#fe5151"
            msgToast.textContent = "The register of the hotel failed."
            console.log("There was a problem with the register of the hotel, redirecting to main page.")
            return
        }
        console.log("The register of the hotel was successful.")

        divToast.style.display = "block"
        divToast.style.backgroundColor = "#02a702"
        msgToast.textContent = "The register of the hotel was successful, redirecting to main page."

        setTimeout(() => {
            window.location.href = "index.html"
        }, 3000)


        return r
    })

}

//Function that builds the JSON of the hotel
function createHotel() {
    //Get the values of the inputs
    const hotelName = document.getElementById("hotelName").value.trim()
    const description = document.getElementById("description").value.trim()
    const location = document.getElementById("location").value.trim()
    const checkIn = document.getElementById("schedule-check-in").value.trim()
    const checkOut = document.getElementById("schedule-check-out").value.trim()
    //Get the checkboxes selected
    const ameniChecked = document.querySelectorAll('input[name =  "amenities"]:checked')

    //Map the values of the chosen amenities
    const arrayAmenities = Array.from(ameniChecked).map(el => el.value)

    return JSON.stringify({
        name: hotelName,
        description: description,
        location: location,
        scheduleCheckIn: checkIn,
        scheduleCheckOut: checkOut,
        amenities: arrayAmenities
    })
}

//Function that builds the JSON of the rooms
function createRooms() {
    //Get the containers of the rooms
    const roomCards = document.querySelectorAll(".room-div")

    //Map the number and fee of each container room
    const roomsList = Array.from(roomCards).map(room => {
        let roomNum = room.querySelector(".input-number")
        let roomFee = room.querySelector(".input-fee")

        return {number: roomNum.value, fee: roomFee.value}
    })

    return JSON.stringify(roomsList)
}

//Function that generates the containers of rooms
function generateRoomCard() {
    //The principal div where the others divRooms are going to be appended
    const divMainRoom = document.getElementById("room-div")
    //The dynamics containers and its delete button
    const divNewRoom = document.createElement("div")
    const delButton = document.createElement("button")
    //Labels and inputs for the number and fee
    const labNumber = document.createElement("label")
    const inpNumber = document.createElement("input")
    const labFee = document.createElement("label")
    const inpFee = document.createElement("input")

    divNewRoom.className = "room-div"
    labFee.className = "input-room"
    labNumber.className = "input-room"
    inpNumber.className = "input-number"
    inpFee.className = "input-fee"
    //Add function that deletes the dynamics containers of the rooms
    delButton.id = "del-room"
    delButton.addEventListener("click", () => divNewRoom.remove())

    delButton.textContent = "- Delete room"
    labNumber.textContent = "Number room"
    labFee.textContent = "Fee room"

    inpNumber.type = "text"
    inpFee.type = "text"
    delButton.type = "button"

    labNumber.appendChild(inpNumber)
    labFee.appendChild(inpFee)

    divNewRoom.appendChild(delButton)
    divNewRoom.appendChild(labNumber)
    divNewRoom.appendChild(labFee)

    divMainRoom.appendChild(divNewRoom)
}


//Add the function that add a new container for a room to the add button
const addRoomButton = document.getElementById("add-room")
addRoomButton.addEventListener("click", generateRoomCard)

//Add the function that try to create the hotel to the register button
const regButton = document.getElementById("reg-button")
regButton.addEventListener("click", registerHandler)


function validateRegisterInputs() {
    let hasError = false;

    const hotelName = document.getElementById("hotelName").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
    const checkIn = document.getElementById("schedule-check-in").value.trim();
    const checkOut = document.getElementById("schedule-check-out").value.trim();
    const imageHotel = document.getElementById("inp-image-hotel").files[0];
    const roomCards = document.querySelectorAll(".room-div");

    // Spans de error
    const errorName = document.getElementById("error-name");
    const errorLocation = document.getElementById("error-location");
    const errorDescription = document.getElementById("error-description");
    const errorCheckIn = document.getElementById("error-check-in");
    const errorCheckOut = document.getElementById("error-check-out");
    const errorRooms = document.getElementById("error-rooms");
    const errorImg = document.getElementById("error-img");


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

    // Validación imagen
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
            const num = room.querySelector(".input-number");
            const fee = room.querySelector(".input-fee");
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
