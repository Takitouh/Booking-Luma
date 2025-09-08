package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;
import java.util.Set;

public record CreateHotelDTO(
        @NotBlank(message = "Name can't be null or blank")
        String name,
        @NotBlank(message = "Location can't be null or blank")
        String location,
        @NotNull(message = "Schedule check-in can't be null")
        LocalTime scheduleCheckIn,
        @NotNull(message = "Schedule check-out can't be null")
        LocalTime scheduleCheckOut,
        @NotNull(message = "Schedule day use start can't be null")
        LocalTime scheduleDayUseStart,
        @NotNull(message = "Schedule day use end can't be null")
        LocalTime scheduleDayUseEnd,
        Set<String> amenities
) {
}
