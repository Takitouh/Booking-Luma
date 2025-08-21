package com.Luma_v1.Hotel_Luma.dto;

public record ResponseGuestDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone
) {}
