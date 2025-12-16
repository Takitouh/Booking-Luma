import {BuilderRoomCard} from "../../common/BuilderRoomCard.js";
import {ServiceRoom} from "../utils/ServiceRoom.js";

export class BuilderAddRoomSection {
    constructor(container, idHotel) {
        this.container = container
        this.idHotel = idHotel
    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)
        this.bindListener(this.idHotel)
        document.getElementById("add-room").click()
    }

    render() {
        const newRoomsSection = document.createElement("section")
        newRoomsSection.id = "new-rooms-section"

        const newRoomsDiv = document.createElement("div")
        newRoomsDiv.className = "rooms-div"
        newRoomsDiv.id = "rooms-div"
        const newRoomsTitle = document.createElement("h2")
        newRoomsTitle.className = "admin-room-title"
        newRoomsTitle.textContent = "Add new rooms"


        const addRoomButton = document.createElement("button")
        addRoomButton.id = "add-room"
        addRoomButton.type = "button"
        addRoomButton.textContent = "+ Add Room"

        const createRoomButton = document.createElement("button")
        createRoomButton.id = "create-room"
        createRoomButton.className = "btn-stl1"
        createRoomButton.type = "button"
        createRoomButton.textContent = "Create"

        newRoomsSection.appendChild(newRoomsTitle)
        newRoomsSection.appendChild(addRoomButton)
        newRoomsSection.appendChild(newRoomsDiv)
        newRoomsSection.appendChild(createRoomButton)

        return newRoomsSection
    }

    bindListener(idHotel) {
        const newRoomsDiv = document.getElementById("rooms-div")
        const addRoomButton = document.getElementById("add-room")
        const createRoomButton = document.getElementById("create-room")


        addRoomButton.addEventListener("click", () => {
            const builderCard = new BuilderRoomCard()
            builderCard.builder(newRoomsDiv)
        })

        createRoomButton.addEventListener("click", () => ServiceRoom.createBatchRooms(idHotel))


    }
}