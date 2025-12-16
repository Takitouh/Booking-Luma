export class BookingProcess {

    async createPayment() {
        //Use function for validation of inputs
        if (this.validationInputGuestBooking()) {
            return;
        }

        const booking = await this.createBooking()

        console.log(booking)

        const payment = await fetch('api/v1/payment/create-payment', {
            // Adding method type
            method: "POST",

            // Adding parameters of the booking
            body: JSON.stringify(booking),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!payment.ok) {
            throw new Error("Error creating the payment of the booking.")
        }

        const paypalUrl = await payment.text()

        window.location.href = paypalUrl
    }

    async createBooking() {
        //Get the information needed to create the booking
        const checkIn = document.getElementById("check-in")
        const checkOut = document.getElementById("check-out")
        const idGuest = await this.returnIDGuest()
        const idRoom = this.returnSelectedRoomID()

        const booking = await fetch('api/v1/bookings/post', {
            // Adding method type
            method: "POST",
            // Adding parameters of the booking
            body: JSON.stringify({
                checkIn: checkIn.value,
                checkOut: checkOut.value,
                roomId: idRoom,
                guestId: idGuest
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!booking.ok) {
            throw new Error("Error while making the booking process.")
        }

        console.log(booking)

        return booking.json();

    }

    returnSelectedRoomID() {
        let idRoom = -1;
        document.getElementsByName("hotel-room").forEach(roomS => {
            if (roomS.checked) {
                idRoom = roomS.value
                return idRoom;
            }
        })
        return idRoom; //In case of no selection return -1
    }

    async returnIDGuest() {
        const inpFirstName = document.getElementById("user-first-name")
        const inpLastName = document.getElementById("user-last-name")
        const inpEmail = document.getElementById("user-email")
        const inpPhone = document.getElementById("user-phone")
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

        if (!guest.ok) {
            throw new Error("Error handling data of guest.")
        }

        const jsonGuest = await guest.json()
        const idGuest = jsonGuest.id

        return idGuest
    }

    validationInputGuestBooking() {
        //HTML inputs
        const checkIn = document.getElementById("check-in").value
        const checkOut = document.getElementById("check-out").value
        const guestFirstName = document.getElementById("user-first-name").value.trim()
        const guestLastName = document.getElementById("user-last-name").value.trim()
        const guestEmail = document.getElementById("user-email").value.trim()
        const guestPhone = document.getElementById("user-phone").value.trim()
        const idRoom = this.returnSelectedRoomID()
        //Error msg
        const errorMsgCheckIn = document.getElementById("error-check-in")
        const errorMsgCheckOut = document.getElementById("error-check-out")
        const errorMsgFirstName = document.getElementById("error-user-first-name")
        const errorMsgLastName = document.getElementById("error-user-last-name")
        const errorMsgEmail = document.getElementById("error-user-email")
        const errorMsgPhone = document.getElementById("error-user-phone")
        const errorMsgRoomSelection = document.getElementById("error-room-selection")

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


}