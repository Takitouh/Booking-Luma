// ### SEARCH BAR ###
//Create the button element
const searchButton = document.getElementById("search-bar-button");
//Add the event listener to the button
searchButton.addEventListener("click", redirectAfterSearch)

//Function to get the value of the search input and after redirect to the result
function redirectAfterSearch(){
    const searchInp = document.getElementById("searchInput").value.trim();

    var params = new URLSearchParams();
    params.append('name', searchInp);

    location.href = "searchResults.html?" + params.toString();
}

// ### CONSTRUCTOR OF HOTELS CARDS ###
fetch('/api/v1/hotels/get')
    .then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        return res.json();
    })
    .then(async hotels => {

        const container = document.getElementById("hotels");

        if (await hotels == null || hotels.length === 0){
            const title = document.createElement("h2");
            title.textContent = "No hotels found.";
            container.appendChild(title);
            return;
        }

         constructorOfHotels(hotels, container);

    })
    .catch(err => console.error('Failed trying get the hotels:', err));


function constructorOfHotels(hotels, container){
    hotels.forEach(hotel => {
        const card = document.createElement("article");
        card.className = "hotel-card";

        const title = document.createElement("h2");
        title.textContent = hotel.name;
        title.className = "hotel-title";

        const location = document.createElement("div");
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

        container.appendChild(card);
    });
}






