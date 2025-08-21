package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryGuest extends JpaRepository<Guest, Long> {
}