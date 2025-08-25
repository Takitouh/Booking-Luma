package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PutHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}