export class AuthCard{
    constructor(container) {
        this.container = container
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)
    }

    render(){
        const authCard = document.createElement("div")
        authCard.id = "auth-card"

        return authCard
    }
}