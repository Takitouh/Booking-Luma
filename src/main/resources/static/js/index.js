//Routes
const routes = {
    "/index.html": homeView,
    "/search-results.html": searchResultsView,
    "/hotel.html": hotelView,
    "/user-profile.html": userProfileView,
    "/sign-up.html": signUpView,
    "/log-in.html": logInView,
    "/register-hotel.html": registerHotelView,
    "/error-payment.html": failedPaymentView,
    "/success-payment.html": successPaymentView,
    "/sign-up-contributor.html": signUpContributorView,
    "/update-hotel.html": updateHotelView
}

function navigate(path) {
    window.history.pushState({}, '', path)
    router()
}

function router() {
    const path = window.location.pathname
    const view = routes[path] || notFoundView // If the path isn't found so notFoundView will be called

    const appContainer = document.getElementById("app")
    appContainer.innerHTML = "" //Clear the container
    view(appContainer)
}


// Handle browser back/forward buttons
window.onpopstate = router;

// Start the router when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to any links that should use SPA navigation
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigate(e.target.href);
        }
    });
    // Run the router for the initial page load
    router();
});


// ### HOME SECTION ###
async function homeView(appContainer) {
    let containerHotels = document.createElement("div");
    containerHotels.id = "hotels"

    //Fetch to the REST API to obtain all hotels
    containerHotels = await fetch('/api/v1/hotels/get')
        .then(res => {
            if (!res.ok) throw new Error('Error in the server reply.');
            return res.json();
        })
        .then(async hotels => {
            const divHotels = document.createElement("div");
            divHotels.id = "hotels"
            //In case there aren't hotels available
            if (await hotels == null || hotels.length === 0) {
                const title = document.createElement("h2");
                title.textContent = "No hotels found.";
                divHotels.appendChild(title);
                return divHotels;
            }
            return constructorOfCardHotel(hotels, containerHotels);
        })
        .catch(err => console.error('Failed trying get the hotels:', err));

    const searchBar = constructorSearchBar()

    appContainer.appendChild(searchBar)
    appContainer.appendChild(containerHotels)
}

// # Construction of each hotel card #
function constructorOfCardHotel(hotels, containerHotels) {
    if (hotels === undefined || hotels.length === 0) {
        const title = document.createElement("h2");
        title.textContent = "No hotels found.";
        containerHotels.appendChild(title);
        return containerHotels;
    }

    hotels.forEach(hotel => {
        const card = document.createElement("div");
        card.className = "hotel-card";

        const title = document.createElement("h2");
        title.textContent = hotel.name;
        title.className = "hotel-title";

        const location = document.createElement("p");
        location.textContent = hotel.location;
        location.className = "hotel-location";

        const link = document.createElement("a");
        link.href = "/hotel.html?id=" + hotel.id;
        link.className = "hotel-link";

        const img = document.createElement("img");
        img.src = "/api/v1/hotels/downloadImage/" + hotel.id;
        img.alt = "Hotel photo";
        img.className = "hotel-image"
        link.appendChild(img)

        link.appendChild(title)
        link.appendChild(location)

        card.appendChild(link);

        containerHotels.appendChild(card);
    });
    return containerHotels
}

// # Construction of search bar
function constructorSearchBar() {
    const searchBarDiv = document.createElement("div")
    searchBarDiv.id = "search-bar-div"

    const searchInput = document.createElement("input")
    searchInput.id = "search-input"
    searchInput.type = "text"
    searchInput.placeholder = "Search hotels by name"

    const searchButton = document.createElement("button")
    searchButton.id = "search-bar-button"
    searchButton.textContent = "Search"
    searchButton.addEventListener('click', redirectSearch)

    searchBarDiv.appendChild(searchInput)
    searchBarDiv.appendChild(searchButton)

    return searchBarDiv
}

// ### SEARCH SECTION ###
async function searchResultsView(appContainer) {
    //Get the name of the hotel from the URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name')

    //Get JSON of hotel by name
    let hotel = [await fetch('/api/v1/hotels/find-by-name?name=' + name).then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    }).catch(err => console.error('Failed trying get the hotels:', err))];

    const searchBar = constructorSearchBar()

    //Create the container for the hotel card
    let containerHotels = document.createElement("div");
    containerHotels.id = "hotels"
    //Use the constructor function to build the hotel card
    containerHotels = constructorOfCardHotel(hotel, containerHotels)

    appContainer.appendChild(searchBar)
    appContainer.appendChild(containerHotels)
}

//Function to get the value of the search input and after redirect to the result
function redirectSearch() {
    const searchInp = document.getElementById("search-input").value.trim();
    const params = new URLSearchParams();
    params.append('name', searchInp);
    location.href = "searchResults.html?" + params.toString();
}


// ### INDIVIDUAL HOTEL SECTION ###
async function hotelView(appContainer) {
    // Obtain the ID of the hotel.
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get("id");

    let containerHotel = document.createElement("div")
    containerHotel.id = "hotel-container"

    //Fetch to the REST API to obtain the information of hotel
    fetch(`/api/v1/hotels/get/${hotelId}`).then(res => res.json())
        .then(hotel => {
            containerHotel = constructorIndividualHotel(hotel, containerHotel);
        });

    appContainer.appendChild(containerHotel)
}

