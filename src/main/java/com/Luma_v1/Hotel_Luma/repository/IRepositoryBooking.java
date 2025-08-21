package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryBooking extends JpaRepository<Booking, Long> {
}