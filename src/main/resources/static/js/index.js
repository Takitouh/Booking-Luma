userStatusBuilder()

constructorHotelCards()

// ### SEARCH BAR ###
const searchButton = document.getElementById("search-bar-button");
searchButton.addEventListener("click", redirectAfterSearch)

//Function to get the value of the search input and after redirect to the result
function redirectAfterSearch() {
    const searchInp = document.getElementById("searchInput").value.trim();

    const params = new URLSearchParams();
    params.append('name', searchInp);

    location.href = "searchResults.html?" + params.toString();
}


// ## HOTEL CARDS ##
// Construction of hotel cards
async function constructorHotelCards() {

    await fetch('/api/v1/hotels/get')
        .then(res => {
            if (!res.ok) throw new Error('Error in the server reply.');
            return res.json();
        })
        .then(async hotels => {

            const container = document.getElementById("hotels");

            if (await hotels == null || hotels.length === 0) {
                const title = document.createElement("h2");
                title.textContent = "No hotels found.";
                container.appendChild(title);
                return;
            }

            constructorOfCardHotel(hotels, container);

        })
        .catch(err => console.error('Failed trying get the hotels:', err));
}
//Construction of each hotel card
function constructorOfCardHotel(hotels, container) {
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


// ## AUTHENTICATION ##
// User status check
async function userStatusFetch() {
    return await fetch('/api/v1/guests/getLogged', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.'+ res);
        return res.json()
    })
}

//User status builder
async function userStatusBuilder() {
    const userStatus = await userStatusFetch()
    const containerLogged = document.getElementById("user-status")

    if (userStatus.isLogged) {
        const userProfileLink = document.createElement("a")
        userProfileLink.href = "user-profile.html"

        const logOutButton = document.createElement("button")
        logOutButton.id = "log-out"
        logOutButton.textContent = "Log Out"
        logOutButton.addEventListener("click", logOut)

        const userName = document.createElement("span")
        userName.id = "user-name"
        userName.textContent = userStatus.fullName

        userProfileLink.appendChild(userName)

        containerLogged.appendChild(userProfileLink)
        containerLogged.appendChild(logOutButton)
    } else {
        //Only logged users could register hotels
        const registerLink = document.getElementById("register")
        registerLink.addEventListener("click", function () {
            registerLink.href = "signup-contributor.html"
        })

        const signUpLink = document.createElement("a")
        signUpLink.id = "sign-up"
        signUpLink.href = "signUp.html"
        signUpLink.textContent = "Sign Up"

        const logInLink = document.createElement("a")
        logInLink.id = "log-in"
        logInLink.href = "login.html"
        logInLink.textContent = "Log In"

        containerLogged.appendChild(signUpLink)
        containerLogged.appendChild(logInLink)
    }
}

// Log out function
function logOut() {
    return fetch('auth/log-out', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) throw new Error('Error in the server reply.');

        location.reload();
    })
}





