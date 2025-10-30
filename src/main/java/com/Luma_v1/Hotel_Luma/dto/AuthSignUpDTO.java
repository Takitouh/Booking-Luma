package com.Luma_v1.Hotel_Luma.dto;


import jakarta.validation.constraints.NotBlank;

public record AuthSignUpDTO(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String email,
                            @NotBlank String password, String phone) {
}
