package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import java.util.List;
import java.util.Optional;

public interface IServiceHotel {
    List<ResponseHotelDTO> findAll();
    ResponseHotelDTO findById(Long id);
    ResponseHotelDTO save(CreateHotelDTO hotel);
    void deleteById(Long id);
}