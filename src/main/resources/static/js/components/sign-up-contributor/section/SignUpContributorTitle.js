export class SignUpContributorTitle {
    constructor(container) {
        this.container = container
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)
    }

    render(){
        const title = document.createElement("h2")
        title.id = "auth-title"
        title.textContent = "Become contributor."

        return title
    }
}