package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateRoomDTO(
        @NotBlank(message = "Number of the room can't be null or blank")
        String number,
        @NotNull(message = "Price per night can't be null")
        BigDecimal pricePerNight,
        @NotNull(message = "Hotel ID can't be null")
        Long idHotel
) {
}
