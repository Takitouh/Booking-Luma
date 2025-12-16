export class NotFoundMsg {
    constructor(container) {
        this.container = container
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)

    }



    render(){
        const notFoundDiv = document.createElement("div")
        notFoundDiv.id = "not-found-container"

        const notFoundTitle = document.createElement("h2")
        notFoundTitle.id = "not-found-title"
        notFoundTitle.textContent = "404 - Page Not Found"

        const notFoundMsg = document.createElement("p")
        notFoundMsg.id = "not-found-msg"
        notFoundMsg.textContent = "The page you are looking for doesn't exist."

        notFoundDiv.appendChild(notFoundTitle)
        notFoundDiv.appendChild(notFoundMsg)

        return notFoundDiv
    }
}