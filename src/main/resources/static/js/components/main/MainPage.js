import {HotelAPI} from "../../api/HotelAPI.js";
import {HotelCardDiv} from "./elements/HotelCardDiv.js";
import {SearchBarDiv} from "./elements/SearchBarDiv.js";

export class MainPage {
    constructor(container) {
        this.appContainer = container
    }

    async mount(){
        const html = this.render()
        this.appContainer.appendChild(html)

        await this.init(html)

        this.searchBarInstance.mount()
        this.hotelCardsInstance.mount()
    }

    async init(container){
        const hotelData = await HotelAPI.getAllHotels()

        this.searchBarInstance = new SearchBarDiv(container)
        this.hotelCardsInstance = new HotelCardDiv(container, hotelData)
    }

     render() {
        const mainPage = document.createElement("div")
        mainPage.id = "main-page"

        return mainPage
    }
}