package com.Luma_v1.Hotel_Luma.dto;

import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;
import com.Luma_v1.Hotel_Luma.entity.Booking.BookingType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PatchBookingDTO(
        LocalDateTime checkIn,
        LocalDateTime checkOut,
        BookingStatus status,
        BookingType type,
        BigDecimal totalPrice,
        Long roomId,
        Long guestId
) {
}
