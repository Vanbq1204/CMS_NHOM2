package com.example.cms.api.service;

import com.example.cms.api.model.User;
import com.example.cms.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean userExists(String userName) {
        return userRepository.findByUserName(userName).isPresent();
    }
    
    public User register(String userName, String password, String email) {
        if (userExists(userName)) {
            return null; // Trả về null nếu username đã tồn tại
        }
        
        User newUser = new User();
        newUser.setUserName(userName);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);

        Set<String> roles = new HashSet<>();
        roles.add("CUSTOMER"); // Default role
        newUser.setRoles(roles);
        
        return userRepository.save(newUser);
    }

    public User registerCustomer(String userName, String password, String email) {
        if (userExists(userName)) {
            return null; // Trả về null nếu username đã tồn tại
        }
        
        User newUser = new User();
        newUser.setUserName(userName);
        newUser.setPassword(password);
        newUser.setEmail(email);

        Set<String> roles = new HashSet<>();
        roles.add("CUSTOMER"); // Customer role
        newUser.setRoles(roles);
        
        return userRepository.save(newUser);
    }

    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
