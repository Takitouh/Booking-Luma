package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PutBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;

import java.util.List;

public interface IServiceBooking {
    List<ResponseBookingDTO> findAll();

    ResponseBookingDTO findById(Long id);

    ResponseBookingDTO save(CreateBookingDTO booking);

    List<ResponseBookingDTO> saveAll(List<CreateBookingDTO> bookings);

    void deleteById(Long id);

    ResponseBookingDTO updateWithPut(PutBookingDTO booking, Long id);

    ResponseBookingDTO updateWithPatch(PatchBookingDTO booking, Long id);
}