import {BuilderExistentRoomCard} from "../elements/BuilderExistentRoomCard.js";
import {BuilderAddRoomSection} from "../elements/BuilderAddRoomSection.js";

export class RoomInfoTab {
    constructor(container, roomsData, idHotel) {
        this.idHotel = idHotel
        this.container = container
        this.roomsData = roomsData
        this.didRender = false
        this.element = null // For caching the container
    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)
        this.oldRoomInstance.mount()
        this.newRoomInstance.mount()
    }

    render() {
        const infoTab = document.getElementById("info-tab")
        infoTab.innerHTML = ""
        //Existing rooms section
        this.oldRoomInstance = new BuilderExistentRoomCard(infoTab, this.roomsData)

        //New rooms section
        this.newRoomInstance = new BuilderAddRoomSection(infoTab, this.idHotel)


        this.didRender = true
        this.element = infoTab
        return infoTab
    }


}