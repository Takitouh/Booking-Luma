package com.Luma_v1.Hotel_Luma.dto;

import java.math.BigDecimal;

public record ResponseRoomHotelNameDTO(Long id,
                                       String number,
                                       BigDecimal pricePerNight,
                                       String hotelName) {
}
