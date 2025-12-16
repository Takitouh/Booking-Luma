export class HotelCardDiv {
    constructor(container, hotelData) {
        this.appContainer = container
        this.hotelData = hotelData
    }

    mount(){
        const html = this.render()
        this.appContainer.appendChild(html)

    }

    render() {
        const containerHotels = document.createElement("div")
        containerHotels.id = "hotels"

        if (this.hotelData === undefined || this.hotelData.length === 0) {
            const title = document.createElement("h2");
            title.textContent = "No hotels found.";
            containerHotels.appendChild(title);
            this.appContainer.appendChild(containerHotels);
            return
        }
        // # Construction of each hotel card #
        this.hotelData.forEach(hotel => {
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
}