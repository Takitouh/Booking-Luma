import {ServiceRoom} from "../utils/ServiceRoom.js";

export class BuilderExistentRoomCard {
    constructor(container, roomsData) {
        this.container = container
        this.roomsData = roomsData
    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)
    }

    render() {
        const oldRoomsSection = document.createElement("section")
        oldRoomsSection.id = "old-room-section"
        oldRoomsSection.className = "admin-room-section"

        const oldRoomsDiv = document.createElement("div")
        oldRoomsDiv.className = "rooms-div"

        const oldRoomsTitle = document.createElement("h2")
        oldRoomsTitle.className = "admin-room-title"
        oldRoomsTitle.textContent = "Existent rooms"

        oldRoomsSection.appendChild(oldRoomsTitle)

        this.roomsData.forEach(room => {
            //The dynamics containers and its delete button
            const newRoomCard = document.createElement("div")
            const delButton = document.createElement("button")
            const updateRoomButton = document.createElement("button")
            //Labels and inputs for the number and fee
            const labNumber = document.createElement("label")
            const inpNumber = document.createElement("input")
            const labFee = document.createElement("label")
            const inpFee = document.createElement("input")

            updateRoomButton.addEventListener("click", () => ServiceRoom.editRoom(room.id))
            delButton.addEventListener("click", () => ServiceRoom.deleteRoom(room.id))

            newRoomCard.className = "room-div"
            newRoomCard.id = "room-" + room.id
            labFee.className = "input-room"
            labNumber.className = "input-room"
            inpNumber.className = "number"
            inpFee.className = "fee"
            inpFee.name = "fee"
            inpNumber.name = "number"
            inpNumber.value = room.number
            inpFee.value = room.fee
            // Buttons
            updateRoomButton.id = "reg-button-" + room.id
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

            newRoomCard.appendChild(delButton)
            newRoomCard.appendChild(updateRoomButton)
            newRoomCard.appendChild(labNumber)
            newRoomCard.appendChild(labFee)

            oldRoomsDiv.appendChild(newRoomCard)
        })

        oldRoomsSection.appendChild(oldRoomsDiv)

        return oldRoomsSection
    }
}