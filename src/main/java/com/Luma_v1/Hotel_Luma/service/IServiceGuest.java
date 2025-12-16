package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.*;
import jakarta.servlet.http.Cookie;

import java.util.List;
import java.util.Set;

public interface IServiceGuest {
    List<ResponseGuestDTO> findAll();

    ResponseGuestDTO findProfileData(String emailOwner);

    ResponseGuestDTO save(CreateGuestDTO guest);

    List<ResponseGuestDTO> saveAll(List<CreateGuestDTO> guests);

    //This method will check if guest exists according to his email, if it exists it will return the guest
    //Else will create a new guest
    ResponseGuestDTO getOldGuestOrCreateNewGuest(String email, CreateGuestDTO newGuest);

    UserStatusNameLogged getGuestNameIfLogged(Cookie[] cookies);

    void deleteById(String email);

    ResponseGuestDTO updateWithPut(PutGuestDTO guest, String email);

    ResponseGuestDTO updateWithPatch(PatchGuestDTO guest, String email);

    List<ResponseRoomNumAndBookingDateDTO> findBookingDateAndRoomNumAndGuestNameByGuestEmail(String email);

    Set<HotelNameLocationDTO> findHotelsOwner(String emailOwner);
}