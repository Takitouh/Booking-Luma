package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingCheckInOrCheckOutInvalidException;
import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletRequest;
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
    private final JwtUtils jwtUtils;

    public ControllerBooking(IServiceBooking bookingService, JwtUtils jwtUtils) {
        this.bookingService = bookingService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<List<GuestBookingDTO>> getAllBookings(HttpServletRequest request) {
        DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(request.getCookies());
        String email = jwtUtils.getEmailFromToken(decodedJWT);

        return new ResponseEntity<>(bookingService.findAllByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseBookingDTO> getBookingById(@PathVariable Long id) {
        return new ResponseEntity<>(bookingService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseBookingDTO> createBooking(@RequestBody CreateBookingDTO booking) {
        if (booking.checkOut().isBefore(booking.checkIn())) {
            throw new BookingCheckInOrCheckOutInvalidException("Check out date must be after check in date");
        } else if (booking.checkIn().isAfter(booking.checkOut())) {
            throw new BookingCheckInOrCheckOutInvalidException("Check in date must be before check out date.");
        }
        return new ResponseEntity<>(bookingService.save(booking), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseBookingDTO>> createBookings(@RequestBody List<CreateBookingDTO> booking) {
        return new ResponseEntity<>(bookingService.saveAll(booking), HttpStatus.CREATED);
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<ResponseBookingDTO> updateBooking(@PathVariable Long id, @RequestBody PutBookingDTO booking) {
        Optional<ResponseBookingDTO> existingBooking = Optional.ofNullable(bookingService.findById(id));
        if (existingBooking.isPresent()) {
            return new ResponseEntity<>(bookingService.updateWithPut(booking, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ResponseBookingDTO> updateBooking(@PathVariable Long id, @RequestBody PatchBookingDTO booking) {
        Optional<ResponseBookingDTO> existingBooking = Optional.ofNullable(bookingService.findById(id));
        if (existingBooking.isPresent()) {
            return new ResponseEntity<>(bookingService.updateWithPatch(booking, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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

    @PostMapping("/cancel-booking")
    public ResponseEntity<Void> cancelBooking(@RequestParam Long idBooking) {
        bookingService.updateStatusPaymentToCanceled(idBooking);
        return ResponseEntity.ok().build();
    }

}