package com.Luma_v1.Hotel_Luma.dto;


import java.math.BigDecimal;

public record PatchRoomDTO(
        String number,
        BigDecimal pricePerNight,
        Long idHotel
) {
}
