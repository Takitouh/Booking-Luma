package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.entity.Role;
import com.Luma_v1.Hotel_Luma.entity.UserCredential;
import com.Luma_v1.Hotel_Luma.mapper.GuestCredentialMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryUserCredential;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRole;
import com.Luma_v1.Hotel_Luma.service.IServiceGuest;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class ServiceUserDetails implements UserDetailsService {

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final IRepositoryUserCredential repositoryGuestCredential;
    private final IRepositoryGuest guestRepository;
    private final IServiceGuest serviceGuest;
    private final GuestCredentialMapper guestCredentialMapper;
    private final IRepositoryRole repositoryRole;

    public ServiceUserDetails(JwtUtils jwtUtils, PasswordEncoder passwordEncoder, IRepositoryUserCredential repositoryGuestCredential, IRepositoryGuest guestRepository, IServiceGuest serviceGuest, GuestCredentialMapper guestCredentialMapper, IRepositoryRole repositoryRole) {
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.repositoryGuestCredential = repositoryGuestCredential;
        this.guestRepository = guestRepository;
        this.serviceGuest = serviceGuest;
        this.guestCredentialMapper = guestCredentialMapper;
        this.repositoryRole = repositoryRole;
    }

    /**
     * Load the user by his email and return a User with info of his credentials
     *
     * @param email email of the user
     * @return User
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Find the guest credentials by his email
        UserCredential guestCredent = repositoryGuestCredential.findGuestCredentialByEmail(email);

        if (guestCredent == null) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        //Spring security handle the authorities with GrantedAuthority
        List<GrantedAuthority> authorityList = new ArrayList<>();

        //We add the roles to the list of authorities
        guestCredent.getRoles()
                .forEach(role -> authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRole()))));


        //We add the permissions to the list of authorities
        guestCredent.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getPermissionName())));

        return new User(guestCredent.getEmail(),
                guestCredent.getPassword(),
                guestCredent.isEnabled(),
                guestCredent.isAccountNotExpired(),
                guestCredent.isCredentialsNotExpired(),
                guestCredent.isAccountNotLocked(),
                authorityList);
    }

    /**
     * LOG IN:
     * Uses authenticate() for authenticate the user, update the SecurityContextHolder and return the JWT
     * in AuthResponseDTO
     *
     * @param userRequest contains email and password
     * @return AuthResponseDTO with successful message and JWT
     */
    public AuthResponseDTO loginUser(AuthLoginDTO userRequest) {
        String username = userRequest.email();
        String password = userRequest.password();
        Authentication authentication = this.authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //Create the JWT according to the information of the user
        String accessToken = jwtUtils.createToken(authentication);
        return new AuthResponseDTO(username, "Login successful", accessToken, true);
    }


    /**
     * Returns an UsernamePasswordAuthentication if the email and password are correct
     *
     * @param email    Guest email
     * @param password Guest password
     * @return UsernamePasswordAuthentication
     * @throws BadCredentialsException if email or password are wrong
     */
    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = this.loadUserByUsername(email);
        //If the credentials are invalid, throw exception
        if (!Objects.equals(userDetails.getUsername(), email) || !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        } //else continue
        return new UsernamePasswordAuthenticationToken(email, userDetails.getPassword(), userDetails.getAuthorities());
    }


    /**
     * SIGN UP:
     * Save the credentials of the guest for the first time.
     * We use the CredentialDTO for create a new GuestDTO and send it in .createNewGuest() in case the email isn't assigned to a previous guest,
     * with the response we get the guest by his ID, encrypt the password and assign these to guestCredential.
     *
     * @param guestCredentialDTO DTO with the data for creation (firstName, lastName, email, phone, password)
     * @return ResponseGuestCredentialDTO response with the data of credentials
     * @throws RuntimeException if the user isn't found or if it wasn't created
     */
    public ResponseUserCredentialDTO signUp(AuthSignUpDTO guestCredentialDTO) {

        Role guestRole = repositoryRole.getRoleByRole("GUEST");
        Set<Role> guestRoleSet = new HashSet<>();
        guestRoleSet.add(guestRole);


        CreateGuestDTO guestDTO = new CreateGuestDTO(guestCredentialDTO.firstName(), guestCredentialDTO.lastName(), guestCredentialDTO.email(), guestCredentialDTO.phone());

        ResponseGuestDTO guestResponse = serviceGuest.createNewGuest(guestCredentialDTO.email(), guestDTO);

        Guest guest = guestRepository.findById(guestResponse.id()).orElseThrow(() -> new RuntimeException("Guest not found"));

        String passwordEncoded = passwordEncoder.encode(guestCredentialDTO.password());

        UserCredential userCredential = guestCredentialMapper.toEntity(guestCredentialDTO);

        userCredential.setEnabled(true);
        userCredential.setGuest(guest);
        userCredential.setPassword(passwordEncoded);
        userCredential.setRoles(guestRoleSet);

        repositoryGuestCredential.save(userCredential);

        return new ResponseUserCredentialDTO(userCredential.getId(), guest.getFirstName(), guest.getLastName(), guestCredentialDTO.email(), guestCredentialDTO.password(), guest.getId());
    }
}
