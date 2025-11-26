package com.Luma_v1.Hotel_Luma.dto;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public record PatchHotelDTO(
        String name,
        String location,
        String description,
        LocalTime scheduleCheckIn,
        LocalTime scheduleCheckOut,
        Set<String> amenities
) {
}
