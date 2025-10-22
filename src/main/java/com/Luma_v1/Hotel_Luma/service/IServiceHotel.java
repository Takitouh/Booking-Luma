package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IServiceHotel {
    List<ResponseHotelDTO> findAll();

    ResponseHotelDTO findById(Long id);

    ResponseHotelDTO save(CreateHotelDTO hotel);

    List<ResponseHotelDTO> saveAll(List<CreateHotelDTO> hotels);

    void deleteById(Long id);

    ResponseHotelDTO updateWithPut(PutHotelDTO hotel, Long id);

    ResponseHotelDTO updateWithPatch(PatchHotelDTO hotel, Long id);

    String uploadHotelImage(MultipartFile file, Long idHotel) throws IOException;

    Hotel downloadHotelImage(Long idHotel);

    ResponseHotelDTO findByName(String name) throws BadRequestException;

    void registerHotel(CreateHotelDTO hotelDTO, List<CreateRoomDTO> roomDTOS, MultipartFile file) throws IOException;
}