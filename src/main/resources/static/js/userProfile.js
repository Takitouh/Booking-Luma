// ## AUTHENTICATION ##
// User status check
async function userStatusFetch() {
    return await fetch('api/v1/guests/getLogged', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        return res.json()
    })
}



// ## ACCOUNT SETTINGS ##
async function updateDataUser() {
    const inputFirstName = document.getElementById("firstName").value.trim()
    const inputLastName = document.getElementById("lastName").value.trim()
    const inputPhone = document.getElementById("phone").value.trim()

    const userData = {
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone
    }

    const statusInfo =  await userStatusFetch()

    fetch('api/v1/guests/put/' + statusInfo.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(r => {
        if (!r.ok) throw new Error('Error in the server reply.');
        alert("User data updated successfully.")
        return r.json()
    })
}

const buttonUpdateUser = document.getElementById("save-profile");
buttonUpdateUser.addEventListener("click", updateDataUser)

// ## HOTELS LIST ##
async function ownerHotelsFetch() {
    return await fetch('api/v1/guests/gethotels-byemail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');
        const response = res.json()
        return response
    })
}

async function builderHotelCard() {
    const hotelList = await ownerHotelsFetch();
    console.log(hotelList)
    console.log(typeof hotelList)

    if (hotelList == null || hotelList.length === 0) {
        document.getElementById("owner-hotels").innerHTML = "<h2>You don't have any hotels registered yet.</h2>";
        return;
    }

    hotelList.forEach(hotel => {
        const mainCardContainer = document.getElementById("owner-hotels-list");
        const cardHotel = document.createElement("a");
        cardHotel.className = "hotels-list";

        const wrapperButtons = document.createElement("div");
        wrapperButtons.className = "hotel-card-buttons";
        const buttonUpdate = document.createElement("button"); // # PENDING TO IMPLEMENT AFTER MIGRATION TO SPA
        buttonUpdate.textContent = "Update";
        buttonUpdate.className = "hotel-update-button";
        const buttonSeeHotel = document.createElement("button");
        buttonSeeHotel.textContent = "View";
        buttonSeeHotel.className = "hotel-see-button";

        buttonSeeHotel.addEventListener("click", () => {
            window.open("/hotel.html?id=" + hotel.id, '_blank');
        })

        const buttonDeleteHotel = document.createElement("button");
        buttonDeleteHotel.textContent = "Delete";
        buttonDeleteHotel.className = "hotel-delete-button";
        buttonDeleteHotel.addEventListener("click", () =>  deleteHotel(hotel.id, hotel.name))

        const title = document.createElement("h2");
        title.textContent = hotel.name;
        title.className = "hotel-title";

        const location = document.createElement("h3");
        location.textContent = hotel.location;
        location.className = "hotel-location";

        cardHotel.appendChild(title)
        cardHotel.appendChild(location)

        wrapperButtons.appendChild(buttonSeeHotel)
        wrapperButtons.appendChild(buttonUpdate)
        wrapperButtons.appendChild(buttonDeleteHotel)

        cardHotel.appendChild(wrapperButtons)
        mainCardContainer.appendChild(cardHotel)
    })
}

function deleteHotel(hotelId, hotelName) {
    if (!confirm("Are you sure about delete the hotel " + hotelName + "?")) return;


    fetch('api/v1/hotels/delete/' + hotelId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => {
        if (!r.ok) throw new Error('Error in the server reply.');
        alert("Hotel deleted successfully.")
        window.location.reload();
    })
}

builderHotelCard()