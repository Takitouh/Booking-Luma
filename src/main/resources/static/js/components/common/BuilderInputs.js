export class BuilderInputs {

    static builder(listInputs, form) {
        listInputs.forEach(inp => {
            const divField = document.createElement("div")
            divField.className = "div-input"
            const spanError = document.createElement("span")
            spanError.id = "error-" + inp.id
            spanError.className = "error-input"
            divField.appendChild(spanError)

            const label = document.createElement("label")
            label.className = "label-input"

            let input;

            if (inp.id === "description") {
                input = document.createElement("textarea")
                input.id = inp.id
                input.rows = 3
            } else {
                input = document.createElement("input")
                input.id = inp.id
                input.type = inp.type
            }

            input.className = "input-field"
            label.setAttribute('for', inp.id)
            label.textContent = inp.label

            label.appendChild(input)
            divField.appendChild(label)
            form.appendChild(divField)
        })
    }
}