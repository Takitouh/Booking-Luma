package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface IRepositoryBooking extends JpaRepository<Booking, Long> {
    //Check if the booking date is valid or if there is dates crossing
    @Query(value = "SELECT COUNT(b.id) FROM booking b WHERE b.room_id = :RoomID AND (:checkInDate BETWEEN b.check_in AND b.check_out OR :checkOutDate BETWEEN b.check_in AND b.check_out) AND b.status <> 'CANCELLED'"
            , nativeQuery = true)
    Integer givenCheckInAndCheckOutAndRoomID_CheckValidBookingDate(Long RoomID, LocalDate checkInDate, LocalDate checkOutDate);
}