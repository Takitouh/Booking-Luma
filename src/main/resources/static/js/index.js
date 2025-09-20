//Function to get the value of the search input and after redirect to the result

function redirectAfterSearch(){
    const searchInp = document.getElementById("searchInput");
    // const url = "localhost:8080/api/v1/hotels/find-by-name?name=" + searchInp.value;

    var params = new URLSearchParams();
    params.append('name', searchInp.value);

    const url = "searchResults.html?" + params.toString();

    location.href = url;

    // console.log(url)
    // document.location.href = "http://localhost:8080/api/v1/hotels/find-by-name?name=" + searchInp.value;
    // return url;
}

//Create the button element
const searchButton = document.getElementById("search-bar-button");
//Add the event listener to the button
searchButton.addEventListener("click", redirectAfterSearch)

fetch('/api/v1/hotels/get')
    .then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        return res.json();
    })
    .then(async hotels => {
        console.log('Hotels received:', hotels);

        const container = document.getElementById("hotels");
        container.innerHTML = "";

        if (await hotels == null){
            const title = document.createElement("h2");
            title.textContent = "No hotels found.";
            container.appendChild(title);
            return;
        }

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

            const img = document.createElement("img");
            img.src = "/api/v1/hotels/downloadImage/" + hotel.id;
            console.log("/api/v1/hotels/downloadImage/" + hotel.id)
            img.alt = "Hotel photo";
            img.className = "hotel-image"
            link.appendChild(img)

            link.appendChild(title)
            link.appendChild(desc)
            link.appendChild(location)

            card.appendChild(link);

            container.appendChild(card);
        });

    })
    .catch(err => console.error('Failed trying get the hotels:', err));







