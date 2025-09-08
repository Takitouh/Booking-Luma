package com.Luma_v1.Hotel_Luma.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public record PatchHotelDTO(
        String name,
        String location,
        LocalTime scheduleCheckIn,
        LocalTime scheduleCheckOut,
        LocalTime scheduleDayUseStart,
        LocalTime scheduleDayUseEnd,
        List<CreateRoomDTO> rooms,
        Set<String> amenities
) {
}
