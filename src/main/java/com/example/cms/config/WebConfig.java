package com.example.cms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Chuyển hướng "/" đến trang đăng nhập
        registry.addViewController("/").setViewName("forward:/login.html");
        // Chuyển hướng "/login" đến trang đăng nhập
        registry.addViewController("/login").setViewName("forward:/login.html");
        // Chuyển hướng "/register" đến trang đăng ký
        registry.addViewController("/register").setViewName("forward:/register.html");
        // Chuyển hướng "/customer" đến trang quản lý khách hàng
        registry.addViewController("/customer").setViewName("forward:/customerInfo.html");
        // Chuyển hướng "/email-marketing" đến trang Email Marketing
        registry.addViewController("/email-marketing").setViewName("forward:/emailMarketing.html");
    }
}