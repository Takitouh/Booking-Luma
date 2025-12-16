export class BuilderFilledInputs {
    /*
     * The list of inputs and the data must be in the same order.
     */
    static builder(listInputs, form, data) {
        if (listInputs.length !== data.length){
            console.error("Mismatch in the size of the parameters.")
            return
        }

        for (let i = 0; i < data.length; i++) {
            const divField = document.createElement("div")
            divField.className = "div-input"
            const spanError = document.createElement("span")
            spanError.id = "error-" + listInputs[i].id
            spanError.className = "error-input"
            divField.appendChild(spanError)
            const label = document.createElement("label")
            label.className = "label-input"
            let input;

            if (listInputs[i].id === "description") {
                input = document.createElement("textarea")
                input.id = listInputs[i].id
                input.rows = 3
                input.textContent = data[i]

            } else {
                input = document.createElement("input")
                input.id = listInputs[i].id
                input.type = listInputs[i].type
            }

            input.className = "input-field"
            input.value = data[i]

            label.setAttribute('for', listInputs[i].id)
            label.textContent = listInputs[i].label

            label.appendChild(input)
            divField.appendChild(label)
            form.appendChild(divField)
        }
    }
}