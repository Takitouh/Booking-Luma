package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateRoomDTO(
        @NotBlank(message = "Number of the room can't be null or blank")
        String number,
        @NotNull(message = "Normal fee can't be null")
        BigDecimal normalFee,
        @NotNull(message = "Day use fee can't be null")
        BigDecimal dayUseFee,
        @NotNull(message = "Hotel ID can't be null")
        Long idHotel
) {
}
