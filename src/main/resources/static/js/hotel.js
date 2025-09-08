// Obtain the ID of the hotel.
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

//Fetch to the REST API
fetch(`/api/v1/hotels/get/${hotelId}`).then(res => res.json())
    .then(hotel => {

        document.getElementById("hotel-name").innerText = hotel.name;
        document.getElementById("hotel-description").innerText = hotel.description || "No description available.";
        document.getElementById("hotel-location").innerText = hotel.location;
        document.getElementById("hotel-schedule-day-use").innerText = hotel.scheduleDayUseStart + " - " + hotel.scheduleDayUseEnd;
        document.getElementById("hotel-schedule-checking-checkout").innerText = hotel.scheduleCheckIn + " - " + hotel.scheduleCheckOut;
        const amenitiesList = document.createElement("ul");


        hotel.amenities.forEach(amenityItem => {
                const amenity = document.createElement("li");
                amenity.className = "hotel-amenities-item";
                amenity.innerText = amenityItem;
                amenitiesList.appendChild(amenity);
        })
            if (amenitiesList.childElementCount === 0) {
                    const amenity = document.createElement("li");
                    amenity.className = "hotel-amenities-item";
                    amenity.innerText = "No amenities available.";
                    amenitiesList.appendChild(amenity);
            }
            document.getElementById("hotel-amenities-list").appendChild(amenitiesList);

    });
