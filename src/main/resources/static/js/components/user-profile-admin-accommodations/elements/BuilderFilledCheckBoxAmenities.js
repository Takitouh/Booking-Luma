export class BuilderFilledCheckBoxAmenities {
    static builder(amenitiesList, form, amenitiesFilled) {
        const fieldSet = document.createElement("fieldset")
        fieldSet.className = "amenity-group"
        const legend = document.createElement("legend")
        legend.textContent = "Select Amenities:"
        fieldSet.appendChild(legend)
        amenitiesList.forEach(amenity => {
            const label = document.createElement("label")
            label.className = "label-amenity"
            const amenityText = document.createTextNode(amenity.value)

            const checkbox = document.createElement("input")
            checkbox.id = amenity.id
            checkbox.name = "amenities"
            checkbox.type = "checkbox"
            checkbox.value = amenity.value

            if (amenitiesFilled.includes(amenity.value)){
                checkbox.checked = true
            }

            label.appendChild(checkbox)
            label.appendChild(amenityText)
            fieldSet.appendChild(label)
        })
        form.appendChild(fieldSet)
    }
}