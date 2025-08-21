package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookings")
public class ControllerBooking {

    private final IServiceBooking bookingService;

    @Autowired
    public ControllerBooking(IServiceBooking bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseBookingDTO>> getAllBookings() {
        return new ResponseEntity<>(bookingService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseBookingDTO> getBookingById(@PathVariable Long id) {
        return new ResponseEntity<>(bookingService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseBookingDTO> createBooking(@RequestBody CreateBookingDTO booking) {
        return new ResponseEntity<>(bookingService.save(booking), HttpStatus.CREATED);
    }

//    @PutMapping("/put/{id}")
//    public ResponseEntity<ResponseBookingDTO> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
//        ResponseBookingDTO existingBooking = bookingService.findById(id);
//
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        Optional<ResponseBookingDTO> booking = Optional.ofNullable(bookingService.findById(id));
        if (booking.isPresent()) {
            bookingService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}