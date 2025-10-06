package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.mapper.GuestMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
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
        guestRepository.save(guestEntity);
        return guestMapper.toResponseDTO(guestRepository.save(guestEntity));
    }

    @Override
    public List<ResponseGuestDTO> saveAll(List<CreateGuestDTO> guests) {
        List<Guest> guestList = new ArrayList<>();
        List<ResponseGuestDTO> responses = new ArrayList<>();
        for (CreateGuestDTO guestDTO : guests) {
            guestList.add(guestMapper.toEntity(guestDTO));
        }
        guestRepository.saveAll(guestList);
        for (Guest guest : guestList) {
            responses.add(guestMapper.toResponseDTO(guest));
        }
        return responses;
    }

    //Check if any guest have the email, if true so it returns it, else will create a new guest
    @Override
    public ResponseGuestDTO createNewGuest(String email, CreateGuestDTO newGuest) {
        Guest guest = guestRepository.findByEmail(email);
        if (guest != null) {
            log.info("Guest with email {} already exists", email);
            return guestMapper.toResponseDTO(guest);
        }
        ResponseGuestDTO responseGuestDTO = this.save(newGuest);
        return responseGuestDTO;
    }

    @Override
    public void deleteById(Long id) {
        guestRepository.deleteById(id);
    }

    @Override
    public ResponseGuestDTO updateWithPut(PutGuestDTO guest, Long id) {
        Guest oldGuest = guestRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Guest newGuest = guestMapper.toEntity(guest);

        oldGuest.setEmail(newGuest.getEmail());
        oldGuest.setFirstName(newGuest.getFirstName());
        oldGuest.setLastName(newGuest.getLastName());
        oldGuest.setPhone(newGuest.getPhone());
        oldGuest.setBookings(newGuest.getBookings());

        guestRepository.save(oldGuest);

        return guestMapper.toResponseDTO(oldGuest);
    }

    @Override
    public ResponseGuestDTO updateWithPatch(PatchGuestDTO guest, Long id) {
        Guest oldGuest = guestRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Guest newGuest = guestMapper.toEntity(guest, oldGuest);

        oldGuest.setEmail(newGuest.getEmail() != null ? newGuest.getEmail() : oldGuest.getEmail());
        oldGuest.setFirstName(newGuest.getFirstName() != null ? newGuest.getFirstName() : oldGuest.getFirstName());
        oldGuest.setLastName(newGuest.getLastName() != null ? newGuest.getLastName() : oldGuest.getLastName());
        oldGuest.setPhone(newGuest.getPhone() != null ? newGuest.getPhone() : oldGuest.getPhone());
        oldGuest.setBookings(newGuest.getBookings() != null ? newGuest.getBookings() : oldGuest.getBookings());

        guestRepository.save(oldGuest);

        return guestMapper.toResponseDTO(oldGuest);
    }

    @Override
    public List<ResponseRoomNumAndBookingDateDTO> findBookingDateAndRoomNumAndGuestNameByGuestEmail(String email) {
        return guestRepository.findBookingsByGuestEmail(email);
    }
}