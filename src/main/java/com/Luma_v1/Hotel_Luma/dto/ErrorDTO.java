package com.Luma_v1.Hotel_Luma.dto;

public record ErrorDTO(
    int status,
    String error,
    String message
) {}
