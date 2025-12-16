import {HotelInfoTab} from "./section/HotelInfoTab.js";
import {RoomInfoTab} from "./section/RoomInfoTab.js";
import {HotelAPI} from "../../api/HotelAPI.js";
import {BuilderTabs} from "./section/BuilderTabs.js";

export class AdminPanelHotelPage {
    constructor(container) {
        this.appContainer = container
    }

    async init(adminCont){
        const adminContainer = adminCont

        const pathSplit = window.location.pathname.split("/")

        this.idHotel = parseInt(pathSplit[2])


        this.hotelData = await HotelAPI.getHotelByID(this.idHotel)
        this.hotelTab = new HotelInfoTab(adminContainer, this.hotelData, this.idHotel)
        this.roomTab = new RoomInfoTab(adminContainer, this.hotelData.rooms, this.idHotel)
    }

     async mount() {
         const adminContainer = this.render()
         this.appContainer.appendChild(adminContainer)

         await this.init(adminContainer)

         const tabsInstance = new BuilderTabs(adminContainer, this.hotelData, this.hotelTab, this.roomTab)
         tabsInstance.mount()


     }

     render() {
        const adminContainer = document.createElement("div")
        adminContainer.id = "admin-hotel-page"

        return adminContainer
    }


}