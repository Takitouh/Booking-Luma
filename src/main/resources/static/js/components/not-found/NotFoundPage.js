import {NotFoundMsg} from "./section/NotFoundMsg.js";

export class NotFoundPage {
    constructor(container) {
        this.appContainer = container
    }

    init(container){
        this.notFoundMsgInstance = new NotFoundMsg(container)

    }

    mount(){
        const html = this.render()
        this.appContainer.appendChild(html)
        this.init(html)
        this.notFoundMsgInstance.mount()
    }

    render(){
        const notFoundPage = document.createElement("div")
        notFoundPage.id = "not-found-page"
        return notFoundPage
    }
}