package com.Luma_v1.Hotel_Luma.dto;

import com.Luma_v1.Hotel_Luma.entity.Booking;
import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CreateBookingDTO(
        @NotNull(message = "Check in can't be null")
        LocalDateTime checkIn,
        @NotNull(message = "Check out can't be null")
        LocalDateTime checkOut,
        @NotNull(message = "Status can't be null")
        BookingStatus status,
        @NotNull(message = "Type of booking can't be null")
        Booking.BookingType type,
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        BigDecimal totalPrice,
        @NotNull(message = "Room ID can't be null")
        Long roomId,
        @NotNull(message = "Guest ID can't be null")
        Long guestId
) {
}
