package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.CreatePermissionDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponsePermissionDTO;

import java.util.List;
import java.util.Set;

public interface IServicePermission {
    List<ResponsePermissionDTO> allPermissions();

    ResponsePermissionDTO getPermissionById(Long id);

    ResponsePermissionDTO createPermission(CreatePermissionDTO permission);

    List<ResponsePermissionDTO> createPermission(Set<CreatePermissionDTO> permission);

//    ResponsePermissionDTO updatePermission(PermissionPutDTO permission, Long id);
//
//    ResponsePermissionDTO updatePermission(PermissionPatchDTO permission, Long id);

    void deletePermission(Long id);
}
