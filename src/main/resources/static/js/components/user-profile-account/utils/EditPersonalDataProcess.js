import {UserAPI} from "../../../api/UserAPI.js";

export class EditPersonalDataProcess {
    static async process(){
        const inputFirstName = document.getElementById("user-first-name").value.trim()
        const inputLastName = document.getElementById("user-last-name").value.trim()
        const inputPhone = document.getElementById("user-phone").value.trim()

        const userData = {
            firstName: inputFirstName,
            lastName: inputLastName,
            phone: inputPhone
        }


        const responseEdit = await UserAPI.editUserData(userData)

        alert("User data updated successfully.")
        window.location.reload()
    }
}