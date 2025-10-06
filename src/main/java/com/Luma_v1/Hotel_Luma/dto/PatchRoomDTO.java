package com.Luma_v1.Hotel_Luma.dto;


import java.math.BigDecimal;

public record PatchRoomDTO(
        String number,
        BigDecimal fee,
        Long idHotel
) {
}
