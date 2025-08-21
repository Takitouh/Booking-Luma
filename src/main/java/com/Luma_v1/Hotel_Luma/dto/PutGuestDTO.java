package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;

public record PutGuestDTO(
        @NotBlank(message = "")
        String firstName,
        @NotBlank(message = "")
        String lastName,
        @NotBlank(message = "")
        String email,
        String phone
) {
}
