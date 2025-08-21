package com.Luma_v1.Hotel_Luma.dto;

import java.util.List;

public record ResponseHotelDTO(
    Long id,
    String name,
    String location,
    List<ResponseRoomDTO> rooms
) {}
