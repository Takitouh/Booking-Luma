package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.*;

import java.util.List;

public interface IServiceGuest {
    List<ResponseGuestDTO> findAll();

    ResponseGuestDTO findById(Long id);

    ResponseGuestDTO save(CreateGuestDTO guest);
    List<ResponseGuestDTO> saveAll(List<CreateGuestDTO> guests);

    void deleteById(Long id);

    ResponseGuestDTO updateWithPut(PutGuestDTO guest, Long id);
    ResponseGuestDTO updateWithPatch(PatchGuestDTO guest, Long id);

    List<ResponseRoomNumAndBookingDateDTO> findBookingDateAndRoomNumAndGuestNameByGuestEmail(String email);
}