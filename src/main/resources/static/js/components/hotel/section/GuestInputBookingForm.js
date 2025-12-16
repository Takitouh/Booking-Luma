import {BuilderInputs} from "../../common/BuilderInputs.js";
import {BuilderTableRooms} from "../elements/BuilderTableRooms.js";
import {BookingProcess} from "../utils/BookingProcess.js";
import {BuilderFlexBoxInputs} from "../../common/BuilderFlexBoxInputs.js";

export class GuestInputBookingForm {
    constructor(container, roomsData) {
        this.container = container
        this.roomsData = roomsData
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)
        this.bindListeners()
    }

    render() {
        const guestInfoForm = document.createElement("form")
        guestInfoForm.id = "guest-info"

        const names = [{id: 'user-first-name', label: 'First name', type: 'text'},
            {id: 'user-last-name', label: 'Last name', type: 'text'}]

        const flexBoxNames = BuilderFlexBoxInputs.builder(names)

        guestInfoForm.appendChild(flexBoxNames)

        const inputs = [
            {id: 'user-email', label: 'Email', type: 'email'},
            {id: 'user-phone', label: 'Phone', type: 'tel'}]


        BuilderInputs.builder(inputs, guestInfoForm)


        const dates = [
            {id: 'check-in', label: 'Check in', type: 'date'},
            {id: 'check-out', label: 'Check out', type: 'date'}]

        const flexBoxDates = BuilderFlexBoxInputs.builder(dates)
        guestInfoForm.appendChild(flexBoxDates)


        const tableRoomInstance = new BuilderTableRooms(guestInfoForm, this.roomsData)
        const tableRoom = tableRoomInstance.render()

        guestInfoForm.appendChild(tableRoom)

        const bookingButton = document.createElement("button");
        bookingButton.id = "booking-button"
        bookingButton.textContent = "Book Now"
        bookingButton.type = "button"

        guestInfoForm.appendChild(bookingButton)

        return guestInfoForm
    }

    bindListeners() {
        const bookingButton = document.getElementById("booking-button")
        const bookingProcess = new BookingProcess()
        bookingButton.addEventListener("click", () => bookingProcess.createPayment())

    }
}