// # Construct individual hotel #
function constructorIndividualHotel(hotel, containerHotel) {
    const hotelTitle = document.createElement("h2")
    hotelTitle.id = "hotel-title"
    hotelTitle.textContent = hotel.name

    const hotelDescription = document.createElement("p")
    hotelDescription.id = "hotel-description"
    hotelDescription.textContent = hotel.description || "No description available."

    const hotelLocation = document.createElement("h4")
    hotelLocation.id = "hotel-location"
    hotelLocation.textContent = hotel.location

    const hotelScheduleDiv = document.createElement("div")
    hotelScheduleDiv.id = "hotel-schedule-div"
    const hotelScheduleTitle = document.createElement("h3")
    hotelScheduleTitle.textContent = "Check-in / Check-out Schedule:"
    const hotelScheduleCheckingCheckout = document.createElement("p")
    hotelScheduleCheckingCheckout.id = "hotel-schedule"
    hotelScheduleCheckingCheckout.textContent = hotel.scheduleCheckIn + " - " + hotel.scheduleCheckOut

    hotelScheduleDiv.appendChild(hotelScheduleTitle)
    hotelScheduleDiv.appendChild(hotelScheduleCheckingCheckout)

    const amenitiesTitle = document.createElement("h3")
    amenitiesTitle.textContent = "Amenities:"

    const amenitiesList = document.createElement("ul");
    amenitiesList.id = "hotel-amenities-list"
    amenitiesList.title = "Amenities"

    // Guest info section
    const divGuestInfo = document.createElement("div")
    divGuestInfo.id = "guest-info"

    const msgErrorFirstName = document.createElement("p")
    msgErrorFirstName.id = "guest-first-name__error"
    msgErrorFirstName.className = "error-input"
    const labelGuestFirstName = document.createElement("label")
    labelGuestFirstName.textContent = "First Name:"
    labelGuestFirstName.htmlFor = "first-name"
    const inpGuestFirstName = document.createElement("input")
    inpGuestFirstName.id = "first-name"

    const msgErrorLastName = document.createElement("p")
    msgErrorLastName.id = "guest-last-name__error"
    msgErrorLastName.className = "error-input"
    const labelGuestLastName = document.createElement("label")
    labelGuestLastName.textContent = "Last Name:"
    labelGuestLastName.htmlFor = "last-name"
    const inpGuestLastName = document.createElement("input")
    inpGuestLastName.id = "last-name"

    const wrapperName = document.createElement("div")
    wrapperName.id = "wrapper-guest-name"

    const msgErrorEmail = document.createElement("p")
    msgErrorEmail.id = "guest-email__error"
    msgErrorEmail.className = "error-input"
    const labelGuestEmail = document.createElement("label")
    labelGuestEmail.textContent = "Email:"
    labelGuestEmail.htmlFor = "guest-email"
    const inpGuestEmail = document.createElement("input")
    inpGuestEmail.id = "guest-email"

    const msgErrorPhone = document.createElement("p")
    msgErrorPhone.id = "guest-phone__error"
    msgErrorPhone.className = "error-input"
    const labelGuestPhone = document.createElement("label")
    labelGuestPhone.textContent = "Phone:"
    labelGuestPhone.htmlFor = "guest-phone"
    const inpGuestPhone = document.createElement("input")
    inpGuestPhone.id = "guest-phone"

    labelGuestFirstName.appendChild(inpGuestFirstName)
    labelGuestLastName.appendChild(inpGuestLastName)
    labelGuestEmail.appendChild(inpGuestEmail)
    labelGuestPhone.appendChild(inpGuestPhone)

    wrapperName.appendChild(msgErrorFirstName)
    wrapperName.appendChild(labelGuestFirstName)
    wrapperName.appendChild(msgErrorLastName)
    wrapperName.appendChild(labelGuestLastName)

    divGuestInfo.appendChild(wrapperName)
    divGuestInfo.appendChild(msgErrorEmail)
    divGuestInfo.appendChild(labelGuestEmail)
    divGuestInfo.appendChild(msgErrorPhone)
    divGuestInfo.appendChild(labelGuestPhone)

    const bookingButton = document.createElement("button");
    bookingButton.id = "hotel__booking-field-button"
    bookingButton.textContent = "Book Now"
    bookingButton.addEventListener("click", createPayment)

    //List all the amenities of the hotel
    hotel.amenities.forEach(amenityItem => {
        const amenity = document.createElement("li");
        amenity.className = "hotel-amenities-item";
        amenity.textContent = amenityItem;
        amenitiesList.appendChild(amenity);
    })

    //Message in case the hotel doesn't have amenities
    if (amenitiesList.childElementCount === 0) {
        const msg = document.createElement("p");
        msg.className = "hotel-amenities-item";
        msg.textContent = "No amenities available.";
        amenitiesList.appendChild(msg);
    }

    const bookingFieldDiv = document.createElement("div")
    bookingFieldDiv.id = "hotel__booking-field"

    //Check-in input
    const labelCheckIn = document.createElement("label")
    labelCheckIn.textContent = "Check-in:"
    labelCheckIn.htmlFor = "check-in"
    const inpCheckIn = document.createElement("input")
    inpCheckIn.type = "date"
    inpCheckIn.id = "check-in"
    inpCheckIn.className = "hotel__booking-field-date"
    const errorMsgCheckIn = document.createElement("p")
    errorMsgCheckIn.id = "hotel-checking__error"
    errorMsgCheckIn.className = "error-message"

    labelCheckIn.appendChild(inpCheckIn)
    bookingFieldDiv.appendChild(labelCheckIn)
    bookingFieldDiv.appendChild(errorMsgCheckIn)

    //Check-out input
    const labelCheckOut = document.createElement("label")
    labelCheckOut.textContent = "Check-out:"
    labelCheckOut.htmlFor = "check-out"
    const inpCheckOut = document.createElement("input")
    inpCheckOut.type = "date"
    inpCheckOut.id = "check-out"
    inpCheckOut.className = "hotel__booking-field-date"
    const errorMsgCheckOut = document.createElement("p")
    errorMsgCheckOut.id = "hotel-checkout__error"
    errorMsgCheckOut.className = "error-message"

    labelCheckOut.appendChild(inpCheckOut)
    bookingFieldDiv.appendChild(labelCheckOut)
    bookingFieldDiv.appendChild(errorMsgCheckOut)


    //Construct table for rooms

    const errorMsgRoomSelection = document.createElement("p")
    errorMsgRoomSelection.id = "booking-room_error"
    errorMsgRoomSelection.className = "error-input"

    const roomTable = document.createElement("table")
    roomTable.id = "hotel__booking-rooms-table"
    const tableHeader = document.createElement("tr")
    const headerRoomNumbers = document.createElement("th")
    headerRoomNumbers.textContent = "Room Numbers"
    headerRoomNumbers.className = "hotel__booking-rooms-header"
    const headerRoomPrice = document.createElement("th")
    headerRoomPrice.textContent = "Price"
    headerRoomPrice.className = "hotel__booking-rooms-header"
    tableHeader.appendChild(headerRoomNumbers)
    tableHeader.appendChild(headerRoomPrice)
    roomTable.appendChild(tableHeader)

    //Construct each room of the hotel

    hotel.rooms.forEach(roomHotel => {
        constructorOfRoom(roomHotel, roomTable);
    })

    containerHotel.appendChild(hotelTitle)
    containerHotel.appendChild(hotelDescription)
    containerHotel.appendChild(hotelLocation)
    containerHotel.appendChild(hotelScheduleDiv)
    containerHotel.appendChild(amenitiesTitle)
    containerHotel.appendChild(amenitiesList)
    containerHotel.appendChild(divGuestInfo) //Inputs guest info
    containerHotel.appendChild(bookingFieldDiv) //Inputs check-in and check-out
    containerHotel.appendChild(errorMsgRoomSelection)
    containerHotel.appendChild(roomTable)
    containerHotel.appendChild(bookingButton)

    return containerHotel
}

