package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRepositoryHotel extends JpaRepository<Hotel, Long> {
    //Query for find a hotel with at least one room by its name
    @Query(value = "SELECT DISTINCT h.* FROM hotel h INNER JOIN room r ON h.id = r.hotel_id WHERE h.name = :name", nativeQuery = true)
    Hotel findByName(String name);

    //Return all the hotels with at least one room
    @Query(value = "SELECT DISTINCT h.* FROM hotel h INNER JOIN room r ON h.id = r.hotel_id", nativeQuery = true)
    List<Hotel> findAllHotels();
}