package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.dto.HotelNameLocationDTO;
import com.Luma_v1.Hotel_Luma.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryRoom extends JpaRepository<Room, Long> {
    @Query(value = "SELECT h.id, h.name, h.location FROM hotel h INNER JOIN room r ON h.id = r.hotel_id WHERE r.id = :idRoom", nativeQuery = true)
    HotelNameLocationDTO findHotelNameLocationById(Long idRoom);
}