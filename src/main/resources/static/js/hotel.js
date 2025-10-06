// Obtain the ID of the hotel.
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

const buttonOk = document.getElementById("hotel__booking-field-button");
buttonOk.addEventListener("click", createBooking)

//Will apply for check if the guest already exist to return it or create a new one
async function handleGuestInformation() {
    const inpFirstName = document.getElementById("first-name")
    const inpLastName = document.getElementById("last-name")
    const inpEmail = document.getElementById("guest-email")
    const inpPhone = document.getElementById("guest-phone")

    const email = inpEmail.value;


    const guest = await fetch("api/v1/guests/post-booking-guest?email=" + email, {
        method: "POST",

        body: JSON.stringify({
            "firstName": inpFirstName.value,
            "lastName": inpLastName.value,
            "email": inpEmail.value,
            "phone": inpPhone.value
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    const res = await guest.json()

    return res.id
}

async function createBooking() {
    //Use function for validation of inputs
    if (validationInputGuest()) {
        return;
    }

    //Get the information needed to create the booking
    const checkIn = document.getElementById("check-in")
    const checkOut = document.getElementById("check-out")
    const idGuest = await handleGuestInformation()
    const idRoom = returnSelectedRoomID();

    fetch('api/v1/bookings/post', {

        // Adding method type
        method: "POST",

        // Adding parameters of the booking
        body: JSON.stringify({
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            status: "COMPLETED",
            roomId: idRoom,
            guestId: idGuest
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => {
                if (!res.ok) throw new Error("Error creating booking.")
                return res.json()
            }
        )
}

//Fetch to the REST API to obtain the information of hotel
fetch(`/api/v1/hotels/get/${hotelId}`).then(res => res.json())
    .then(hotel => {

        document.getElementById("hotel-name").textContent = hotel.name;
        document.getElementById("hotel-description").textContent = hotel.description || "No description available.";
        document.getElementById("hotel-location").textContent = hotel.location;
        document.getElementById("hotel-schedule-checking-checkout").textContent = hotel.scheduleCheckIn + " - " + hotel.scheduleCheckOut;
        const amenitiesList = document.getElementById("hotel-amenities-list");

        //List all the amenities of the hotel
        hotel.amenities.forEach(amenityItem => {
            const amenity = document.createElement("li");
            amenity.className = "hotel-amenities-item";
            amenity.textContent = amenityItem;
            amenitiesList.appendChild(amenity);
        })

        //Message in case the hotel doesn't have amenities
        if (amenitiesList.childElementCount === 0) {
            const amenity = document.createElement("li");
            amenity.className = "hotel-amenities-item";
            amenity.textContent = "No amenities available.";
            amenitiesList.appendChild(amenity);
        }

            const roomTable = document.getElementById("hotel__booking-rooms-table")

            hotel.rooms.forEach(roomHotel => {
                constructorOfRoom(roomHotel, roomTable);
            })

    });

function constructorOfRoom(roomHotel, roomTable) {
    const room = document.createElement("tr") //The full row
    const roomNumbers = document.createElement("td") //This contains the number of room
    const roomFee = document.createElement("td") //Fee of room
    const roomSelec = document.createElement("input") //Radio
    const roomNumber = document.createElement("label") //The number of the room

    roomSelec.id = "hotel__booking-room-selector"
    roomSelec.type = "radio"
    roomSelec.name = "hotel-room"
    roomSelec.value = roomHotel.id

    roomFee.textContent = roomHotel.fee
    roomNumber.textContent = roomHotel.number

    room.className = "hotel__booking-room"
    roomFee.className = "hotel__booking-room-price"
    roomNumbers.className = "hotel__booking-room-numbers"

    roomNumbers.appendChild(roomSelec)
    roomNumbers.appendChild(roomNumber)

    room.appendChild(roomNumbers)
    room.appendChild(roomFee)

    roomTable.appendChild(room)
}

//This function return the id of the room selected
function returnSelectedRoomID() {
    let idRoom = -1;
    document.getElementsByName("hotel-room").forEach(roomS => {
        if (roomS.checked) {
            idRoom = roomS.value
            return idRoom;
        }
    })
    return idRoom; //In case of no selection return -1
}

function validationInputGuest() {
    //HTML inputs
    const checkIn = document.getElementById("check-in").value
    const checkOut = document.getElementById("check-out").value
    const guestFirstName = document.getElementById("first-name").value.trim()
    const guestLastName = document.getElementById("last-name").value.trim()
    const guestEmail = document.getElementById("guest-email").value.trim()
    const guestPhone = document.getElementById("guest-phone").value.trim()
    const errorMsgRoomSelection = document.getElementById("booking-room_error")
    const idRoom = returnSelectedRoomID()
    //Error msg divs
    const errorMsgCheckIn = document.getElementById("hotel-checking__error")
    const errorMsgCheckOut = document.getElementById("hotel-checkout__error")
    const errorMsgFirstName = document.getElementById("guest-first-name__error")
    const errorMsgLastName = document.getElementById("guest-last-name__error")
    const errorMsgEmail = document.getElementById("guest-email__error")
    const errorMsgPhone = document.getElementById("guest-phone__error")

    let flag = false

    //Check if the inputs aren't undefined and have a minimum of characters

    if (checkIn === undefined || checkIn.length === 0){
        errorMsgCheckIn.textContent = "Please select a check in date."
        flag = true;
    } else{
        errorMsgCheckIn.textContent = ""
    }
    if (checkOut === undefined || checkOut.length === 0){
        errorMsgCheckOut.textContent = "Please select a check out date."
        flag = true;
    } else{
        errorMsgCheckOut.textContent = ""
    }

    if (guestFirstName === undefined || guestFirstName.length < 2){
        errorMsgFirstName.textContent = "First name can't must have at least 3 letters."
        flag = true;
    } else{
        errorMsgFirstName.textContent = ""
    }
    if (guestLastName === undefined ||guestLastName.length < 2){
        errorMsgLastName.textContent = "Last name can't must have at least 3 letters."
        flag = true;
    } else{
        errorMsgLastName.textContent = ""
    }
    if (guestEmail === undefined || guestEmail.length < 5 || !guestEmail.includes("@")){
        errorMsgEmail.textContent = "Email not valid."
        flag = true;
    }  else{
        errorMsgEmail.textContent = ""
    }
    if (guestPhone === undefined || guestPhone.length !== 10){
        errorMsgPhone.textContent = "Phone must have 10 digits."
        flag = true;
    } else{
        errorMsgPhone.textContent = ""
    }

    //Check for selected room
    if (idRoom === undefined || idRoom === -1){
        errorMsgRoomSelection.textContent = "Please select a room."
        flag = true;
    } else {
        errorMsgRoomSelection.textContent = ""
    }

    return flag;
}
