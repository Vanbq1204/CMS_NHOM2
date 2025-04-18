package com.example.cms.api.controller;

import com.example.cms.api.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public void redirectToLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("/login.html"); // Redirects to login.html
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String userName, @RequestParam String password) {
        return userService.login(userName, password)
                .map(user -> ResponseEntity.ok("Login successful"))
                .orElseGet(() -> {
                    if (userService.userExists(userName)) {
                        return ResponseEntity.status(401).body("Invalid password");
                    } else {
                        return ResponseEntity.status(404).body("User not found");
                    }
                });
    }
}