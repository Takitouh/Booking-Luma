package com.Luma_v1.Hotel_Luma.utils;

import com.Luma_v1.Hotel_Luma.entity.Permission;
import com.Luma_v1.Hotel_Luma.entity.Role;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryPermission;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final IRepositoryRole repositoryRole;
    private final IRepositoryPermission repositoryPermission;

    @Override
    public void run(String... args) {
        log.info("Executing the creation of default permissions and roles");
        permissionsAndRolesInitializer();
    }


    private Set<Permission> createPermissionsIfNotExist(Set<String> permissionNames) {
        log.info("Initializing the creation of {} permissions:", permissionNames.size());
        Set<Permission> permissionSet = new HashSet<>();
        for (String p : permissionNames) {
            Permission permi = repositoryPermission.getPermissionByPermissionName(p);
            if (permi == null) {
                Permission permission = new Permission(null, p);
                permissionSet.add(permission);
            } else {
                permissionSet.add(permi);
            }
        }
        log.info("Permissions set created");
        return permissionSet;
    }

    private void permissionsAndRolesInitializer() {
        Set<String> permissionsName = new HashSet<>();
        Set<String> rolesNames = Set.of("GUEST", "OWNER");
        permissionsName.add("PERMISSION_VIEW_HOTEL");
        permissionsName.add("PERMISSION_CREATE_BOOKING");
        permissionsName.add("PERMISSION_REGISTER_HOTEL");
        Set<Permission> permissionSetGuest = createPermissionsIfNotExist(permissionsName);
        createRolesIfNotExist(rolesNames, permissionSetGuest);

    }

    private void createRolesIfNotExist(Set<String> roleNames, Set<Permission> permissionSet) {
        Set<Role> roleSet = new HashSet<>();
        for (String roleName : roleNames) {
            if (!repositoryRole.existsRoleByRole(roleName)) {
                roleSet.add(new Role(null, roleName, permissionSet));
            }
        }
        repositoryRole.saveAll(roleSet);
        log.info("Finished createRolesIfNotExist");
    }
}
