package com.Luma_v1.Hotel_Luma.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;
    private BigDecimal pricePerNight;

    @ManyToOne
    private Hotel hotel;

    @OneToMany(mappedBy = "room")
    private List<Booking> bookings = new ArrayList<>();
}