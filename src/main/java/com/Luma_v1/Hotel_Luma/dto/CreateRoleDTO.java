package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record CreateRoleDTO(
        @NotBlank(message = "The name of the role can't be blank or null")
        String role,
        Set<@NotNull(message = "The role must have at least one permission") Long> permissionsIds
) {
}
