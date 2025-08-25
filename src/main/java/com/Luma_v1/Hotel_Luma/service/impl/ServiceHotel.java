package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PutHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.mapper.HotelMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryHotel;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        hotelRepository.save(hotelEntity);
        return hotelMapper.toResponseDTO(hotelRepository.save(hotelEntity));
    }

    @Override
    public List<ResponseHotelDTO> saveAll(List<CreateHotelDTO> hotels) {
        List<Hotel> hotelList = new ArrayList<>();
        List<ResponseHotelDTO> responses = new ArrayList<>();
        for (CreateHotelDTO hotelDTO : hotels) {
            hotelList.add(hotelMapper.toEntity(hotelDTO));
        }
        hotelRepository.saveAll(hotelList);
        for (Hotel hotel : hotelList) {
            responses.add(hotelMapper.toResponseDTO(hotel));
        }
        return responses;
    }

    @Override
    public void deleteById(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public ResponseHotelDTO updateWithPut(PutHotelDTO hotel, Long id) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Hotel newHotel = hotelMapper.toEntity(hotel);

        oldHotel.setName(newHotel.getName());
        oldHotel.setLocation(newHotel.getLocation());
        oldHotel.setRooms(newHotel.getRooms());
        hotelRepository.save(oldHotel);

        return hotelMapper.toResponseDTO(oldHotel);
    }

    @Override
    public ResponseHotelDTO updateWithPatch(PatchHotelDTO hotel, Long id) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Hotel newHotel = hotelMapper.toEntity(hotel, oldHotel);

        oldHotel.setName(newHotel.getName() != null ? newHotel.getName() : oldHotel.getName());
        oldHotel.setLocation(newHotel.getLocation() != null ? newHotel.getLocation() : oldHotel.getLocation());
        oldHotel.setRooms(newHotel.getRooms() != null ? newHotel.getRooms() : oldHotel.getRooms());
        hotelRepository.save(oldHotel);

        return hotelMapper.toResponseDTO(oldHotel);
    }
}