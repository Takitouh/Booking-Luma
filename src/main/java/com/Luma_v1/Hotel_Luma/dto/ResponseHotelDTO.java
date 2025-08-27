package com.Luma_v1.Hotel_Luma.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record ResponseHotelDTO(
    Long id,
    String name,
    String location,
    LocalTime scheduleCheckIn,
    LocalTime scheduleCheckOut,
    LocalTime scheduleDayUseStart,
    LocalTime scheduleDayUseEnd,
    List<ResponseRoomDTO> rooms
) {}
