package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PutBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.entity.Booking;
import com.Luma_v1.Hotel_Luma.exceptionHandler.exceptions.BookingDateCrossInvalidException;
import com.Luma_v1.Hotel_Luma.mapper.BookingMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryBooking;
import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ServiceBooking implements IServiceBooking {

    private final IRepositoryBooking bookingRepository;
    private final BookingMapper bookingMapper;

    public ServiceBooking(IRepositoryBooking bookingRepository, BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public List<ResponseBookingDTO> findAll() {
        return bookingRepository.findAll().stream()
                .map(booking -> bookingMapper.toResponseDTO(booking))
                .collect(Collectors.toList());
    }

    @Override
    public ResponseBookingDTO findById(Long id) {
        return bookingMapper.toResponseDTO(bookingRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public ResponseBookingDTO save(CreateBookingDTO booking) {
        Booking bookingEntity = bookingMapper.toEntity(booking);
        Integer nBooking = bookingRepository.givenCheckInAndCheckOutAndRoomID_CheckValidBookingDate(booking.roomId(), booking.checkIn(), booking.checkOut());
        if (nBooking != 0)
            throw new BookingDateCrossInvalidException("The requested dates for the room with ID: " + booking.roomId() + " are crossing with another booking");
        bookingRepository.save(bookingEntity);
        return bookingMapper.toResponseDTO(bookingRepository.save(bookingEntity));
    }

    @Override
    public List<ResponseBookingDTO> saveAll(List<CreateBookingDTO> bookings) {
        List<Booking> bookingsList = new ArrayList<>();
        List<ResponseBookingDTO> responses = new ArrayList<>();
        for (CreateBookingDTO bookingDTO : bookings) {
            bookingsList.add(bookingMapper.toEntity(bookingDTO));
        }
        bookingRepository.saveAll(bookingsList);
        for (Booking booking : bookingsList) {
            responses.add(bookingMapper.toResponseDTO(booking));
        }
        return responses;
    }

    @Override
    public void deleteById(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public ResponseBookingDTO updateWithPut(PutBookingDTO booking, Long id) {
        Booking oldBooking = bookingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Booking newBooking = bookingMapper.toEntity(booking);

        oldBooking.setCheckIn(oldBooking.getCheckIn());
        oldBooking.setCheckOut(newBooking.getCheckOut());
        oldBooking.setGuest(oldBooking.getGuest());
        oldBooking.setStatus(oldBooking.getStatus());
        oldBooking.setRoom(oldBooking.getRoom());
        oldBooking.setTotalPrice(oldBooking.getTotalPrice());

        bookingRepository.save(oldBooking);

        return bookingMapper.toResponseDTO(oldBooking);
    }

    @Override
    public ResponseBookingDTO updateWithPatch(PatchBookingDTO booking, Long id) {
        Booking oldBooking = bookingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Booking newBooking = bookingMapper.toEntity(booking, oldBooking);

        oldBooking.setCheckIn(newBooking.getCheckIn() != null ? newBooking.getCheckIn() : oldBooking.getCheckIn());
        oldBooking.setCheckOut(newBooking.getCheckOut() != null ? newBooking.getCheckOut() : oldBooking.getCheckOut());
        oldBooking.setGuest(newBooking.getGuest() != null ? newBooking.getGuest() : oldBooking.getGuest());
        oldBooking.setStatus(newBooking.getStatus() != null ? newBooking.getStatus() : oldBooking.getStatus());
        oldBooking.setRoom(newBooking.getRoom() != null ? newBooking.getRoom() : oldBooking.getRoom());
        oldBooking.setTotalPrice(newBooking.getTotalPrice() != null ? newBooking.getTotalPrice() : oldBooking.getTotalPrice());

        bookingRepository.save(oldBooking);

        return bookingMapper.toResponseDTO(oldBooking);
    }

    public void calculateTotalPriceBooking(Booking booking) {
        if (booking.getType() == Booking.BookingType.OVERNIGHT) {
            calculateTotalPriceBookingNormalFee(booking);
        } else if (booking.getType() == Booking.BookingType.DAY_USE) {
            calculateTotalPriceBookingDayUseFee(booking);
        }
    }

    private void calculateTotalPriceBookingNormalFee(Booking booking) {
        final BigDecimal normalFee = booking.getRoom().getNormalFee();
        long diffInHours = java.time.Duration.between(booking.getCheckIn(), booking.getCheckOut()).toHours();
        long diffInDays = diffInHours / 24;
        if (diffInHours % 24 != 0) diffInDays++; // Round up to the next day if there are remaining hours
        booking.setTotalPrice(normalFee.multiply(java.math.BigDecimal.valueOf(diffInDays)));
    }

    private void calculateTotalPriceBookingDayUseFee(Booking booking) {
        final BigDecimal dayUseFee = booking.getRoom().getDayUseFee();
        booking.setTotalPrice(dayUseFee);
    }

    private void validateBookingDateCrossingAndCalculateTotal(Booking booking) {
        Integer nBooking = bookingRepository.givenCheckInAndCheckOutAndRoomID_CheckValidBookingDate(booking.getRoom().getId(), booking.getCheckIn(), booking.getCheckOut());
        if (nBooking != 0)
            throw new BookingDateCrossInvalidException("The requested dates for the room with ID: " + booking.getRoom().getId() + " are crossing with another booking");
        calculateTotalPriceBooking(booking);
    }

    private void logBooking(Booking booking) {
        LocalDateTime checkIn = booking.getCheckIn();
        LocalDateTime checkOut = booking.getCheckOut();
        Long days = ChronoUnit.DAYS.between(checkIn, checkOut);
        log.info("Booking Details: ID={}, CheckIn={}, CheckOut={}, Type={}, Status={}, TotalPrice={}, GuestID={}, RoomID={}, Days={}",
                booking.getId(),
                booking.getCheckIn(),
                booking.getCheckOut(),
                booking.getType(),
                booking.getStatus(),
                booking.getTotalPrice(),
                booking.getGuest() != null ? booking.getGuest().getId() : null,
                booking.getRoom() != null ? booking.getRoom().getId() : null,
                days);
    }
}