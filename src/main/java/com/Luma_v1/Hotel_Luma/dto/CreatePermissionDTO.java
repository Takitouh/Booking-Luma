package com.Luma_v1.Hotel_Luma.dto;

import jakarta.validation.constraints.NotBlank;

public record CreatePermissionDTO(
        @NotBlank(message = "Permission can't be blank or null")
        String permissionName) {
}
