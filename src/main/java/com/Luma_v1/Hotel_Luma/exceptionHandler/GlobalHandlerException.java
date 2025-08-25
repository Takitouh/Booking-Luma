package com.Luma_v1.Hotel_Luma.exceptionHandler;

import com.Luma_v1.Hotel_Luma.dto.ErrorDTO;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingCheckInOrCheckOutInvalidException;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingDateCrossInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler(BookingDateCrossInvalidException.class)
    public ResponseEntity<ErrorDTO> handleDateCrossingInBooking() {
        ErrorDTO error = new ErrorDTO(400, "This room is not available in that date", "Please try again with another date or pick another room");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(BookingCheckInOrCheckOutInvalidException.class)
    public ResponseEntity<ErrorDTO> handleCheckInOrCheckOutInvalidException() {
        ErrorDTO error = new ErrorDTO(400, "The check in or check out date, are invalids.", "(Check in must be before check out date, and check out date must be after check in date)");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}