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
    @Column(unique = true, nullable = false)
    private String number;
    @Column(nullable = false)
    private BigDecimal normalFee; // Fee for staying overnight, with check-in
    @Column(nullable = false)
    private BigDecimal dayUseFee; //Fee for using the room during the day, without overnight stay

    @ManyToOne
    private Hotel hotel;

    @OneToMany(mappedBy = "room")
    private List<Booking> bookings = new ArrayList<>();
}