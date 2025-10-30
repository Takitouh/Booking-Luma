package com.Luma_v1.Hotel_Luma.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"email", "message", "jwtToken", "status"})
public record AuthResponseDTO(String email, String message, String jwtToken, boolean status) {
}
