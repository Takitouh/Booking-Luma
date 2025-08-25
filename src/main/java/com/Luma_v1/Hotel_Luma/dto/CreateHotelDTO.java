package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record CreateHotelDTO(
        @NotBlank(message = "Name can't be null or blank")
        String name,
        @NotBlank(message = "Location can't be null or blank")
        String location
) {
}
