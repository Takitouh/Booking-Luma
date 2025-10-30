package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreateRoleDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoleDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceRole;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/roles")
public class ControllerRole {

    private final IServiceRole roleService;

    public ControllerRole(IServiceRole roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseRoleDTO>> getAllRoles() {
        return ResponseEntity.ok(roleService.allRoles());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseRoleDTO> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseRoleDTO> createRole(@RequestBody CreateRoleDTO role) {
        return new ResponseEntity<>(roleService.createRole(role), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseRoleDTO>> createRole(@RequestBody Set<CreateRoleDTO> role) {
        return ResponseEntity.ok(roleService.createRole(role));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseRoleDTO> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
