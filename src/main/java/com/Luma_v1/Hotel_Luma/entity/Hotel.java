package com.Luma_v1.Hotel_Luma.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String location;

    private LocalTime scheduleCheckIn; // e.g., 14:00
    private LocalTime scheduleCheckOut; // e.g., 10:00

    private LocalTime scheduleDayUseStart; // e.g., 8:00
    private LocalTime scheduleDayUseEnd; // e.g., 20:00

    @OneToMany(mappedBy = "hotel")
    private List<Room> rooms = new ArrayList<>();
}