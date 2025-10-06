package com.Luma_v1.Hotel_Luma.dto;

import java.math.BigDecimal;

public record ResponseRoomDTO(
        Long id,
        String number,
        BigDecimal fee
) {
}
