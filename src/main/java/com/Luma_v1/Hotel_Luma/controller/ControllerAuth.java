package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.AuthLoginDTO;
import com.Luma_v1.Hotel_Luma.dto.AuthResponseDTO;
import com.Luma_v1.Hotel_Luma.dto.AuthSignUpDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseUserCredentialDTO;
import com.Luma_v1.Hotel_Luma.service.impl.ServiceUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class ControllerAuth {

    private final ServiceUserDetails userDetailsService;

    public ControllerAuth(ServiceUserDetails userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/log-out")
    public ResponseEntity<String> logOut(HttpServletRequest request) {

        ResponseCookie cookieJWT = ResponseCookie.from("COOKIE_JWT", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0) //
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookieJWT.toString()).body("Log out OK");
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponseDTO> logIn(@RequestBody @Valid AuthLoginDTO userRequest) {


        AuthResponseDTO response = userDetailsService.loginUser(userRequest);
        ResponseCookie cookieJWT = ResponseCookie.from("COOKIE_JWT", response.jwtToken())
                .httpOnly(true)
                .secure(false)  // ⬅️ IMPORTANT: false for HTTP development
                .path("/")
                .maxAge(3600)
                .sameSite("Lax")  // ⬅️ IMPORTANT: Lax for cross-origin
                .build();

        // Log the cookie header for debugging
        System.out.println("SET-COOKIE HEADER: " + cookieJWT.toString());



        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookieJWT.toString()).body(response);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseUserCredentialDTO> signUp(@RequestBody @Valid AuthSignUpDTO guestCredentialDTO) {
        return new ResponseEntity<>(userDetailsService.signUp(guestCredentialDTO), HttpStatus.CREATED);
    }
}
