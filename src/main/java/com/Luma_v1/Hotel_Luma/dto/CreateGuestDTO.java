package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateGuestDTO(
        @NotBlank(message = "First name can't be null or blank")
        String firstName,
        @NotBlank(message = "Last name can't be null or blank")
        String lastName,
        @Email(message = "Email can't be null or blank")
        String email,
        String phone
) {
}
