package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.AuthSignUpDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseUserCredentialDTO;
import com.Luma_v1.Hotel_Luma.entity.UserCredential;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;


@Mapper(componentModel = "spring")
public abstract class GuestCredentialMapper {
    @Autowired
    protected IRepositoryRole repositoryRole;
//    // PatchDTO -> Entity
//    @Mapping(target = "roles", source = "existingRolesIds")
//    @Mapping(target = "idUser", ignore = true)
//    public abstract GuestCredential toEntity(UserSecPatchDTO dto);
//    // PutDTO -> Entity
//    @Mapping(target = "roles", source = "existingRolesIds")
//    @Mapping(target = "idUser", ignore = true)
//    public abstract GuestCredential toEntity(UserSecPutDTO dto);

    // CreateDTO → Entity
    @Mapping(target = "id", ignore = true)
    public abstract UserCredential toEntity(AuthSignUpDTO dto);

    // Entity → ResponseDTO
    public abstract ResponseUserCredentialDTO toDto(UserCredential userSec);
//    @SuppressWarnings("unused")
//    protected Set<Role> mapRoles(Set<Long> ids) {
//        if (ids == null) {
//            throw new NullPointerException("ids is null");
//        }
//        return ids.stream()
//                .map(id -> repositoryRole.findById(id)
//                        .orElseThrow(() -> new IllegalArgumentException("Role with id " + id + " doesn't exist")))
//                .collect(Collectors.toSet());
//    }
}
