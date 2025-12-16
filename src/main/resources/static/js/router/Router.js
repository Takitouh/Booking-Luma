import {UserStatusHeader} from "../components/user-status/UserStatusHeader.js";

class Router {
    constructor() {

    }

    async getInstanceRoutes() {
        const module = await import("./Routes.js")
        const routesClass = module.default
        return new routesClass(document.getElementById("app"))
    }

    async init() {
        console.log("Initializing config SPA router.")
        this.routesInstance = await this.getInstanceRoutes()

        this.bindListener()
        // Run the router for the initial page load
        this.router();
        console.log("Finished config SPA router.")
    }

    router() {
        const staticRoutes = this.routesInstance.RoutesMap()
        const path = window.location.pathname

        window.history.pushState({}, '', path + window.location.search)
        let view = staticRoutes[path] || "/404"

        const header = document.querySelector("header")
        header.innerHTML = "" // Clear header

        const userStatusHeader = new UserStatusHeader(header)
        userStatusHeader.mount()

        const appContainer = document.getElementById("app")
        appContainer.innerHTML = "" //Clear the container

        // Check if it is a dynamic route to change its value from 404
        if (view === "/404") {
            view = this.routesInstance.dynamicRoutes(path)
        }


        view.mount()
    }

    bindListener() {
        // Start the router when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            // Attach event listeners to any links that should use SPA navigation
            document.body.addEventListener('click', e => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault();
                    this.router();
                }
            });
        });

        window.addEventListener('popstate', () => {
            this.router()
        })
    }
}

const routerInstance = new Router()

export {routerInstance}