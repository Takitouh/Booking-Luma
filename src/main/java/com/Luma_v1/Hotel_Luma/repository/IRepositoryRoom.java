package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryRoom extends JpaRepository<Room, Long> {
}