export class BuilderTableRooms {
    constructor(container, roomsData) {
        this.container = container
        this.roomsData = roomsData
        this.render()
    }

    mount(){
        const html= this.render()
        this.container.appendChild(html)
    }

    render(){
        const roomTableWrapper = document.createElement("div")
        const spanError = document.createElement("span")
        spanError.id = "error-room-selection"
        const roomTable = document.createElement("table")
        roomTable.id = "hotel__booking-rooms-table"
        const tableHeader = document.createElement("tr")
        const headerRoomNumbers = document.createElement("th")
        headerRoomNumbers.textContent = "Room Numbers"
        headerRoomNumbers.className = "hotel__booking-rooms-header"
        const headerRoomPrice = document.createElement("th")
        headerRoomPrice.textContent = "Price"
        headerRoomPrice.className = "hotel__booking-rooms-header"
        tableHeader.appendChild(headerRoomNumbers)
        tableHeader.appendChild(headerRoomPrice)
        roomTable.appendChild(tableHeader)

        this.roomsData.forEach(roomHotel => {
            this.constructorRoom(roomHotel, roomTable);
        })

        roomTableWrapper.appendChild(spanError)
        roomTableWrapper.appendChild(roomTable)

        return roomTableWrapper
    }

    constructorRoom(roomHotel, roomTable){
        const room = document.createElement("tr") //The full row
        const hotelRoomsNumbers = document.createElement("td") //This contains the number of room
        const roomFee = document.createElement("td") //Fee of room
        const roomSelector = document.createElement("input") //Radio
        const roomNumber = document.createElement("label") //The number of the room

        roomSelector.id = "hotel__booking-room-selector"
        roomSelector.type = "radio"
        roomSelector.name = "hotel-room"
        roomSelector.value = roomHotel.id

        roomFee.textContent = roomHotel.fee
        roomNumber.textContent = roomHotel.number

        hotelRoomsNumbers.className = "hotel__booking-room-numbers"
        room.className = "hotel__booking-room"
        roomFee.className = "hotel__booking-room-price"
        hotelRoomsNumbers.className = "hotel__booking-room-price"

        roomNumber.appendChild(roomSelector)

        hotelRoomsNumbers.appendChild(roomSelector)
        hotelRoomsNumbers.appendChild(roomNumber)

        room.appendChild(hotelRoomsNumbers)
        room.appendChild(roomFee)

        roomTable.appendChild(room)
    }
}