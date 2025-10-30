package com.Luma_v1.Hotel_Luma.dto;

import java.util.Set;

public record ResponseRoleDTO(Long idRole, String role, Set<ResponsePermissionDTO> permissions) {
}
