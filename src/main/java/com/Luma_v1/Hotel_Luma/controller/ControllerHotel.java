package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/hotels")
public class ControllerHotel {

    private final IServiceHotel hotelService;
    private final JwtUtils jwtUtils;

    public ControllerHotel(IServiceHotel hotelService, JwtUtils jwtUtils) {
        this.hotelService = hotelService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseHotelDTO>> getAllHotels() {
        return new ResponseEntity<>(hotelService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseHotelDTO> getHotelById(@PathVariable Long id) {
        final ResponseHotelDTO hotelDTO = hotelService.findById(id);

        if (hotelDTO == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(hotelDTO, HttpStatus.OK);
        }
    }

    @GetMapping("/owner-get/{id}")
    public ResponseEntity<ResponseHotelDTO> getOwnerHotelById(@PathVariable Long id, HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String emailOwner = jwtUtils.getEmailFromToken(decodedJWT);

        final ResponseHotelDTO hotelDTO = hotelService.ownerFindById(id, emailOwner);

        if (hotelDTO == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(hotelDTO, HttpStatus.OK);
        }
    }

    @GetMapping("/find-by-name")
    public ResponseEntity<ResponseHotelDTO> findByName(@RequestParam String name) throws BadRequestException {
        return new ResponseEntity<>(hotelService.findByName(name), HttpStatus.OK);
    }

//    @PostMapping("/post")
//    public ResponseEntity<ResponseHotelDTO> createHotel(@RequestBody CreateHotelDTO hotel) {
//        return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.CREATED);
//    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseHotelDTO>> createHotel(@RequestBody List<CreateHotelDTO> hotels) {
        return new ResponseEntity<>(hotelService.saveAll(hotels), HttpStatus.CREATED);
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ResponseHotelDTO> updateHotel(@PathVariable Long id, @RequestPart("hotelInfo") PatchHotelDTO generalInfo, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return new ResponseEntity<>(hotelService.updateWithPatch(generalInfo, file, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id, HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String emailOwner = jwtUtils.getEmailFromToken(decodedJWT);

        ResponseHotelDTO hotel = hotelService.ownerFindById(id, emailOwner);
        if (hotel == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            hotelService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam(value = "id") Long idHotel, @RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(hotelService.uploadHotelImage(file, idHotel));
    }

    @GetMapping("/downloadImage/{idHotel}")
    public ResponseEntity<Resource> downloadImage(@PathVariable Long idHotel) {
        Hotel hotel = hotelService.downloadHotelImage(idHotel);

        ByteArrayResource resource = new ByteArrayResource(hotel.getImageContent());

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(String.valueOf(MediaType.IMAGE_PNG))).body(resource);
    }

    @PostMapping("/register-hotel")
    public ResponseEntity<String> registerHotel(@Valid @RequestPart("hotel") CreateHotelDTO hotel, @Valid @RequestPart("rooms") List<CreateRoomDTO> rooms, @RequestPart("file") MultipartFile file, HttpServletRequest request) throws IOException {

        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String emailOwner = jwtUtils.getEmailFromToken(decodedJWT);

        hotelService.registerHotel(hotel, rooms, file, emailOwner);

        return ResponseEntity.ok("Endpoint of register was called");
    }


}