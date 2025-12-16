export class SearchBarDiv {
    constructor(container) {
        this.appContainer = container
    }

    mount(){
        const html = this.render()
        this.appContainer.appendChild(html)
        this.bindListeners()
    }

    render(){
        const searchBarDiv = document.createElement("div")
        searchBarDiv.id = "search-bar-div"

        const searchInput = document.createElement("input")
        searchInput.id = "search-input"
        searchInput.type = "text"
        searchInput.placeholder = "Search hotels by name"

        const searchButton = document.createElement("button")
        searchButton.id = "search-bar-button"
        searchButton.textContent = "Search"

        searchBarDiv.appendChild(searchInput)
        searchBarDiv.appendChild(searchButton)

        return searchBarDiv
    }

    bindListeners(){
        const searchButton = document.getElementById("search-bar-button")
        searchButton.addEventListener('click', this.redirectSearch)
    }

    redirectSearch() {
        const searchInp = document.getElementById("search-input").value.trim();
        const params = new URLSearchParams();
        params.append('name', searchInp);
        location.href = "search-results.html?" + params.toString();
    }
}