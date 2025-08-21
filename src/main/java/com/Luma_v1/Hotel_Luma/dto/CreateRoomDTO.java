package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateRoomDTO(
        @NotBlank(message = "")
        String number,
        @NotNull(message = "")
        BigDecimal pricePerNight,
        @NotNull(message = "")
        Long idHotel
) {
}
