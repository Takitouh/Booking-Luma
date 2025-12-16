// Utility for build inputs elements inside a flexbox container for display in a row
export class BuilderFlexBoxInputs {
    static builder(listInputs) {
        const containerFlex = document.createElement("div")
        containerFlex.className = "flex-div-input"

        listInputs.forEach((inp) => {
            const spanError = document.createElement("span")
            spanError.id = "error-" + inp.id
            spanError.className = "error-input"
            containerFlex.appendChild(spanError)
            const label = document.createElement("label")
            const input = document.createElement("input")
            label.id = "lab-" + inp.id
            label.className = inp.type === "date" ? "label-date" : "label-input"
            label.setAttribute('for', inp.id)
            label.textContent = inp.label
            input.className = "input-field"
            input.type = inp.type
            input.id = inp.id

            label.appendChild(input)
            containerFlex.appendChild(label)
        })

        return containerFlex
    }

    /*
    * The list of inputs and the data must be in the same order.
    */
    static builderFilled(listInputs, listData) {
        const containerFlex = document.createElement("div")
        containerFlex.className = "flex-div-input"


        if (listInputs.length !== listData.length){
            console.error("Mismatch in the size of the parameters.")
            return containerFlex
        }

        for(let i = 0; i < listInputs.length; i++) {
            const spanError = document.createElement("span")
            spanError.id = "error-" + listInputs[i].id
            spanError.className = "error-input"
            containerFlex.appendChild(spanError)
            const label = document.createElement("label")
            const input = document.createElement("input")
            label.id = "lab-" + listInputs[i].id
            label.className = listInputs[i].type === "date" ? "label-date" : "label-input"
            label.setAttribute('for', listInputs[i].id)
            label.textContent = listInputs[i].label
            input.className = "input-field"
            input.type = listInputs[i].type
            input.id = listInputs[i].id
            input.value = listData[i]

            label.appendChild(input)
            containerFlex.appendChild(label)
        }

        return containerFlex
    }
}