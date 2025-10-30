package com.Luma_v1.Hotel_Luma.config.filterSecurity;

import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class filterJWT extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public filterJWT(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    public void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                 @NonNull FilterChain filterChain) throws ServletException, IOException {
        //Get cookies of request
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            // JWT is in HttpOnly cookies
            DecodedJWT decodedJWT = jwtUtils.getDecodedJWTFromCookie(cookies);
            /* # Important assert decodedJWT isn't null for use the functions of jwtUtils for email and auth
             .getDecodedJWTFromCookie(cookies) could return null in the case of users without account */
            String username = decodedJWT != null ? jwtUtils.getEmailFromToken(decodedJWT) : "";
            String auth = decodedJWT != null ? jwtUtils.getSpecificClaimFromToken(decodedJWT, "authorities").asString() : "";


            Collection<? extends GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(auth);
            SecurityContext context = SecurityContextHolder.getContext();
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
        }

        filterChain.doFilter(request, response);

    }
}
