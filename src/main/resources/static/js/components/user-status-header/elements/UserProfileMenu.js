export class UserProfileMenu {
    constructor(container){
        this.appContainer = container
    }

    mount(){
        const menu = this.render()
        this.appContainer.appendChild(menu)
    }

    render(){
        const menu = document.createElement("div")
        menu.id = "menu-account-div"
        const logOutButton = document.createElement("button")
        logOutButton.id = "log-out"
        logOutButton.textContent = "Log out"

        menu.appendChild(logOutButton)
        return menu
    }
}