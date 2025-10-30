package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreatePermissionDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponsePermissionDTO;
import com.Luma_v1.Hotel_Luma.service.IServicePermission;
import com.Luma_v1.Hotel_Luma.service.impl.ServicePermission;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/permissions")
public class ControllerPermission {

    private final IServicePermission permissionService;
    private final ServicePermission servicePermission;

    public ControllerPermission(IServicePermission permissionService, ServicePermission servicePermission) {
        this.permissionService = permissionService;
        this.servicePermission = servicePermission;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponsePermissionDTO>> getAllPermissions() {
        return ResponseEntity.ok(permissionService.allPermissions());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponsePermissionDTO> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getPermissionById(id));
    }

    @PostMapping("/post")
    public ResponseEntity<ResponsePermissionDTO> createPermission(@RequestBody CreatePermissionDTO permission) {
        return new ResponseEntity<>(permissionService.createPermission(permission), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponsePermissionDTO>> createPermission(@RequestBody Set<CreatePermissionDTO> permission) {
        return new ResponseEntity<>(permissionService.createPermission(permission), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponsePermissionDTO> deletePermission(@PathVariable Long id) {
        servicePermission.deletePermission(id);
        return ResponseEntity.noContent().build();
    }

}
