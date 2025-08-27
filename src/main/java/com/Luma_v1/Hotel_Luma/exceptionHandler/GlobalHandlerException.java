package com.Luma_v1.Hotel_Luma.exceptionHandler;

import com.Luma_v1.Hotel_Luma.dto.ErrorDTO;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingCheckInOrCheckOutInvalidException;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingDateCrossInvalidException;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.ExceedScheduleDayUseException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;

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

    @ExceptionHandler(ExceedScheduleDayUseException.class)
    public ResponseEntity<ErrorDTO> handleExceedScheduleDayUseException() {
        ErrorDTO error = new ErrorDTO(400, "The type of booking is DAY USE but you are booking more of what is allowed, please book less time.", "The type of booking is DAY USE, so the maximum time allowed is 12 hours.");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleEntityNotFound(EntityNotFoundException ex) {
        ErrorDTO err = new ErrorDTO(404, "ENTITY_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorDTO> handleNoHandlerFound(NoHandlerFoundException ex) {
        ErrorDTO err = new ErrorDTO(404, "ENDPOINT_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDTO> handleAccessDenied(AccessDeniedException ex) {
        ErrorDTO err = new ErrorDTO(403, "ACCESS_DENIED", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorDTO> handleAuthentication(AuthenticationException ex) {
        ErrorDTO err = new ErrorDTO(401, "AUTHENTICATION_FAILED", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorDTO> handleExceptionRequestParameter(Exception ex) {
        ErrorDTO err = new ErrorDTO(400, "MISSING_PARAMETER", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleException(Exception ex) {
        ErrorDTO err = new ErrorDTO(500, "INTERNAL_ERROR", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
}