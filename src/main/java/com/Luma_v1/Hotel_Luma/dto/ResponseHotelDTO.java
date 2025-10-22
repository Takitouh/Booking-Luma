package com.Luma_v1.Hotel_Luma.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public record ResponseHotelDTO(
    Long id,
    String name,
    String description,
    String location,
    LocalTime scheduleCheckIn,
    LocalTime scheduleCheckOut,
    List<ResponseRoomDTO> rooms,
    Set<String> amenities
) {}
