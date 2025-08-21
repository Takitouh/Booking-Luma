package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseGuestDTO;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.mapper.GuestMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceGuest implements IServiceGuest {

    private final IRepositoryGuest guestRepository;
    private final GuestMapper guestMapper;

    public ServiceGuest(IRepositoryGuest guestRepository, GuestMapper guestMapper) {
        this.guestRepository = guestRepository;
        this.guestMapper = guestMapper;
    }

    @Override
    public List<ResponseGuestDTO> findAll() {
        return guestRepository.findAll().stream()
                .map(guest -> guestMapper.toResponseDTO(guest)).collect(Collectors.toList());
    }

    @Override
    public ResponseGuestDTO findById(Long id) {
        return guestMapper.toResponseDTO(guestRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public ResponseGuestDTO save(CreateGuestDTO guest) {
        Guest guestEntity = guestMapper.toEntity(guest);
        return guestMapper.toResponseDTO(guestRepository.save(guestEntity));
    }

    @Override
    public void deleteById(Long id) {
        guestRepository.deleteById(id);
    }
}