import {SearchBarDiv} from "../main/elements/SearchBarDiv.js";
import {HotelCardDiv} from "../main/elements/HotelCardDiv.js";
import {HotelAPI} from "../../api/HotelAPI.js";

export class SearchResultPage {
    constructor(container) {
        this.container = container
    }

    async mount() {
        const html = this.render()
        this.container.appendChild(html)

        await this.init()

        this.searchBarInstance.mount()
        this.hotelCardsInstance.mount()
    }

    async init() {
        //Get the name of the hotel from the URL
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name')

        const hotelData = Array.of(await HotelAPI.getHotelByName(name))

        this.searchBarInstance = new SearchBarDiv(this.appContainer)
        this.hotelCardsInstance = new HotelCardDiv(this.appContainer, hotelData)
    }

    render() {
        const searchResultPage = document.createElement("div")
        searchResultPage.id = "search-result-page"
        return searchResultPage
    }
}