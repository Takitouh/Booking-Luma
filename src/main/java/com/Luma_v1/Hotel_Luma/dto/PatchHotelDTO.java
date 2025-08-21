package com.Luma_v1.Hotel_Luma.dto;

import java.util.List;

public record PatchHotelDTO(
        String name,
        String location,
        List<CreateRoomDTO> rooms
) {
}
