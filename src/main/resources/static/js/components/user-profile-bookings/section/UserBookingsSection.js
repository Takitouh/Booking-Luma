export class UserBookingsSection {
    constructor(container, bookings) {
        this.container = container
        this.bookings = bookings
    }

    mount() {
        const bookingsSection = this.render()
        this.container.appendChild(bookingsSection)
    }

    render() {
        const bookingsSection = document.createElement("section")
        bookingsSection.className = "booking-section"

        const bookingsList = document.createElement("ul")
        bookingsList.className = "booking-list"
        console.log(this.bookings)
        this.bookings.forEach(booking => {
            const bookingItem = document.createElement("li")
            bookingItem.className = "booking-item"

            const hotelName = document.createElement("h2")
            hotelName.textContent = booking.hotelDetails.name

            const hotelLocation = document.createElement("h3")
            hotelLocation.textContent = booking.hotelDetails.location

            const guestName = document.createElement("h4")
            guestName.textContent = "Guest: " + booking.guestName

            const roomNumber = document.createElement("h4")
            roomNumber.textContent = "Room: " + booking.roomNumber

            const checkInAndCheckOutDate = document.createElement("h4")
            checkInAndCheckOutDate.textContent = booking.checkIn + " - " + booking.checkOut

            const totalPrice = document.createElement("h4")
            totalPrice.textContent = "Total: " + booking.totalPrice + " " + booking.currency

            bookingItem.appendChild(hotelName)
            bookingItem.appendChild(hotelLocation)
            bookingItem.appendChild(guestName)
            bookingItem.appendChild(roomNumber)
            bookingItem.appendChild(checkInAndCheckOutDate)
            bookingItem.appendChild(totalPrice)

            bookingsList.appendChild(bookingItem)
        })
        bookingsSection.appendChild(bookingsList)

        return bookingsSection
    }
}