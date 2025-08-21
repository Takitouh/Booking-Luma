package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreateGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseGuestDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/guests")
public class ControllerGuest {

    private final IServiceGuest guestService;

    @Autowired
    public ControllerGuest(IServiceGuest guestService) {
        this.guestService = guestService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseGuestDTO>> getAllGuests() {
        return new ResponseEntity<>(guestService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseGuestDTO> getGuestById(@PathVariable Long id) {
        return new ResponseEntity<>(guestService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseGuestDTO> createGuest(@RequestBody CreateGuestDTO guest) {
        return new ResponseEntity<>(guestService.save(guest), HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ResponseGuestDTO> updateGuest(@PathVariable Long id, @RequestBody PutGuestDTO guest) {
//        Optional<Guest> existingGuest = guestService.findById(id);
//        if (existingGuest.isPresent()) {
//            guest.setId(id);
//            Guest updatedGuest = guestService.save(guest);
//            return new ResponseEntity<>(updatedGuest, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        Optional<ResponseGuestDTO> guest = Optional.ofNullable(guestService.findById(id));
        if (guest.isPresent()) {
            guestService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}