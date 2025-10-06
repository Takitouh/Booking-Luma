package com.Luma_v1.Hotel_Luma.dto;

import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PutBookingDTO(
        @NotNull(message = "Check in can't be null")
        LocalDate checkIn,
        @NotNull(message = "Check out can't be null")
        LocalDate checkOut,
        @NotNull(message = "Status can't be null")
        BookingStatus status,
        @NotNull(message = "Total price can't be null")
        BigDecimal totalPrice,
        @NotNull(message = "Room ID can't be null")
        Long roomId,
        @NotNull(message = "Guest ID can't be null")
        Long guestId
) {
}
