package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.mapper.HotelMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryHotel;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceHotel implements IServiceHotel {

    private final IRepositoryHotel hotelRepository;
    private final HotelMapper hotelMapper;

    public ServiceHotel(IRepositoryHotel hotelRepository, HotelMapper hotelMapper) {
        this.hotelRepository = hotelRepository;
        this.hotelMapper = hotelMapper;
    }

    @Override
    public List<ResponseHotelDTO> findAll() {
        return hotelRepository.findAll().stream().map(hotel -> hotelMapper.toResponseDTO(hotel)).collect(Collectors.toList());
    }

    @Override
    public ResponseHotelDTO findById(Long id) {
        return hotelMapper.toResponseDTO(hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public ResponseHotelDTO save(CreateHotelDTO hotel) {
        Hotel hotelEntity = hotelMapper.toEntity(hotel);
        return hotelMapper.toResponseDTO(hotelRepository.save(hotelEntity));
    }

    @Override
    public void deleteById(Long id) {
        hotelRepository.deleteById(id);
    }
}