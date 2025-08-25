package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PutRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomHotelNameDTO;

import java.util.List;

public interface IServiceRoom {
    List<ResponseRoomHotelNameDTO> findAll();

    ResponseRoomHotelNameDTO findById(Long id);

    ResponseRoomHotelNameDTO save(CreateRoomDTO room);

    List<ResponseRoomHotelNameDTO> saveAll(List<CreateRoomDTO> rooms);

    void deleteById(Long id);

    ResponseRoomHotelNameDTO updateWithPut(PutRoomDTO room, Long id);

    ResponseRoomHotelNameDTO updateWithPatch(PatchRoomDTO room, Long id);

}