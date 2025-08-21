package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.entity.Booking;
import com.Luma_v1.Hotel_Luma.mapper.BookingMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryBooking;
import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        return bookingMapper.toResponseDTO(bookingRepository.save(bookingEntity));
    }

    @Override
    public void deleteById(Long id) {
        bookingRepository.deleteById(id);
    }
}