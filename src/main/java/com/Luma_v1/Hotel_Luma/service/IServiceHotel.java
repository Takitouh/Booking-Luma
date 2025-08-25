package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PutHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;

import java.util.List;

public interface IServiceHotel {
    List<ResponseHotelDTO> findAll();

    ResponseHotelDTO findById(Long id);

    ResponseHotelDTO save(CreateHotelDTO hotel);
    List<ResponseHotelDTO> saveAll(List<CreateHotelDTO> hotels);

    void deleteById(Long id);

    ResponseHotelDTO updateWithPut(PutHotelDTO hotel, Long id);

    ResponseHotelDTO updateWithPatch(PatchHotelDTO hotel, Long id);
}