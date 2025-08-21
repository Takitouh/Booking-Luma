package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateGuestDTO(
        @NotBlank(message = "")
        String firstName,
        @NotBlank(message = "")
        String lastName,
        @Email(message = "")
        String email,
        String phone
) {
}
