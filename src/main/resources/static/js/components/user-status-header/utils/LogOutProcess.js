import {UserAPI} from "../../../api/UserAPI.js";

export class LogOutProcess {
    static async process(){
        await UserAPI.userLogOut()
        window.location.href = "/index.html"
    }
}