import {RoomAPI} from "../../../api/RoomAPI.js";

export class ServiceRoom {
    static editRoom(roomID) {
        if (!confirm("Are you sure about edit this room?")) {
            return
        }

        const room = document.getElementById("room-" + roomID).querySelectorAll(".input-room input")
        let request = {}

        room.forEach(input => {
            const key = input.className
            request[key] = input.value
        })

        const response = RoomAPI.editRoom(request, roomID)

        if (response){
            alert("Room updated successfully")
        } else{
            alert("Room couldn't be updated, please try again.")
        }
        window.location.reload()
    }

    static deleteRoom(roomID) {
        if (!confirm("Are you sure about delete the room?")) {
            return
        }

        const delButton = document.getElementById("del-room-button")
        delButton.disabled = true
        delButton.backgroundColor = "GRAY"

        const response = RoomAPI.deleteRoom(roomID)

        if (response){
            alert("The room was deleted.")
        } else{
            alert("The room couldn't be deleted, please try again.")
        }
        window.location.reload()

    }

    static async createBatchRooms(hotelID) {
        //Get the containers of the rooms
        const roomCards = document.querySelectorAll(".new-room-container")

        //Map the number and fee of each container room
        const roomsList = Array.from(roomCards).map(room => {
            let roomNum = room.querySelector(".number")
            let roomFee = room.querySelector(".fee")

            return {number: roomNum.value, fee: roomFee.value}
        })

        console.log(roomsList)

        const response = RoomAPI.createBatchRooms(roomsList, hotelID)

        if (response){
            alert("Rooms created successfully.")
        } else{
            alert("There was an error in the creation process.")
        }

        window.location.reload()

    }
}