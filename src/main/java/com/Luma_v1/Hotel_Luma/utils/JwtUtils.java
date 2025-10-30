package com.Luma_v1.Hotel_Luma.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Value("security.jwt.user.generator")
    private String userGenerator;

    @Value("security.jwt.private.key")
    private String keyJWT;

    //Method for create JWT
    public String createToken(Authentication auth) {
        Algorithm algorithm = Algorithm.HMAC256(keyJWT);
        String email = auth.getPrincipal().toString();

        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String jwtToken = JWT.create().withIssuer(this.userGenerator)
                .withSubject(email)
                .withIssuedAt(new Date())
                //Claim will get the authorities separates by ,
                .withClaim("authorities", authorities)
                //30 Days of life
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date())
                .sign(algorithm);

        return jwtToken;
    }

    //Method for verify if the token is legit
    public DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(keyJWT);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(this.userGenerator)
                    .build();

            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Token is not valid", exception);
        }
    }

    //Method for get the email from token
    public String getEmailFromToken(DecodedJWT token) {
        return token.getSubject();
    }

    //Method for get specific claim
    public Claim getSpecificClaimFromToken(DecodedJWT token, String claimName) {
        return token.getClaim(claimName);
    }

    //Method for get all claims
    public Map<String, Claim> getClaims(DecodedJWT token) {
        return token.getClaims();
    }

    public DecodedJWT getDecodedJWTFromCookie(Cookie[] cookies) {
        DecodedJWT decodedJWT = null;
        for (Cookie cookieJWT : cookies) {
            if (cookieJWT.getName().equals("COOKIE_JWT")) {
                decodedJWT = this.verifyToken(cookieJWT.getValue());
            }
        }
        return decodedJWT;
    }
}
