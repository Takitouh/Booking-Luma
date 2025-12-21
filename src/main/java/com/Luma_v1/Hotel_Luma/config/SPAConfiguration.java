package com.Luma_v1.Hotel_Luma.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;


@Configuration
public class SPAConfiguration implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/hotel.html").setViewName("forward:/index.html");
        registry.addViewController("/search-results.html").setViewName("forward:/index.html");
        registry.addViewController("/log-in.html").setViewName("forward:/index.html");
        registry.addViewController("/my-profile/settings.html").setViewName("forward:/index.html");
        registry.addViewController("/my-profile/accommodations.html").setViewName("forward:/index.html");
        registry.addViewController("/my-profile/bookings.html").setViewName("forward:/index.html");

        registry.addStatusController("/404.html", HttpStatusCode.valueOf(404));
        registry.addViewController("/sign-up.html").setViewName("forward:/index.html");
        registry.addViewController("/register-hotel.html").setViewName("forward:/index.html");
        registry.addViewController("/success-payment.html").setViewName("forward:/index.html");
        registry.addViewController("/failed-payment.html").setViewName("forward:/index.html");
        registry.addViewController("/sign-up-contributor.html").setViewName("forward:/index.html");
        registry.addViewController("/edit-hotel/*.html").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/")
                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)
                ).cachePublic());


        registry.addResourceHandler("/js/components/user-profile-accommodations/**",
                        "/js/components/user-profile-account/**",
                        "/js/components/user-profile-admin-accommodations/**",
                        "/js/components/user-profile-bookings/**",
                        "/js/components/user-status-header/**")
                .addResourceLocations("classpath:/static/js/components/user-profile-accommodations/",
                        "classpath:/static/js/components/user-profile-account/",
                        "classpath:/static/js/components/user-profile-admin-accommodations/",
                        "classpath:/static/js/components/user-profile-bookings/",
                        "classpath:/static/js/components/user-status-header/").setCacheControl(
                        CacheControl.maxAge(Duration.ofDays(7)).cachePrivate().mustRevalidate()
                );

        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/")
                .setCacheControl(CacheControl.maxAge(
                        Duration.ofDays(365)
                ).cachePublic());


        registry.addResourceHandler("/imgs/**").addResourceLocations("classpath:/static/imgs/")
                .setCacheControl(CacheControl.maxAge(
                        Duration.ofDays(365)
                ).cachePublic());
    }

}
