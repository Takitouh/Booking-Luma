import {EditPersonalDataProcess} from "../utils/EditPersonalDataProcess.js";
import {BuilderFlexBoxInputs} from "../../common/BuilderFlexBoxInputs.js";
import {BuilderFilledInputs} from "../../common/BuilderFilledInputs.js";

export class UserProfilePersonalDataSection {
    constructor(container, userData) {
        this.container = container
        this.userData = userData
    }

    mount() {
        const userProfileInfoSection = this.render()
        this.container.appendChild(userProfileInfoSection)
        this.bindListeners()
    }

    render() {
        const userProfileInfoSection = document.createElement("section")

        const form = document.createElement("form")
        form.id = "profile-card"

        const namesData = [this.userData.firstName, this.userData.lastName]

        const namesInput = [{id: 'user-first-name', label: 'First name', type: 'text'},
            {id: 'user-last-name', label: 'Last name', type: 'text'}]

        const flexBoxNames = BuilderFlexBoxInputs.builderFilled(namesInput, namesData)
        console.log(flexBoxNames)
        console.log(form)
        form.appendChild(flexBoxNames)
        console.log(form)

        const userData = [this.userData.phone]
        const inputs = [{id: 'user-phone', label: 'Phone', type: 'tel'}]

        BuilderFilledInputs.builder(inputs, form, userData)

        const saveButton = document.createElement("button")
        saveButton.id = "save-profile"
        saveButton.type = "button"
        saveButton.textContent = "Save Changes"


        form.appendChild(saveButton)
        userProfileInfoSection.appendChild(form)

        return userProfileInfoSection
    }

    bindListeners() {
        const saveButton = document.getElementById("save-profile")
        saveButton.addEventListener('click', () => {
            EditPersonalDataProcess.process()
        })

    }
}