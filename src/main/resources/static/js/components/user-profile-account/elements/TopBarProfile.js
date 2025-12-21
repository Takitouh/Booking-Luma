export class TopBarProfile {
    constructor(container) {
        this.appContainer = container
    }

    mount() {
        const topBar = this.render()
        this.appContainer.appendChild(topBar)
        this.bindListener()
    }

    render() {
        const topBar = document.createElement("nav")
        topBar.id = "top-bar-profile"

        const linkList = document.createElement("ul")
        linkList.id = "top-bar-profile-list"

        const accountSectionItem = document.createElement("li")
        accountSectionItem.id = "profile-info-item"
        accountSectionItem.className = "top-bar-profile-item"
        const accountSectionButton = document.createElement("button")
        accountSectionButton.id = "account-section-link"
        accountSectionButton.textContent = "Account settings"
        accountSectionButton.className = "top-bar-profile-button"
        accountSectionItem.appendChild(accountSectionButton)

        const hotelSectionItem = document.createElement("li")
        hotelSectionItem.id = "hotel-section-item"
        hotelSectionItem.className = "top-bar-profile-item"
        const hotelSectionButton = document.createElement("button")
        hotelSectionButton.id = "hotel-section-link"
        hotelSectionButton.textContent = "Accommodations"
        hotelSectionButton.className = "top-bar-profile-button"
        hotelSectionItem.appendChild(hotelSectionButton)

        const bookingSectionItem = document.createElement("li")
        bookingSectionItem.id = "booking-item"
        bookingSectionItem.className = "top-bar-profile-item"
        const bookingSectionButton = document.createElement("button")
        bookingSectionButton.id = "booking-section-link"
        bookingSectionButton.textContent = "Bookings"
        bookingSectionButton.className = "top-bar-profile-button"
        bookingSectionItem.appendChild(bookingSectionButton)

        linkList.appendChild(accountSectionItem)
        linkList.appendChild(hotelSectionItem)
        linkList.appendChild(bookingSectionItem)

        topBar.appendChild(linkList)

        return topBar
    }

    bindListener() {
        const accountSectionButton = document.getElementById("account-section-link")
        const hotelSectionButton = document.getElementById("hotel-section-link")
        const bookingSectionButton = document.getElementById("booking-section-link")

        accountSectionButton.addEventListener("click", () => {
            window.location.href = "/my-profile/settings.html"
        })
        hotelSectionButton.addEventListener("click", () => {
            window.location.href = "/my-profile/accommodations.html"
        })
        bookingSectionButton.addEventListener("click", () => {
            window.location.href = "/my-profile/bookings.html"
        })
    }
}