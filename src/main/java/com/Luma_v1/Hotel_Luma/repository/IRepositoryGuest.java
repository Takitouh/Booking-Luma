package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.dto.HotelNameLocationDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomNumAndBookingDateDTO;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IRepositoryGuest extends JpaRepository<Guest, Long> {
    @Query(value = "SELECT CONCAT(g.first_name, ' ', g.last_name) AS customer,r.number AS roomNumber, b.check_in AS checkIn, b.check_out AS checkOut FROM guest g INNER JOIN booking b ON g.id = b.guest_id INNER JOIN room r ON r.id = b.room_id WHERE  g.email LIKE :email", nativeQuery = true)
    List<ResponseRoomNumAndBookingDateDTO> findBookingsByGuestEmail(String email);

    Guest findByEmail(String email);


    @Query(value = "SELECT CONCAT(g.first_name, ' ', g.last_name) FROM guest g WHERE g.email = :email",
            nativeQuery = true)
    String findGuestNameByEmail(String email);

    @Query(value = "SELECT h.id, h.name, h.location FROM guest g INNER JOIN hotel h ON g.id = h.owner_id WHERE g.email = :email", nativeQuery = true)
    Set<HotelNameLocationDTO> findHotelsByGuestEmail(String email);

}