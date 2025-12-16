export class BuilderTabs {
    constructor(container, hotelData, hotelTabInstance, roomTabInstance) {
        this.container = container
        this.hotelTab = hotelTabInstance
        this.roomTab = roomTabInstance

    }

    mount() {
        const html = this.render()
        this.container.appendChild(html)
        this.bindListener()
        document.getElementById("tab-general-info").click()
    }

    render() {
        const tabsContainer = document.createElement("div")
        tabsContainer.id = "tab-container"

        const tabGeneralInfo = document.createElement("button")
        tabGeneralInfo.id = "tab-general-info"
        tabGeneralInfo.className = "admin-hotel-tab"
        tabGeneralInfo.textContent = "General information"
        tabGeneralInfo.type = "button"

        const tabRooms = document.createElement("button")
        tabRooms.id = "tab-rooms"
        tabRooms.className = "admin-hotel-tab"
        tabRooms.textContent = "Rooms configuration"
        tabRooms.type = "button"

        tabsContainer.appendChild(tabGeneralInfo)
        tabsContainer.appendChild(tabRooms)

        return tabsContainer
    }

    bindListener() {
        const tabGeneralInfo = document.getElementById("tab-general-info")
        const tabRooms = document.getElementById("tab-rooms")

        tabGeneralInfo.addEventListener('click', () => {
            this.hotelTab.mount()
        })
        tabRooms.addEventListener('click', () => {
            this.roomTab.mount()
        })
    }
}