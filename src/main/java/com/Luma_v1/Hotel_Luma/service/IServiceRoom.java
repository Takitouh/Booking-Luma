package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomHotelNameDTO;

import java.util.List;

public interface IServiceRoom {
    List<ResponseRoomHotelNameDTO> findAll();

    ResponseRoomHotelNameDTO findById(Long id);

    ResponseRoomHotelNameDTO save(CreateRoomDTO room);

    void deleteById(Long id);
}