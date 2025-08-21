package com.Luma_v1.Hotel_Luma.dto;

import java.time.LocalDateTime;

public record ErrorDTO(
    LocalDateTime timestamp,
    int status,
    String error,
    String message
) {}
