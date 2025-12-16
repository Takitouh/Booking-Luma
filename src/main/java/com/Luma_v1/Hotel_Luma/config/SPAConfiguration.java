package com.Luma_v1.Hotel_Luma.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class SPAConfiguration implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/contact").setViewName("forward:/index.html");
        registry.addViewController("/hotel.html").setViewName("forward:/index.html");
        registry.addViewController("/search-results.html").setViewName("forward:/index.html");
        registry.addViewController("/log-in.html").setViewName("forward:/index.html");
        registry.addViewController("/my-profile.html").setViewName("forward:/index.html");
        registry.addViewController("/sign-up.html").setViewName("forward:/index.html");
        registry.addViewController("/register-hotel.html").setViewName("forward:/index.html");
        registry.addViewController("/success-payment.html").setViewName("forward:/index.html");
        registry.addViewController("/failed-payment.html").setViewName("forward:/index.html");
        registry.addViewController("/sign-up-contributor.html").setViewName("forward:/index.html");
        registry.addViewController("/edit-hotel/*.html").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        if (!registry.hasMappingForPattern("/static/css/**")) {
            registry.addResourceHandler("/static/css/**");
        }

        if (!registry.hasMappingForPattern("/static/js/**")){
            registry.addResourceHandler("/static/js/**");
        }

        if (!registry.hasMappingForPattern("/static/imgs/**")){
            registry.addResourceHandler("/static/imgs/**");
        }
    }

}
