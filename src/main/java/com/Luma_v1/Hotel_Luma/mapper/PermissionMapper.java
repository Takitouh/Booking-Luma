package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.CreatePermissionDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponsePermissionDTO;
import com.Luma_v1.Hotel_Luma.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    // CreateDTO → Entity
    @Mapping(target = "idPermission", ignore = true)
    Permission toEntity(CreatePermissionDTO dto);

    // Entity → ResponseDTO
    @Mapping(target = "idPermission", source = "idPermission")
    ResponsePermissionDTO toDto(Permission permission);
}
