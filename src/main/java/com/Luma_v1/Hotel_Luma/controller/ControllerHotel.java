package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public ControllerHotel(IServiceHotel hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseHotelDTO>> getAllHotels() {
        return new ResponseEntity<>(hotelService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseHotelDTO> getHotelById(@PathVariable Long id) {
        return new ResponseEntity<>(hotelService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/find-by-name")
    public ResponseEntity<ResponseHotelDTO> findByName(@RequestParam String name) throws BadRequestException {
        return new ResponseEntity<>(hotelService.findByName(name), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseHotelDTO> createHotel(@RequestBody CreateHotelDTO hotel) {
        return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseHotelDTO>> createHotel(@RequestBody List<CreateHotelDTO> hotels) {
        return new ResponseEntity<>(hotelService.saveAll(hotels), HttpStatus.CREATED);
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<ResponseHotelDTO> updateHotel(@PathVariable Long id, @RequestBody PutHotelDTO hotel) {
        Optional<ResponseHotelDTO> existingHotel = Optional.ofNullable(hotelService.findById(id));
        if (existingHotel.isPresent()) {
            return new ResponseEntity<>(hotelService.updateWithPut(hotel, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ResponseHotelDTO> updateHotel(@PathVariable Long id, @RequestBody PatchHotelDTO hotel) {
        Optional<ResponseHotelDTO> existingHotel = Optional.ofNullable(hotelService.findById(id));
        if (existingHotel.isPresent()) {
            return new ResponseEntity<>(hotelService.updateWithPatch(hotel, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        Optional<ResponseHotelDTO> hotel = Optional.ofNullable(hotelService.findById(id));
        if (hotel.isPresent()) {
            hotelService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam(value = "id") Long idHotel, @RequestPart("file")MultipartFile file) throws IOException {
        return ResponseEntity.ok(hotelService.uploadHotelImage(file, idHotel));
    }

    @GetMapping("/downloadImage/{idHotel}")
    public ResponseEntity<Resource> downloadImage(@PathVariable Long idHotel) {
       Hotel hotel = hotelService.downloadHotelImage(idHotel);

       ByteArrayResource resource = new ByteArrayResource(hotel.getImageContent());

       return ResponseEntity.ok().contentType(MediaType.parseMediaType(String.valueOf(MediaType.IMAGE_PNG))).body(resource);
    }

    @PostMapping("/register-hotel")
    public ResponseEntity<String> registerHotel(@Valid @RequestPart("hotel") CreateHotelDTO hotel, @Valid @RequestPart("rooms") List<CreateRoomDTO> rooms, @RequestPart("file") MultipartFile file) throws IOException {

        hotelService.registerHotel(hotel, rooms, file);

        return ResponseEntity.ok("Endpoint of register was called");
    }


}