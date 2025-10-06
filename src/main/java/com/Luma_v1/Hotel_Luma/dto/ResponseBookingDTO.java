package com.Luma_v1.Hotel_Luma.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;

public record ResponseBookingDTO(
    Long id,
    LocalDate checkIn,
    LocalDate checkOut,
    BookingStatus status,
    BigDecimal totalPrice,
    String roomNumber,
    String guestName
) {}
