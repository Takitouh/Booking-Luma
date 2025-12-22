export class BuilderAccommodationTypeRadioButton {
    static builder(accommodationTypes) {
        const fieldSet = document.createElement("fieldset")
        fieldSet.className = "accommodation-group"
        const legend = document.createElement("legend")
        legend.textContent = "Select type of accommodation:"
        fieldSet.appendChild(legend)
        accommodationTypes.forEach(accommodation => {
            const label = document.createElement("label")
            label.className = "label-amenity"
            const radioText = document.createTextNode(accommodation.name)

            const radio = document.createElement("input")
            radio.name = "accommodation"
            radio.type = "radio"
            radio.value = accommodation.value

            label.appendChild(radio)
            label.appendChild(radioText)
            fieldSet.appendChild(label)

        })
        return fieldSet
    }
}