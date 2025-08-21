package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record PutHotelDTO(
        @NotBlank(message = "")
        String name,
        @NotBlank(message = "")
        String location,
        List<CreateRoomDTO> rooms
) {
}
