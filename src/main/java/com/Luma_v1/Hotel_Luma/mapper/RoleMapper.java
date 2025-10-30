package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.CreateRoleDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoleDTO;
import com.Luma_v1.Hotel_Luma.entity.Permission;
import com.Luma_v1.Hotel_Luma.entity.Role;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryPermission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")

public abstract class RoleMapper {

    @Autowired
    protected IRepositoryPermission repositoryPermission;

    @SuppressWarnings("unused")
    protected Set<Permission> mapPermissions(Set<Long> ids) {
        if (ids == null) {
            throw new NullPointerException("ids is null");
        }
        return ids.stream()
                .map(id -> repositoryPermission.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Permission with id " + id + " doesn't exist")))
                .collect(Collectors.toSet());
    }

    // CreateDTO → Entity
    @Mapping(target = "permissions", source = "permissionsIds")
    @Mapping(target = "idRole", ignore = true)
    public abstract Role toEntity(CreateRoleDTO dto);

    // Entity → ResponseDTO
    //@Mapping(target = "idRole", source = "idRole")
    public abstract ResponseRoleDTO toDto(Role role);
}