// # Construct the rooms for the table #
function constructorOfRoom(roomHotel, roomTable) {
    const room = document.createElement("tr") //The full row
    const hotelRoomsNumbers = document.createElement("td") //This contains the number of room
    const roomFee = document.createElement("td") //Fee of room
    const roomSelector = document.createElement("input") //Radio
    const roomNumber = document.createElement("label") //The number of the room

    roomSelector.id = "hotel__booking-room-selector"
    roomSelector.type = "radio"
    roomSelector.name = "hotel-room"
    roomSelector.value = roomHotel.id

    roomFee.textContent = roomHotel.fee
    roomNumber.textContent = roomHotel.number

    hotelRoomsNumbers.className = "hotel__booking-room-numbers"
    room.className = "hotel__booking-room"
    roomFee.className = "hotel__booking-room-price"
    hotelRoomsNumbers.className = "hotel__booking-room-price"

    roomNumber.appendChild(roomSelector)

    hotelRoomsNumbers.appendChild(roomSelector)
    hotelRoomsNumbers.appendChild(roomNumber)

    room.appendChild(hotelRoomsNumbers)
    room.appendChild(roomFee)

    roomTable.appendChild(room)
}

// ## LOGIC FOR BOOKING A ROOM ##
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

async function returnIDGuest() {
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
    }).then(res => {
        if (!res.ok) {
            throw new Error("Error creating or obtaining guest information.")
        }
        return res.json()
    })

    return guest.id
}

