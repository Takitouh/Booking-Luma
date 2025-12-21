package com.Luma_v1.Hotel_Luma.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GuestBookingDTO(HotelNameLocationDTO hotelDetails,
                              LocalDate checkIn,
                              LocalDate checkOut,
                              BigDecimal totalPrice,
                              String roomNumber,
                              String guestName,
                              String currency) {
}
