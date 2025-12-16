export class BuilderToast {
    constructor(container) {
        this.container = container
    }

    mount(){
        const html = this.render()
        this.container.appendChild(html)
    }

    render() {
        const divToast = document.createElement("div")
        divToast.id = "toast-div"
        const msgToast = document.createElement("p")
        msgToast.id = "toast-msg"

        divToast.appendChild(msgToast)
        return divToast
    }

    static renderMsg(isSuccessful, successMsg, failedMsg) {
        const divToast = document.getElementById("toast-div")
        const msgToast = document.getElementById("toast-msg")

        if (isSuccessful) {
            divToast.style.backgroundColor = "#02a702"
            msgToast.textContent = successMsg


        } else {
            divToast.style.backgroundColor = "#fe5151"
            msgToast.textContent = failedMsg
        }

        setTimeout(() => {
            window.location.href = "index.html"
        }, 1500)
    }

}