// # Create the booking petition for be paid after #
async function createBooking() {
    //Use function for validation of inputs
    if (validationInputGuestBooking()) {
        return;
    }

    //Get the information needed to create the booking
    const checkIn = document.getElementById("check-in")
    const checkOut = document.getElementById("check-out")
    const idGuest = await returnIDGuest()
    const idRoom = returnSelectedRoomID();

    return fetch('api/v1/bookings/post', {
        // Adding method type
        method: "POST",
        // Adding parameters of the booking
        body: JSON.stringify({
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            status: "PENDING", //THIS VALUE ISN'T ASSIGNED IN THE FRONTEND, ASSIGN IT IN THE BACKEND
            roomId: idRoom,
            guestId: idGuest
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(async res => {
                if (!res.ok) throw new Error("Error creating booking.")
                return await res.json()
            }
        )
}

// # Create the payment and redirect to finish the payment #
async function createPayment() {
    const booking = await createBooking()

    fetch('api/v1/payment/create-payment', {
        // Adding method type
        method: "POST",

        // Adding parameters of the booking
        body: JSON.stringify(booking),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async resPay => {
            if (!resPay.ok) throw new Error("Error payment")
            const paymentUrl = await resPay.text()
            console.log(paymentUrl)
            location.href = paymentUrl
        }
    )
}

// ### REGISTER HOTEL SECTION ###
async function registerHotelView(appContainer) {
    const divToast = document.createElement("div")
    divToast.id = "toast-div"
    const toastMsg = document.createElement("h5")
    toastMsg.id = "toast-msg"
    divToast.appendChild(toastMsg)
    document.body.appendChild(divToast)

    const registerTitle = document.createElement("h1")
    registerTitle.id = "register-title"
    registerTitle.textContent = "Register Your Hotel"

    appContainer.appendChild(registerTitle)

    const registerHotelForm = constructorRegisterHotel()
    appContainer.appendChild(registerHotelForm)
}

function constructorRegisterHotel() {
    const registerMain = document.createElement("div")
    registerMain.id = "register-main"

    let registerForm = document.createElement("form")
    registerForm.id = "register-form"


    let fields = [{id: 'hotel-name', label: 'Hotel Name', type: 'text'},
        {id: 'description', label: 'Description', type: 'text'},
        {id: 'location', label: 'Location', type: 'text'},
        {id: 'schedule-check-in', label: 'Check-in Time', type: 'time'},
        {id: 'schedule-check-out', label: 'Check-out Time', type: 'time'}]

    registerForm = constructInputFields(fields, registerForm)

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

    registerForm = constructAmenitiesCheckbox(amenitiesList, registerForm)

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
    addRoomButton.addEventListener("click", () => {
        let divMainRoom = document.getElementById("room-div")
        generateRoomCard(divMainRoom)
    })
    registerForm.appendChild(addRoomButton)

    //The principal div where the others divRooms are going to be appended
    let divMainRoom = document.createElement("div")
    divMainRoom.id = "room-div"

    const errorRooms = document.createElement("span");
    errorRooms.id = "error-rooms"
    errorRooms.className = "error-input"

    divMainRoom.appendChild(errorRooms)
    divMainRoom = generateRoomCard(divMainRoom)
    registerForm.appendChild(divMainRoom)

    const registerHotelButton = document.createElement("button")
    registerHotelButton.id = "reg-button"
    registerHotelButton.type = "button"
    registerHotelButton.textContent = "Register Hotel"
    registerHotelButton.addEventListener("click", registerHandler)
    registerForm.appendChild(registerHotelButton)
    registerMain.appendChild(registerForm)

    return registerMain
}

// ## LOGIC FOR REGISTER HOTEL ##

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
    const hotelName = document.getElementById("hotel-name").value.trim()
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
    const roomCards = document.querySelectorAll(".new-room-container")

    //Map the number and fee of each container room
    const roomsList = Array.from(roomCards).map(room => {
        let roomNum = room.querySelector(".number")
        let roomFee = room.querySelector(".fee")

        return {number: roomNum.value, fee: roomFee.value}
    })

    return JSON.stringify(roomsList)
}

// # Validation of register hotel inputs #
function validateRegisterInputs() {
    let hasError = false;

    const hotelName = document.getElementById("hotel-name").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
    const checkIn = document.getElementById("schedule-check-in").value.trim();
    const checkOut = document.getElementById("schedule-check-out").value.trim();
    const imageHotel = document.getElementById("inp-image-hotel").files[0];
    const roomCards = document.querySelectorAll(".room-div");

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

// # Construct input amenities checkbox #
function constructAmenitiesCheckbox(amenitiesList) {
    const fieldSet = document.createElement("fieldset")
    fieldSet.className = "amenity-group"
    const legend = document.createElement("legend")
    legend.textContent = "Select Amenities:"
    fieldSet.appendChild(legend)
    amenitiesList.forEach(amenity => {
        const label = document.createElement("label")
        label.className = "label-amenity"
        const amenityText = document.createTextNode(amenity.value)

        const checkbox = document.createElement("input")
        checkbox.id = amenity.id
        checkbox.name = "amenities"
        checkbox.type = "checkbox"
        checkbox.value = amenity.value

        label.appendChild(checkbox)
        label.appendChild(amenityText)
        fieldSet.appendChild(label)
    })
    return fieldSet
}

// # Construct dynamic rooms cards for existing rooms #
function generateRoomCardExistent(existingRoomsDiv, roomData) {
    //The dynamics containers and its delete button
    const divNewRoom = document.createElement("div")
    const delButton = document.createElement("button")
    const updateRoomButton = document.createElement("button")
    //Labels and inputs for the number and fee
    const labNumber = document.createElement("label")
    const inpNumber = document.createElement("input")
    const labFee = document.createElement("label")
    const inpFee = document.createElement("input")

    updateRoomButton.addEventListener("click", () => updateRoom(roomData.id), once = true)
    delButton.addEventListener("click", () => deleteRoom(roomData.id), once = true)

    divNewRoom.className = "room-div"
    divNewRoom.id = "room-" + roomData.id
    labFee.className = "input-room"
    labNumber.className = "input-room"
    inpNumber.className = "number"
    inpFee.className = "fee"
    inpFee.name = "fee"
    inpNumber.name = "number"
    inpNumber.value = roomData.number
    inpFee.value = roomData.fee
    // Buttons
    updateRoomButton.id = "reg-button-" + roomData.id
    updateRoomButton.className = "admin-room-button"
    updateRoomButton.type = "button"


    delButton.id = "del-room-button"
    delButton.className = "admin-room-button"
    delButton.type = "button"

    delButton.textContent = "Delete room"
    updateRoomButton.textContent = "Update Room"
    labNumber.textContent = "Number room"
    labFee.textContent = "Fee room"

    inpNumber.type = "text"
    inpFee.type = "text"


    labNumber.appendChild(inpNumber)
    labFee.appendChild(inpFee)

    divNewRoom.appendChild(delButton)
    divNewRoom.appendChild(updateRoomButton)
    divNewRoom.appendChild(labNumber)
    divNewRoom.appendChild(labFee)

    existingRoomsDiv.appendChild(divNewRoom)
    return existingRoomsDiv
}

// # Construct dynamic room cards #
function generateRoomCard(divMainRoom) {
    //The dynamics containers and its delete button
    const divNewRoom = document.createElement("div")
    const delButton = document.createElement("button")
    //Labels and inputs for the number and fee
    const labNumber = document.createElement("label")
    const inpNumber = document.createElement("input")
    const labFee = document.createElement("label")
    const inpFee = document.createElement("input")

    divNewRoom.className = "new-room-container"
    labFee.className = "input-room"
    labNumber.className = "input-room"
    inpNumber.className = "number"
    inpFee.className = "fee"
    inpFee.name = "fee"
    inpNumber.name = "number"
    //Add function that deletes the dynamics containers of the rooms
    delButton.id = "del-room"
    delButton.className = "admin-room-button"
    delButton.addEventListener("click", () => divNewRoom.remove())

    delButton.textContent = "Delete room"
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
    return divMainRoom
}

// ### UPDATE HOTEL SECTION ###
async function updateHotelView(appContainer) {
    const parameters = new URLSearchParams(window.location.search)
    const hotelId = parameters.get("id")
    const hotelData = await retrieveDataHotel(hotelId)

    let updateContainer = document.createElement("div")
    updateContainer.id = "update-hotel-main"

    const titleUpdateHotel = document.createElement("h1")
    titleUpdateHotel.id = "update-hotel-title"
    titleUpdateHotel.textContent = "Update Your Hotel"
    appContainer.appendChild(titleUpdateHotel)

    const wrapperForm = document.createElement("div")
    wrapperForm.id = "wrapper-form"

    const tabGeneralInfo = document.createElement("button")
    const tabRooms = document.createElement("button")
    tabGeneralInfo.id = "tab-general-info"
    tabRooms.id = "tab-rooms"
    tabGeneralInfo.textContent = "General information"
    tabRooms.textContent = "Rooms configuration"
    tabGeneralInfo.type = "button"
    tabRooms.type = "button"
    updateContainer = await constructorGeneralInfoHotel(updateContainer, hotelData)

    wrapperForm.appendChild(tabGeneralInfo)

    wrapperForm.appendChild(tabRooms)
    wrapperForm.appendChild(updateContainer)
    appContainer.appendChild(wrapperForm)

    tabGeneralInfo.addEventListener('click', () => constructorGeneralInfoHotel(updateContainer, hotelData))
    tabRooms.addEventListener('click', () => constructorRoomsInfoHotel(updateContainer, hotelData))
}

//Construct the input fields and fill them with data of the hotel
function constructInputFieldsFilled(fields, inputData, form) {
    for (let i = 0; i < fields.length; i++) {
        const divField = document.createElement("div")
        divField.className = "div-input"

        const spanError = document.createElement("span")
        spanError.id = "error-" + fields[i].id
        spanError.className = "error-input"
        divField.appendChild(spanError)

        const label = document.createElement("label")
        label.className = "label-input"

        let input;

        if (fields[i].id === "description") {
            input = document.createElement("textarea")
            input.id = fields[i].id
            input.rows = 3
            input.textContent = inputData[i]
        } else {
            input = document.createElement("input")
            input.id = fields[i].id
            input.type = fields[i].type
        }

        input.className = "input-field"
        input.value = inputData[i]
        label.setAttribute('for', fields[i].id)
        label.textContent = fields[i].label

        label.appendChild(input)

        divField.appendChild(label)

        form.appendChild(divField)
    }
    return form
}

//Construct checkboxes and select amenities that belong to the hotel
// # Construct input amenities checkbox #
function constructAmenitiesCheckboxUpdate(amenitiesList, amenitiesHotel) {
    const fieldSet = document.createElement("fieldset")
    fieldSet.className = "amenity-group"
    const legend = document.createElement("legend")
    legend.textContent = "Select Amenities:"
    fieldSet.appendChild(legend)
    amenitiesList.forEach(amenity => {
        const label = document.createElement("label")
        label.className = "label-amenity"
        const amenityText = document.createTextNode(amenity.value)

        const checkbox = document.createElement("input")
        checkbox.id = amenity.id
        checkbox.name = "amenities"
        checkbox.type = "checkbox"
        checkbox.value = amenity.value

        if (amenitiesHotel.includes(amenity.value)) {
            checkbox.checked = true
        }

        label.appendChild(checkbox)
        label.appendChild(amenityText)
        fieldSet.appendChild(label)
    })
    return fieldSet
}

//Create the cards of the existing rooms
function createExistentRoomsCard(roomsData, existingRoomsDiv) {
    const countRooms = roomsData.length

    for (let i = 0; i < countRooms; i++) {
        generateRoomCardExistent(existingRoomsDiv, roomsData[i])
    }
}

async function retrieveDataHotel(id) {
    return await fetch(`/api/v1/hotels/get/${id}`).then(res => res.json())
}

async function constructorGeneralInfoHotel(updateContainer, hotelData) {
    updateContainer.innerHTML = ""
    let updateForm = document.createElement("form")
    updateForm.id = "update-hotel-form"

    //We pass an array to create the html input and an array with the data to fill them
    let fields = [{id: 'hotel-name', label: 'Hotel Name', type: 'text'},
        {id: 'description', label: 'Description', type: 'text'},
        {id: 'location', label: 'Location', type: 'text'},
        {id: 'schedule-check-in', label: 'Check-in Time', type: 'time'},
        {id: 'schedule-check-out', label: 'Check-out Time', type: 'time'}]

    const inputData = [hotelData.name, hotelData.description,
        hotelData.location, hotelData.scheduleCheckIn, hotelData.scheduleCheckOut]

    updateForm = constructInputFieldsFilled(fields, inputData, updateForm)

    let amenitiesList = [{id: 'wifi', value: 'WiFi'},
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
    const amenitiesCheckboxes = constructAmenitiesCheckboxUpdate(amenitiesList, hotelData.amenities)

    updateForm.appendChild(amenitiesCheckboxes)

    const spanErrorImage = document.createElement("span")
    spanErrorImage.id = "error-inp-image-hotel"
    spanErrorImage.className = "error-input"
    const imageLabel = document.createElement("label")
    const imageInput = document.createElement("input")
    imageLabel.textContent = "Main image from hotel:"
    imageInput.type = "file"
    imageInput.id = "inp-image-hotel"
    imageLabel.appendChild(imageInput)

    updateForm.appendChild(spanErrorImage)
    updateForm.appendChild(imageLabel)

    const registerHotelButton = document.createElement("button")
    registerHotelButton.id = "reg-button"
    registerHotelButton.type = "button"
    registerHotelButton.textContent = "Update Hotel"
    registerHotelButton.addEventListener("click", () => updateHotel(hotelData.id))
    updateForm.appendChild(registerHotelButton)
    updateContainer.appendChild(updateForm)

    return updateContainer
}

function constructorRoomsInfoHotel(updateContainer, hotelData) {
    updateContainer.innerHTML = ""
    //Create the section of existing rooms
    const existingRoomsDiv = document.createElement("div")
    existingRoomsDiv.className = "rooms-div"
    const existentRoomsTitle = document.createElement("h2")
    existentRoomsTitle.textContent = "Existent rooms"
    //We create the cards of the existing rooms
    createExistentRoomsCard(hotelData.rooms, existingRoomsDiv)

    updateContainer.appendChild(existentRoomsTitle)
    updateContainer.appendChild(existingRoomsDiv)


    const newRoomsDiv = document.createElement("div")
    newRoomsDiv.className = "rooms-div"
    const newRoomsTitle = document.createElement("h2")
    newRoomsTitle.textContent = "Add new rooms"


    const addRoomButton = document.createElement("button")
    addRoomButton.id = "add-room"
    addRoomButton.type = "button"
    addRoomButton.textContent = "+ Add Room"
    addRoomButton.addEventListener("click", () => {
        generateRoomCard(newRoomsDiv)
    })
    const hotelId = hotelData.id
    const createRoomButton = document.createElement("button")
    createRoomButton.id = ""
    createRoomButton.className = ""
    createRoomButton.type = "button"
    createRoomButton.textContent = "Create"
    createRoomButton.addEventListener("click", () => creationRoomsHandler(hotelId))

    updateContainer.appendChild(newRoomsTitle)
    updateContainer.appendChild(addRoomButton)
    updateContainer.appendChild(newRoomsDiv)
    updateContainer.appendChild(createRoomButton)

    return updateContainer
}

// ## LOGIC FOR UPDATE HOTEL ##
function updateHotel(hotelId) {
    const hotelNameInput = document.getElementById("hotel-name").value.trim()
    const hotelLocationInput = document.getElementById("location").value.trim()
    const hotelDescriptionInput = document.getElementById("description").value.trim()
    const hotelCheckInInput = document.getElementById("schedule-check-in").value.trim()
    const hotelCheckOutInput = document.getElementById("schedule-check-out").value.trim()

    let amenityChecked = new Set();
    document.querySelectorAll("input[name='amenities']").forEach(amenity => {
        if (amenity.checked === true) {
            amenityChecked.add(amenity.value)
        }
    })

    const hotelImageInput = document.getElementById("inp-image-hotel").files[0]

    const generalInfoHotel = {
        name: hotelNameInput,
        location: hotelLocationInput,
        description: hotelDescriptionInput,
        scheduleCheckIn: hotelCheckInInput,
        scheduleCheckOut: hotelCheckOutInput,
        amenities: Array.from(amenityChecked)
    }

    const request = new FormData()
    request.append('generalInfoHotel', new Blob([JSON.stringify(generalInfoHotel)], {type: 'application/json'}))
    request.append('file', hotelImageInput)


    fetch('api/v1/hotels/patch/' + hotelId, {
        method: 'PATCH',
        body: request
    }).then(res => {
        if (!res.ok) {
            console.log("The update failed.")
            return
        }
        console.log("The update was successful")
    })
}

// ## LOGIC FOR CREATE ROOMS ##
function creationRoomsHandler(idHotel) {
    const rooms = createRooms()
    console.log(rooms)


    fetch('api/v1/rooms/postBatch/' + idHotel, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: rooms
    }).then(res => {
        if (!res.ok){
            console.log("Failed creating the rooms")
            return
        }

        window.location.reload()
        alert("The creation was successful.")
        console.log("The rooms were successfully created")
    })
}

// ## LOGIC FOR UPDATE ROOM ##
function updateRoom(roomId) {
    if (!confirm("Are you sure about update the room?")) {
        return
    }

    const room = document.getElementById("room-" + roomId).querySelectorAll(".input-room input")
    let request = {}

    room.forEach(input => {
        const key = input.className
        request[key] = input.value
    })

    fetch("api/v1/rooms/patch/" + roomId, {
        headers: {
            "Content-type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(request)
    }).then(res => {
        if (!res.ok) {
            console.log("Failed at updating the room")
            return
        }
        console.log("Update successful")
    })
    window.location.reload()
    alert("Room updated successfully")
}

// ## LOGIC FOR DELETE ROOM ##
function deleteRoom(roomId) {
    if (!confirm("Are you sure about delete the room?")) {
        return
    }

    const delButton = document.getElementById("del-room-button")
    delButton.disabled = true
    delButton.backgroundColor = "GRAY"

    fetch('api/v1/rooms/delete/' + roomId, {
        method: "DELETE"
    }).then(res => {
        if (!res.ok) {
            alert("The room couldn't be deleted.")
            return
        }
        alert("The room was deleted.")
        window.location.reload()
    })
}

// ### SIGN UP SECTION ###
async function signUpView(appContainer) {

    const titleSignUp = document.createElement("h1")
    titleSignUp.id = "sign-up-title"
    titleSignUp.textContent = "Sign Up"
    appContainer.appendChild(titleSignUp)
    const signUpForm = constructorSignUp("auth/sign-up")
    appContainer.appendChild(signUpForm)

}

// # Construct sign up form #
function constructorSignUp(urlSignUp) {
    const toastDiv = document.createElement("div")
    toastDiv.id = "toast-div"
    const toastMsg = document.createElement("h5")
    toastMsg.id = "toast-msg"
    toastDiv.appendChild(toastMsg)

    document.body.appendChild(toastDiv)

    //Main div of sign up
    const authDiv = document.createElement("div")
    authDiv.id = "auth-card"

    const authTitle = document.createElement("h1")
    authTitle.id = "auth-title"
    authTitle.textContent = "Sign Up"

    let signUpForm = document.createElement("form")

    const fields = [
        {id: 'first-name', label: 'First Name', type: 'text'},
        {id: 'last-name', label: 'Last Name', type: 'text'},
        {id: 'email', label: 'Email', type: 'email'},
        {id: 'phone', label: 'Phone', type: 'text'},
        {id: 'password', label: 'Password', type: 'password'}]

    signUpForm = constructInputFields(fields, signUpForm)

    const signUpButton = document.createElement("button")
    signUpButton.id = "sign-up-button"
    signUpButton.type = "button"
    signUpButton.textContent = "Sign Up"
    signUpButton.addEventListener('click', () => {
        signUpProcess(urlSignUp)
    })

    const signUpFooter = document.createElement("p")
    signUpFooter.id = "sign-up-footer"
    signUpFooter.textContent = "Already have an account? "

    const logInLink = document.createElement("a")
    logInLink.href = "log-in.html"
    logInLink.textContent = "Log In"

    signUpFooter.appendChild(logInLink)
    signUpForm.appendChild(signUpButton)
    signUpForm.appendChild(signUpFooter)

    authDiv.appendChild(signUpForm)
    return authDiv
}

// # Construct common input fields  #
function constructInputFields(fields, form) {
    fields.forEach(f => {
        const divField = document.createElement("div")
        divField.className = "div-input"

        const spanError = document.createElement("span")
        spanError.id = "error-" + f.id
        spanError.className = "error-input"
        divField.appendChild(spanError)

        const label = document.createElement("label")
        label.className = "label-input"

        let input;

        if (f.id === "description") {
            input = document.createElement("textarea")
            input.id = f.id
            input.rows = 3
        } else {
            input = document.createElement("input")
            input.id = f.id
            input.type = f.type
        }

        input.className = "input-field"
        label.setAttribute('for', f.id)
        label.textContent = f.label

        label.appendChild(input)

        divField.appendChild(label)

        form.appendChild(divField)
    })


    return form
}


// ### SIGN UP CONTRIBUTOR ###
function signUpContributorView(appContainer) {
    const titleSignUp = document.createElement("h1")
    titleSignUp.id = "sign-up-title"
    titleSignUp.textContent = "Become a Contributor"
    appContainer.appendChild(titleSignUp)
    const signUpForm = constructorSignUp("auth/sign-up")
    appContainer.appendChild(signUpForm)
}

// ## LOGIC FOR SIGN UP ##
async function signUpProcess(urlSignUp) {

    if (validationInputGuestBooking()) {
        return;
    }

    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const password = document.getElementById("password").value
    const divToast = document.getElementById("toast-div")
    const msgToast = document.getElementById("toast-msg")

    const signupData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
    }

    await fetch(urlSignUp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
        .then(response => {
            if (!response.ok) {
                divToast.style.display = "block"
                divToast.style.color = "#fe5151"
                msgToast.textContent = "The sign up failed, redirecting to main page."
                console.log("There was a problem with the register of the hotel, redirecting to main page.")

                setTimeout(() => {
                    window.location.href = "index.html"
                }, 2000)
                return
            }
            divToast.style.display = "block"
            divToast.style.backgroundColor = "#02a702"
            msgToast.textContent = "The sign up was successful, redirecting to login page."

            setTimeout(() => {
                window.location.href = "login.html"
            }, 2000)
        })

}

// ### LOG IN SECTION ###
async function logInView(appContainer) {
    const titleLogIn = document.createElement("h1")
    titleLogIn.id = "log-in-title"
    titleLogIn.textContent = "Log in"
    appContainer.appendChild(titleLogIn)

    const authDiv = constructorLogIn()
    appContainer.appendChild(authDiv)
}

function constructorLogIn() {
    const toastDiv = document.createElement("div")
    toastDiv.id = "toast-div"
    const toastMsg = document.createElement("h5")
    toastMsg.id = "toast-msg"
    toastDiv.appendChild(toastMsg)

    document.body.appendChild(toastDiv)

    //Main div of log in
    const authDiv = document.createElement("div")
    authDiv.id = "auth-card"

    const authTitle = document.createElement("h1")
    authTitle.id = "auth-title"
    authTitle.textContent = "Log in"

    let logInForm = document.createElement("form")
    logInForm.id = "auth-form"

    const fields = [
        {id: 'email', label: 'Email', type: 'email'},
        {id: 'password', label: 'Password', type: 'password'}]

    logInForm = constructInputFields(fields, logInForm)

    const logInButton = document.createElement("button")
    logInButton.id = "login-button"
    logInButton.type = "button"
    logInButton.textContent = "Log In"
    logInButton.addEventListener('click', logInProcess)

    const logInFooter = document.createElement("p")
    logInFooter.id = "log-in-footer"
    logInFooter.textContent = "Don't have an account? "

    const signUpLink = document.createElement("a")
    signUpLink.href = "sign-up.html"
    signUpLink.textContent = "Sign Up"

    logInFooter.appendChild(signUpLink)
    logInForm.appendChild(logInButton)
    logInForm.appendChild(logInFooter)

    authDiv.appendChild(logInForm)

    return authDiv
}

// ## LOGIC FOR LOG IN  ##

async function logInProcess() {
    if (validationInputGuestLogIn()) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const divToast = document.getElementById("toast-div")
    const msgToast = document.getElementById("toast-msg")

    const loginData = {
        email: email,
        password: password
    };

    await fetch('/auth/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                divToast.style.display = "block"
                divToast.style.color = "#fe5151"
                msgToast.textContent = "The log in failed, please try again."
                return
            }
            divToast.style.display = "block"
            divToast.style.backgroundColor = "#02a702"
            msgToast.textContent = "The log in was successful, redirecting to main page."

            setTimeout(() => {
                window.location.href = "index.html"
            }, 2000)
        })
}

// ### USER PROFILE SECTION ###
async function userProfileView(appContainer) {
    const profileContainer = document.createElement("div")
    profileContainer.id = "profile-container"
    const userProfileForm = constructorUserProfile()

    profileContainer.appendChild(userProfileForm)

    const hotelsContainer = await constructorHotelsOwner()

    appContainer.appendChild(profileContainer)
    appContainer.appendChild(hotelsContainer)
}

function constructorUserProfile() {
    let formProfile = document.createElement("form")
    formProfile.id = "profile-card"

    const fields = [
        {id: 'firstName', label: 'First Name', type: 'text'},
        {id: 'lastName', label: 'Last Name', type: 'text'},
        {id: 'phone', label: 'Phone', type: 'text'}]

    formProfile = constructInputFields(fields, formProfile)

    const saveButton = document.createElement("button")
    saveButton.addEventListener('click', updateDataUser)
    saveButton.id = "save-profile"
    saveButton.type = "button"
    saveButton.textContent = "Save Changes"


    formProfile.appendChild(saveButton)

    return formProfile
}

async function constructorHotelsOwner() {
    const hotelsDiv = document.createElement("ul")
    hotelsDiv.id = "hotel-list"


    const hotels = await fetch('api/v1/guests/gethotels-byemail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        return res.json()
    })

    hotels.forEach(hotel => {
        const hotelContainer = document.createElement("li")
        hotelContainer.className = "hotel-item"

        const wrapperInfo = document.createElement("div")
        wrapperInfo.className = "hotel-info-wrapper"
        const hotelName = document.createElement("h3")
        const hotelLocation = document.createElement("p")
        hotelName.textContent = hotel.name
        hotelLocation.textContent = hotel.location

        hotelName.className = "hotel-name"
        hotelLocation.className = "hotel-location"

        const wrapperButtons = document.createElement("div")
        wrapperButtons.className = "hotel-buttons-wrapper"
        const seeButton = document.createElement("button")
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")
        seeButton.className = "hotel-see-button"

        seeButton.addEventListener('click', () => {
            window.open("/hotel.html?id=" + hotel.id, '_blank');
        })
        deleteButton.addEventListener("click", () => {
            deleteHotel(hotel.id, hotel.name)
        })
        editButton.addEventListener('click', () => {
            window.location.href = "/update-hotel.html?id=" + hotel.id
        })

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

        hotelContainer.appendChild(wrapperInfo)
        hotelContainer.appendChild(wrapperButtons)

        hotelsDiv.appendChild(hotelContainer)
    })

    return hotelsDiv
}

// # Update user data #
async function updateDataUser() {
    const inputFirstName = document.getElementById("firstName").value.trim()
    const inputLastName = document.getElementById("lastName").value.trim()
    const inputPhone = document.getElementById("phone").value.trim()

    const userData = {
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone
    }

    const statusInfo = await userStatusFetch()

    fetch('api/v1/guests/put/' + statusInfo.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(r => {
        if (!r.ok) throw new Error('Error in the server reply.');
        alert("User data updated successfully.")
        window.location.reload()
    })
}

// # Delete hotel function #
function deleteHotel(hotelId, hotelName) {
    if (!confirm("Are you sure about delete the hotel " + hotelName + "?")) return;

    fetch('api/v1/hotels/delete/' + hotelId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => {
        if (!r.ok) throw new Error('Error in the server reply.');
        alert("Hotel deleted successfully.")
        window.location.reload();
    })
}

// ### SUCCESS AND FAILED PAYMENT VIEWS ###
function successPaymentView(appContainer) {
    confirmBookingStatus()

    window.location.href = "index.html"
}

function failedPaymentView(appContainer) {
    cancelBookingStatus()

    window.location.href = "index.html"
}

// ## CONFIRM OR CANCEL BOOKING STATUS ##
function confirmBookingStatus() {
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get("paymentId")
    const payerId = params.get("PayerID")
    const url = 'api/v1/payment/execute-payment?paymentId=' + paymentId + '&payerId=' + payerId

    fetch(url, {
        // Adding method type
        method: "POST",

        body: JSON.stringify({}),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    alert("Booking confirmed successfully!")
}

function cancelBookingStatus() {
    const params = new URLSearchParams(window.location.search)
    const idBooking = params.get("idBooking")

    const url = 'api/v1/bookings/cancel-booking?idBooking=' + idBooking

    fetch(url, {
        // Adding method type
        method: "POST",

        body: JSON.stringify({}),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    alert("Payment failed. Please try again.")
}

// ### NOT FOUND ###
function notFoundView(appContainer) {
    const notFoundDiv = document.createElement("div")
    notFoundDiv.id = "not-found-container"

    const notFoundTitle = document.createElement("h2")
    notFoundTitle.id = "not-found-title"
    notFoundTitle.textContent = "404 - Page Not Found"

    const notFoundMsg = document.createElement("p")
    notFoundMsg.id = "not-found-msg"
    notFoundMsg.textContent = "The page you are looking for does not exist."

    notFoundDiv.appendChild(notFoundTitle)
    notFoundDiv.appendChild(notFoundMsg)

    appContainer.appendChild(notFoundDiv)
}

// ## AUTHENTICATION ##
// User status check
async function userStatusFetch() {
    return await fetch('/api/v1/guests/getLogged', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.' + res);
        return res.json()
    })
}

// User status builder
async function userStatusBuilder() {
    const userStatus = await userStatusFetch()
    const containerLogged = document.getElementById("user-status")

    if (userStatus.isLogged) {
        const userProfileLink = document.createElement("a")
        userProfileLink.href = "user-profile.html"

        const logOutButton = document.createElement("button")
        logOutButton.id = "log-out"
        logOutButton.textContent = "Log Out"
        logOutButton.addEventListener("click", logOut)

        const userName = document.createElement("span")
        userName.id = "user-name"
        userName.textContent = userStatus.fullName

        userProfileLink.appendChild(userName)

        containerLogged.appendChild(userProfileLink)
        containerLogged.appendChild(logOutButton)
    } else {
        //Only logged users could register hotels
        const registerLink = document.getElementById("register")
        registerLink.addEventListener("click", function () {
            registerLink.href = "sign-up-contributor.html"
        })

        const signUpLink = document.createElement("a")
        signUpLink.id = "sign-up"
        signUpLink.href = "sign-up.html"
        signUpLink.textContent = "Sign Up"

        const logInLink = document.createElement("a")
        logInLink.id = "log-in"
        logInLink.href = "log-in.html"
        logInLink.textContent = "Log In"

        containerLogged.appendChild(signUpLink)
        containerLogged.appendChild(logInLink)
    }
}

// Log out function
function logOut() {
    return fetch('auth/log-out', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');

        location.reload();
    })
}


// ### VALIDATION GUEST INPUTS ###
// # Booking validation #
function validationInputGuestBooking() {
    //HTML inputs
    const checkIn = document.getElementById("check-in").value
    checkIn.id = "check-in"
    const checkOut = document.getElementById("check-out").value
    const guestFirstName = document.getElementById("first-name").value.trim()
    const guestLastName = document.getElementById("last-name").value.trim()
    const guestEmail = document.getElementById("guest-email").value.trim()
    const guestPhone = document.getElementById("guest-phone").value.trim()
    const errorMsgRoomSelection = document.getElementById("booking-room_error")
    const idRoom = returnSelectedRoomID()
    //Error msg
    const errorMsgCheckIn = document.getElementById("hotel-checking__error")
    const errorMsgCheckOut = document.getElementById("hotel-checkout__error")
    const errorMsgFirstName = document.getElementById("guest-first-name__error")
    const errorMsgLastName = document.getElementById("guest-last-name__error")
    const errorMsgEmail = document.getElementById("guest-email__error")
    const errorMsgPhone = document.getElementById("guest-phone__error")

    let flag = false

    //Check if the inputs aren't undefined and have a minimum of characters

    if (checkIn === undefined || checkIn.length === 0) {
        errorMsgCheckIn.textContent = "Please select a check in date."
        flag = true;
    } else {
        errorMsgCheckIn.textContent = ""
    }
    if (checkOut === undefined || checkOut.length === 0) {
        errorMsgCheckOut.textContent = "Please select a check out date."
        flag = true;
    } else {
        errorMsgCheckOut.textContent = ""
    }

    if (guestFirstName === undefined || guestFirstName.length < 2) {
        errorMsgFirstName.textContent = "First name can't must have at least 3 letters."
        flag = true;
    } else {
        errorMsgFirstName.textContent = ""
    }
    if (guestLastName === undefined || guestLastName.length < 2) {
        errorMsgLastName.textContent = "Last name can't must have at least 3 letters."
        flag = true;
    } else {
        errorMsgLastName.textContent = ""
    }
    if (guestEmail === undefined || guestEmail.length < 5 || !guestEmail.includes("@")) {
        errorMsgEmail.textContent = "Email not valid."
        flag = true;
    } else {
        errorMsgEmail.textContent = ""
    }
    if (guestPhone === undefined || guestPhone.length !== 10) {
        errorMsgPhone.textContent = "Phone must have 10 digits."
        flag = true;
    } else {
        errorMsgPhone.textContent = ""
    }

    //Check for selected room
    if (idRoom === undefined || idRoom === -1) {
        errorMsgRoomSelection.textContent = "Please select a room."
        flag = true;
    } else {
        errorMsgRoomSelection.textContent = ""
    }

    return flag;
}

// # Log in validation #
function validationInputGuestLogIn() {
    const inputEmail = document.getElementById("email").value.trim()
    const inputPassword = document.getElementById("password").value.trim()
    const toastMsg = document.getElementById("toast-msg")
    const toastDiv = document.getElementById("toast-div")

    let flag = false

    if (inputEmail === undefined || inputEmail.length < 5 || !inputEmail.includes("@")) {
        toastDiv.style.display = "block"
        toastDiv.style.color = "#fe5151"
        toastMsg.textContent = "Email not valid."
        flag = true;
    }

    if (inputPassword === undefined || inputPassword.length < 5) {
        toastDiv.style.display = "block"
        toastDiv.style.color = "#fe5151"
        toastMsg.textContent = "Password must have at least 6 characters."
        flag = true;
    }

    return flag;

}


// ---------

userStatusBuilder()


