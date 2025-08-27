package com.Luma_v1.Hotel_Luma.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.Luma_v1.Hotel_Luma.entity.Booking.BookingStatus;
import com.Luma_v1.Hotel_Luma.entity.Booking.BookingType;

public record ResponseBookingDTO(
    Long id,
    LocalDateTime checkIn,
    LocalDateTime checkOut,
    BookingStatus status,
    BookingType type,
    BigDecimal totalPrice,
    String roomNumber,
    String guestName
) {}
