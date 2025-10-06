package com.Luma_v1.Hotel_Luma.dto;

import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record PatchBookingDTO(
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status,
        BigDecimal totalPrice,
        Long roomId,
        Long guestId
) {
}
