
//Fetch to the REST API
console.log("Iniciando fetch de hoteles...");

fetch('/api/v1/hotels/get')
    .then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        return res.json();
    })
    .then(hotels => {
        console.log('Hotels received:', hotels);

        const container = document.getElementById("hotels");
        container.innerHTML = "";

        hotels.forEach(hotel => {
            console.log(hotel.name, hotel.location);

            const card = document.createElement("article");
            card.className = "hotel-card";

            const title = document.createElement("h2");
            title.textContent = hotel.name;
            title.className = "hotel-title";

            const desc = document.createElement("p");
            desc.textContent = hotel.description || "No description.";
            desc.className = "hotel-description";

            const location = document.createElement("div");
            location.textContent = hotel.location;
            location.className = "hotel-location";

            const link = document.createElement("a");
            link.href = "/hotel.html?id=" + hotel.id;
            link.className = "hotel-link";


            link.appendChild(title)
            link.appendChild(desc)
            link.appendChild(location)

            card.appendChild(link);

            container.appendChild(card);
        });

})
    .catch(err => console.error('Failed trying get the hotels:', err));


