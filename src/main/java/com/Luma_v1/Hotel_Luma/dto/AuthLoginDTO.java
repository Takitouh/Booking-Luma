package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthLoginDTO(@NotBlank String email, @NotBlank String password) {
}
