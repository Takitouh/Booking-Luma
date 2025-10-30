package com.Luma_v1.Hotel_Luma.config;

import com.Luma_v1.Hotel_Luma.config.filterSecurity.filterJWT;
import com.Luma_v1.Hotel_Luma.utils.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final JwtUtils jwtUtils;

    public SecurityConfiguration(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {

        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(this.passwordEncoder());

        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/register.html", "/register.css", "/register.js", "/api/v1/hotels/register-hotel").hasAuthority("PERMISSION_REGISTER_HOTEL")

                        .requestMatchers("/", "/favicon.ico", "/css/*.css", "/js/*.js", "/imgs/**", "/*.html", "/api/v1/hotels/get/**", "/api/v1/bookings/post",
                                "/api/v1/guests/post-booking-guest/**", "/api/v1/hotels/downloadImage/**", "/auth/sign-up",
                                "/auth/log-in", "/auth/log-out", "/api/v1/guests/getLogged", "/api/v1/payment/create-payment", "/api/v1/payment/execute-payment")
                        .permitAll().anyRequest().denyAll()
                )
                .addFilterBefore(new filterJWT(jwtUtils), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
