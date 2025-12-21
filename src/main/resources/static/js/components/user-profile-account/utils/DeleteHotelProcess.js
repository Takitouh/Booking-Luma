import {HotelAPI} from "../../../api/HotelAPI.js";

export class DeleteHotelProcess {
    static process(hotelID){
        if (!confirm("Are you sure about delete this hotel?")) return;

        HotelAPI.deleteHotel(hotelID)

        alert("Hotel deleted successfully.")
        window.location.reload();

    }
}