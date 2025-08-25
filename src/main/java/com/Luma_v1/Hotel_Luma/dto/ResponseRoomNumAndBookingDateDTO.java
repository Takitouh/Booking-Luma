package com.Luma_v1.Hotel_Luma.dto;

import java.util.Date;

public record ResponseRoomNumAndBookingDateDTO(String nameCustomer, String roomNum, Date CheckIn, Date CheckOut) {
}
