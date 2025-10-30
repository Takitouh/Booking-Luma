package com.Luma_v1.Hotel_Luma.repository;

import com.Luma_v1.Hotel_Luma.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryRole extends JpaRepository<Role, Long> {

    boolean existsRoleByRole(String role);

    Role getRoleByRole(String role);

}
