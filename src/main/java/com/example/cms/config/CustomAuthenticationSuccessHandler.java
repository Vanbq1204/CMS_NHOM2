package com.example.cms.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Set<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        String redirectUrl = "/customerInfo.html";

        if (roles.contains("ADMIN")) {
            redirectUrl = "/customerInfo.html";
        } else if (roles.contains("ADMIN_CUSTOMER")) {
            redirectUrl = "/customerInfo.html";
        } else if (roles.contains("ADMIN_EMAIL_MARKETING")) {
            redirectUrl = "/emailMarketing.html";
        } else if (roles.contains("ADMIN_CUSTOMER_CARE")) {
            redirectUrl = "/customerCare.html";
        } else if (roles.contains("CUSTOMER")) {
            redirectUrl = "/customer-dashboard.html";
        }

        response.sendRedirect(request.getContextPath() + redirectUrl);
    }
}
