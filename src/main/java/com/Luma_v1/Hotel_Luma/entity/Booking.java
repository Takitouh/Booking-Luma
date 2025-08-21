package com.Luma_v1.Hotel_Luma.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate checkIn;
    
    @Column(nullable = false)
    private LocalDate checkOut;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    
    private BigDecimal totalPrice;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", nullable = false)
    private Guest guest;
    
    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
}