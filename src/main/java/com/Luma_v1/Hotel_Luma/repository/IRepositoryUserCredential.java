package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryUserCredential extends JpaRepository<UserCredential, Long> {
     UserCredential findGuestCredentialByEmail(String email);
}
