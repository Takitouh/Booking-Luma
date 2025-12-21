import {MainPage} from "../components/main/MainPage.js";
import {SearchResultPage} from "../components/search-result/SearchResultPage.js";
import {HotelPage} from "../components/hotel/HotelPage.js";
import {RegisterHotelPage} from "../components/register-hotel/RegisterHotelPage.js";
import {AdminPanelHotelPage} from "../components/user-profile-admin-accommodations/AdminPanelHotelPage.js";
import {SignUpPage} from "../components/sign-up/SignUpPage.js";
import {SignUpContributorPage} from "../components/sign-up-contributor/SignUpContributorPage.js";
import {LogInPage} from "../components/log-in/LogInPage.js";
import {UserProfileAccountPage} from "../components/user-profile-account/UserProfileAccountPage.js";
import {SuccessPaymentPage} from "../components/success-payment/SuccessPaymentPage.js";
import {FailedPaymentPage} from "../components/failed-payment/FailedPaymentPage.js";
import {NotFoundPage} from "../components/not-found/NotFoundPage.js";
import {UserProfileBookingsPage} from "../components/user-profile-bookings/UserProfileBookingsPage.js";
import {UserProfileAccommodationsPage} from "../components/user-profile-accommodations/UserProfileAccommodationsPage.js";

export default class Routes {

    constructor() {
        this.appContainer = document.getElementById("app")
    }

    RoutesMap() {
        const routes = {
            "/index.html": new MainPage(this.appContainer),
            "/search-results.html": new SearchResultPage(this.appContainer),
            "/hotel.html": new HotelPage(this.appContainer),
            "/my-profile/settings.html": new UserProfileAccountPage(this.appContainer),
            "/my-profile/accommodations.html": new UserProfileAccommodationsPage(this.appContainer),
            "/my-profile/bookings.html": new UserProfileBookingsPage(this.appContainer),
            "/sign-up.html": new SignUpPage(this.appContainer),
            "/log-in.html": new LogInPage(this.appContainer),
            "/register-hotel.html": new RegisterHotelPage(this.appContainer),
            "/error-payment.html": new FailedPaymentPage(this.appContainer),
            "/success-payment.html": new SuccessPaymentPage(this.appContainer),
            "/sign-up-contributor.html": new SignUpContributorPage(this.appContainer),
            "/edit-hotel.html": new AdminPanelHotelPage(this.appContainer),
            "/404.html": new NotFoundPage(this.appContainer)
        }

        return routes
    }

    dynamicRoutes(dynaRoute) {
        const regexEditHotelPage = /\/edit-hotel\/\d+.html/

        if (regexEditHotelPage.test(dynaRoute)) {
            return new AdminPanelHotelPage(this.appContainer)
        }

    }
}