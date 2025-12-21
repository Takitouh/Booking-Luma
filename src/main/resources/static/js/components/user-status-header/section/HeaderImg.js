export class HeaderImg {
    constructor(header) {
        this.header = header
    }

    mount(){
      const headerImg = this.render()
        this.header.appendChild(headerImg)
    }

    render(){
        const indexLink = document.createElement("a")
        indexLink.id = "logo"
        indexLink.href = "/index.html"
        const logo = document.createElement("img")
        logo.src = "/imgs/Booking-Luma.png"
        logo.alt = "Logo luma booking"

        indexLink.appendChild(logo)

        return indexLink
    }
}