package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.mapper.GuestMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ServiceGuest implements IServiceGuest {

    private final IRepositoryGuest guestRepository;
    private final GuestMapper guestMapper;
    private final JwtUtils jwtUtils;

    public ServiceGuest(IRepositoryGuest guestRepository, GuestMapper guestMapper, JwtUtils jwtUtils) {
        this.guestRepository = guestRepository;
        this.guestMapper = guestMapper;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public List<ResponseGuestDTO> findAll() {
        return guestRepository.findAll().stream()
                .map(guestMapper::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public ResponseGuestDTO findProfileData(String email) {
        return guestMapper.toResponseDTO(guestRepository.findByEmail(email));
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
    public ResponseGuestDTO getOldGuestOrCreateNewGuest(String email, CreateGuestDTO newGuest) {
        Guest guest = guestRepository.findByEmail(email);
        if (guest != null) {
            log.info("Guest with email {} already exists", email);
            return guestMapper.toResponseDTO(guest);
        }
        return this.save(newGuest);
    }

    @Override
    public UserStatusNameLogged getGuestNameIfLogged(Cookie[] cookies) {
        log.info("Cookies null? {}", cookies == null);
        /* # Important assert decodedJWT isn't null .getDecodedJWTFromCookie(cookies)
        could return null in the case of users without account */
        DecodedJWT decodedJWT = cookies != null ? jwtUtils.getDecodedJWTFromCookie(cookies) : null;
        if (decodedJWT != null) {

            //Empty string for no log users
            String email = jwtUtils.getEmailFromToken(decodedJWT);
            Guest guest = guestRepository.findByEmail(email);

            if (guest == null) {
                return new UserStatusNameLogged(null, "", "", false);
            }

            String guestName = "Welcome, " + guest.getFirstName() + " " + guest.getLastName();
            boolean isLogged = true;

            return new UserStatusNameLogged(guest.getId(), guestName, email, isLogged);
        } else {

            return new UserStatusNameLogged(null, "", "", false);
        }
    }


    @Override
    public void deleteById(String email) {
        Guest guest = guestRepository.findByEmail(email);
        guestRepository.deleteById(guest.getId());
    }

    @Override
    public ResponseGuestDTO updateWithPut(PutGuestDTO putGuestDTO, String email) {
        Guest oldGuest = guestRepository.findByEmail(email);

        oldGuest.setFirstName(putGuestDTO.firstName());
        oldGuest.setLastName(putGuestDTO.lastName());
        oldGuest.setPhone(putGuestDTO.phone());

        guestRepository.save(oldGuest);

        return guestMapper.toResponseDTO(oldGuest);
    }

    @Override
    public ResponseGuestDTO updateWithPatch(PatchGuestDTO guest, String email) {
        Guest oldGuest = guestRepository.findByEmail(email);
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

    @Override
    public Set<HotelNameLocationDTO> findHotelsOwner(String emailOwner) {
        return guestRepository.findHotelsByGuestEmail(emailOwner);
    }
}