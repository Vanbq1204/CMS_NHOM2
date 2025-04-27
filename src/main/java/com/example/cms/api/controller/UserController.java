package com.example.cms.api.controller;

import com.example.cms.api.model.User;
import com.example.cms.api.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public void redirectToLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("/login.html"); // Redirects to login.html
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestParam String userName,
            @RequestParam String password,
            @RequestParam String email) {
        
        if (userService.userExists(userName)) {
            return ResponseEntity.status(409).body("Tài khoản đã tồn tại");
        }
        
        User newUser = userService.register(userName, password, email);
        if (newUser != null) {
            return ResponseEntity.ok("Đăng ký thành công");
        } else {
            return ResponseEntity.status(500).body("Đăng ký không thành công");
        }
    }

    @GetMapping("/email")
    public ResponseEntity<String> getUserEmail(@RequestParam String userName) {
        return userService.findByUserName(userName)
                .map(user -> ResponseEntity.ok(user.getEmail()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/roles")
    public ResponseEntity<Set<String>> getUserRoles(@RequestParam String userName) {
        return userService.findByUserName(userName)
                .map(User::getRoles)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/permissions")
    public ResponseEntity<Set<String>> getUserPermissions(@RequestParam String userName) {
        return userService.findByUserName(userName)
                .map(User::getPermissions)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Không có quyền truy cập");
        }

        Optional<User> userOptional = userService.findByUserName(principal.getUsername());
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body("Không tìm thấy người dùng");
        }

        User user = userOptional.get();
        return ResponseEntity.ok().body(user);
    }
}