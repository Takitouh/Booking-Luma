package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryHotel extends JpaRepository<Hotel, Long> {
    //Query for find a hotel by it's name
    public Hotel findByName(String name);
}