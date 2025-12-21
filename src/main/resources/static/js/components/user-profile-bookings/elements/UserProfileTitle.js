export class UserProfileTitle {
    constructor(container, msgTitle) {
        this.appContainer = container
        this.msgTitle = msgTitle
    }

    mount(){
        const title = this.render()
        this.appContainer.appendChild(title)
    }

    render(){
        const title = document.createElement("h1")
        title.textContent = this.msgTitle
        title.className = "booking-title"

        return title
    }
}