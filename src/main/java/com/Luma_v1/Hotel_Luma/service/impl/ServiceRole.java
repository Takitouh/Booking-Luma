package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateRoleDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoleDTO;
import com.Luma_v1.Hotel_Luma.entity.Permission;
import com.Luma_v1.Hotel_Luma.entity.Role;
import com.Luma_v1.Hotel_Luma.mapper.RoleMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryPermission;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRole;
import com.Luma_v1.Hotel_Luma.service.IServiceRole;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ServiceRole implements IServiceRole {

    private final Logger logger = LoggerFactory.getLogger(ServiceRole.class);
    private final IRepositoryRole roleRepository;
    private final IRepositoryPermission permissionRepository;
    private final RoleMapper roleMapper;

    public ServiceRole(IRepositoryRole roleRepository, IRepositoryPermission permissionRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<ResponseRoleDTO> allRoles() {
        List<ResponseRoleDTO> roles = new ArrayList<>();
        for (Role r : roleRepository.findAll()) {
            roles.add(roleMapper.toDto(r));
        }
        if (roles.isEmpty()) {
            throw new EntityNotFoundException("No roles found"); //Excepcion Not Found
        }
        logger.info("Get all roles from repository");
        return roles;
    }

    @Override
    public ResponseRoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        logger.info("Get role from repository");
        return roleMapper.toDto(role);
    }

    @Override
    public ResponseRoleDTO createRole(CreateRoleDTO role) {
        ResponseRoleDTO roleResponseDTO = proccessRole(role);
        logger.info("Created role");
        return roleResponseDTO;
    }

    @Override
    public List<ResponseRoleDTO> createRole(Set<CreateRoleDTO> roles) {
        List<ResponseRoleDTO> roleResponseDTOs = new ArrayList<>();
        for (CreateRoleDTO role : roles) {
            roleResponseDTOs.add(proccessRole(role));
        }
        logger.info("Created list of role");
        return roleResponseDTOs;
    }


//    @Override
//    public ResponseRoleDTO updateRole(RolePutDTO rolePutDTO, Long id) {
//        Role role = roleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
//        Set<Permission> rolePermissions = rolePutDTO.permissionsIds().stream().map(permissionId -> permissionRepository.findById(permissionId).orElseThrow(() -> new EntityNotFoundException("Permission with id: " + permissionId + " not found"))).collect(Collectors.toSet());
//        role.setPermissions(rolePermissions);
//        role.setRole(rolePutDTO.role());
//        //Persist
//        roleRepository.save(role);
//        //Map the entity to DTO for response
//        logger.info("Role updated with PUT: {}", role);
//        return roleMapper.toDto(role);
//    }
//
//    @Override
//    public ResponseRoleDTO updateRole(RolePatchDTO rolePatchDTO, Long id) {
//        Role role = roleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
//        Set<Long> permissionIds = rolePatchDTO.permissionsIds() == null? new HashSet<>() : rolePatchDTO.permissionsIds();
//        Set<Permission> rolePermissions = permissionIds.isEmpty()? role.getPermissions() : rolePatchDTO.permissionsIds().stream().map(permissionId -> permissionRepository.findById(permissionId).orElseThrow(() -> new EntityNotFoundException("Permission with id: " + permissionId + " not found"))).collect(Collectors.toSet());
//
//        role.setPermissions(rolePermissions);
//        role.setRole(rolePatchDTO.role() == null || rolePatchDTO.role().isEmpty()? role.getRole() : rolePatchDTO.role());
//        //Persist
//        roleRepository.save(role);
//        //Map the entity to DTO for response
//        logger.info("Role updated with PATCH: {}", role);
//        return roleMapper.toDto(role);    }

    @Override
    public void deleteRole(Long id) {
        logger.info("Delete role from repository");
        roleRepository.deleteById(id);
    }

    private ResponseRoleDTO proccessRole(CreateRoleDTO role) {
        Role roleEntity;
        ResponseRoleDTO roleResponseDTO;
        Set<Permission> rolePermissions = new HashSet<>();
        if (role.permissionsIds().isEmpty()) {
            throw new EntityNotFoundException("The role must have at least one permission");
        }
        for (Long permissionId : role.permissionsIds()) {
            //We use the set of ID'S for search and store each one of the permissions
            if (permissionRepository.findById(permissionId).isEmpty()) {
                throw new EntityNotFoundException("Permission with id " + permissionId + " not found");
            }
//            Permission managedPermission = permissionRepository.findById(permissionId)
//                    .orElseThrow(() -> new RuntimeException("Permission with ID " + permissionId + " not found"));
//            managedPermissions.add(managedPermission);
            //And add to the set of the permissions of the role
            rolePermissions.add(permissionRepository.findById(permissionId).get());
        }
        //Set the values to the entity role
        roleEntity = roleMapper.toEntity(role);
        roleEntity.setPermissions(rolePermissions);
        //Persist
        roleRepository.save(roleEntity);
        roleResponseDTO = roleMapper.toDto(roleEntity);
        return roleResponseDTO;
    }
}
