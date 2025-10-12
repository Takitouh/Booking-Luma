package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Repository
public interface IRepositoryBooking extends JpaRepository<Booking, Long> {
    //Check if the booking date is valid or if there are dates crossing
    @Query(value = "SELECT COUNT(b.id) FROM booking b WHERE b.room_id = :RoomID AND (:checkInDate BETWEEN b.check_in AND b.check_out OR :checkOutDate BETWEEN b.check_in AND b.check_out) OR (b.check_in BETWEEN :checkInDate AND :checkOutDate OR b.check_out BETWEEN :checkInDate AND :checkOutDate) AND b.status <> 'CANCELLED'"
            , nativeQuery = true)

    Integer givenCheckInAndCheckOutAndRoomID_CheckValidBookingDate(Long RoomID, LocalDate checkInDate, LocalDate checkOutDate);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM booking WHERE status = 'CANCELLED'", nativeQuery = true)
    int jobDeletionOfBookingStatusCancelled();

    @Modifying
    @Transactional
    @Query(value = "UPDATE booking SET status = 'CANCELLED' WHERE status = 'PENDING' AND TIMESTAMPDIFF(MINUTE, created_at, CURRENT_TIMESTAMP) > :expMin", nativeQuery = true)
    int jobUpdateOfBookingStatusPendingToCancelled(int expMin);
}