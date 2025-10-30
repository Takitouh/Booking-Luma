package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreateRoleDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoleDTO;

import java.util.List;
import java.util.Set;

public interface IServiceRole {
    List<ResponseRoleDTO> allRoles();

    ResponseRoleDTO getRoleById(Long id);

    ResponseRoleDTO createRole(CreateRoleDTO role);

    List<ResponseRoleDTO> createRole(Set<CreateRoleDTO> role);

//    ResponseRoleDTO updateRole(RolePutDTO role, Long id);
//
//    ResponseRoleDTO updateRole(RolePatchDTO role, Long id);

    void deleteRole(Long id);

}
