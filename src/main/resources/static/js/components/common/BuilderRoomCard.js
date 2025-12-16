export class BuilderRoomCard {
    builder(divWrapperRoom){
        //The dynamics containers and its delete button
        const divNewRoom = document.createElement("div")
        const delButton = document.createElement("button")
        //Labels and inputs for the number and fee
        const labNumber = document.createElement("label")
        const inpNumber = document.createElement("input")
        const labFee = document.createElement("label")
        const inpFee = document.createElement("input")

        divNewRoom.className = "new-room-container"
        labFee.className = "input-room"
        labNumber.className = "input-room"
        inpNumber.className = "number"
        inpFee.className = "fee"
        inpFee.name = "fee"
        inpNumber.name = "number"
        //Add function that deletes the dynamics containers of the rooms
        delButton.id = "del-room"
        delButton.className = "admin-room-button"
        delButton.addEventListener("click", () => divNewRoom.remove())

        delButton.textContent = "Delete room"
        labNumber.textContent = "Number room"
        labFee.textContent = "Fee room"

        inpNumber.type = "text"
        inpFee.type = "text"
        delButton.type = "button"

        labNumber.appendChild(inpNumber)
        labFee.appendChild(inpFee)

        divNewRoom.appendChild(delButton)
        divNewRoom.appendChild(labNumber)
        divNewRoom.appendChild(labFee)

        divWrapperRoom.appendChild(divNewRoom)
    }
}