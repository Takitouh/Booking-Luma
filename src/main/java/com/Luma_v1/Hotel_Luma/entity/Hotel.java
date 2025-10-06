package com.Luma_v1.Hotel_Luma.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    @Column(nullable = false)
    private String location;

    @ElementCollection
    @CollectionTable(name = "hotel_amenities", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "amenity")
    private Set<String> amenities = new HashSet<>(); // e.g., WiFi, Pool, Gym

    @Column(nullable = false)
    private LocalTime scheduleCheckIn; // e.g., 14:00
    @Column(nullable = false)
    private LocalTime scheduleCheckOut; // e.g., 10:00


    //attributes for img
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String nameContent;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String typeContent;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imageContent; // Store image as byte array

    @OneToMany(mappedBy = "hotel")
    private List<Room> rooms = new ArrayList<>();
}