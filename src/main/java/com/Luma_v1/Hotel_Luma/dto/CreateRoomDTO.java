package com.Luma_v1.Hotel_Luma.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateRoomDTO(
        @NotBlank(message = "Number of the room can't be null or blank")
        String number,
        @NotNull(message = "Fee can't be null")
        BigDecimal fee,
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        Long idHotel
) {
}
