package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseGuestDTO;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import java.util.List;
import java.util.Optional;

public interface IServiceGuest {
    List<ResponseGuestDTO> findAll();
    ResponseGuestDTO findById(Long id);
    ResponseGuestDTO save(CreateGuestDTO guest);
    void deleteById(Long id);
}