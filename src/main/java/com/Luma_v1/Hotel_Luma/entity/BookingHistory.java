package com.Luma_v1.Hotel_Luma.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class BookingHistory {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private LocalDateTime createdAt;

    private String roomID;

    private String guestID;

    private LocalDate checkIn;

    private LocalDate checkOut;

    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private Booking.BookingStatus status;

    private String method = "paypal"; //Hardcode method, currency and intent for now

    private String currency = "USD";

    private String intent = "sale";
}
