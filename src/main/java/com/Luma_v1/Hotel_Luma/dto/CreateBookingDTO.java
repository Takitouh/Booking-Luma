package com.Luma_v1.Hotel_Luma.dto;

import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateBookingDTO(
        @NotNull(message = "")
        LocalDate checkIn,
        @NotNull(message = "")
        LocalDate checkOut,
        @NotNull(message = "")
        BookingStatus status,
        @NotNull(message = "")
        BigDecimal totalPrice,
        @NotNull(message = "")
        Long roomId,
        @NotNull(message = "")
        Long guestId
) {
}
