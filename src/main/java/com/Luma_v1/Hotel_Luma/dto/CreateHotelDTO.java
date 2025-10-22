package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;
import java.util.Set;

public record CreateHotelDTO(
        @NotBlank(message = "Name can't be null or blank")
        String name,
        @NotBlank(message = "Description can't be null or blank")
        String description,
        @NotBlank(message = "Location can't be null or blank")
        String location,
        @NotNull(message = "Schedule check-in can't be null")
        LocalTime scheduleCheckIn,
        @NotNull(message = "Schedule check-out can't be null")
        LocalTime scheduleCheckOut,
        Set<String> amenities
) {
}
