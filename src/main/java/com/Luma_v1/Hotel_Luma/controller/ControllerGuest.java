package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/guests")
public class ControllerGuest {

    private final IServiceGuest guestService;
    private final JwtUtils jwtUtils;

    public ControllerGuest(IServiceGuest guestService, JwtUtils jwtUtils) {
        this.guestService = guestService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseGuestDTO>> getAllGuests() {
        return new ResponseEntity<>(guestService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-profile-data")
    public ResponseEntity<ResponseGuestDTO> getGuestById(HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String emailOwner = jwtUtils.getEmailFromToken(decodedJWT);

        return new ResponseEntity<>(guestService.findProfileData(emailOwner), HttpStatus.OK);
    }

    @GetMapping("/getLogged")
    public ResponseEntity<UserStatusNameLogged> getGuestIfLogged(HttpServletRequest request) {
        return new ResponseEntity<>(guestService.getGuestNameIfLogged(request.getCookies()), HttpStatus.OK);
    }


    @PostMapping("/post")
    public ResponseEntity<ResponseGuestDTO> createGuest(@RequestBody CreateGuestDTO guest) {
        return new ResponseEntity<>(guestService.save(guest), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseGuestDTO>> createGuests(@RequestBody List<CreateGuestDTO> guests) {
        return new ResponseEntity<>(guestService.saveAll(guests), HttpStatus.CREATED);
    }

    @PostMapping("/post-booking-guest")
    public ResponseEntity<ResponseGuestDTO> createNonExistingGuestOrReturnExistingGuest(@Valid @RequestBody CreateGuestDTO guest, @RequestParam String email) {
        return new ResponseEntity<>(guestService.getOldGuestOrCreateNewGuest(email, guest), HttpStatus.CREATED);
    }

    @PutMapping("/put")
    public ResponseEntity<ResponseGuestDTO> updateGuest(@RequestBody PutGuestDTO guest, HttpServletRequest request) {

        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String email = jwtUtils.getEmailFromToken(decodedJWT);
        return new ResponseEntity<>(guestService.updateWithPut(guest, email), HttpStatus.OK);

    }

    @PatchMapping("/patch")
    public ResponseEntity<ResponseGuestDTO> updateGuest(@RequestBody PatchGuestDTO guest, HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String email = jwtUtils.getEmailFromToken(decodedJWT);
        return new ResponseEntity<>(guestService.updateWithPatch(guest, email), HttpStatus.OK);

    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteGuest(HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String email = jwtUtils.getEmailFromToken(decodedJWT);
        guestService.deleteById(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @GetMapping("/getbookings-byemail/{email}")
    public ResponseEntity<List<ResponseRoomNumAndBookingDateDTO>> getAllBookingsByGuestEmail(@PathVariable @Email String email) {
        return new ResponseEntity<>(guestService.findBookingDateAndRoomNumAndGuestNameByGuestEmail(email), HttpStatus.OK);
    }

    @GetMapping("/gethotels-byemail")
    public ResponseEntity<Set<HotelNameLocationDTO>> getAllHotelsOwner(HttpServletRequest request) {

        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String emailOwner = jwtUtils.getEmailFromToken(decodedJWT);

        return new ResponseEntity<>(guestService.findHotelsOwner(emailOwner), HttpStatus.OK);
    }

}