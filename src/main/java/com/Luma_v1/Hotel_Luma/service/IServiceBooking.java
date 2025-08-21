package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.entity.Booking;
import java.util.List;
import java.util.Optional;

public interface IServiceBooking {
    List<ResponseBookingDTO> findAll();
    ResponseBookingDTO findById(Long id);
    ResponseBookingDTO save(CreateBookingDTO booking);
    void deleteById(Long id);
}