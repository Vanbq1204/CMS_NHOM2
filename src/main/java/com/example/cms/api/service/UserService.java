package com.example.cms.api.service;

import com.example.cms.api.model.User;
import com.example.cms.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(String userName, String password) {
        return userRepository.findByUserName(userName)
                .filter(user -> user.getPassword() != null && user.getPassword().equals(password))
                .map(user -> {
                    // Set default role if not already set
                    if (user.getRole() == null) {
                        user.setRole("ADMIN"); // Default role for existing users
                        userRepository.save(user);
                    }
                    return user;
                });
    }

    public boolean userExists(String userName) {
        return userRepository.findByUserName(userName).isPresent();
    }
    
    public User register(String userName, String password, String email) {
        if (userExists(userName)) {
            return null; // Trả về null nếu username đã tồn tại
        }
        
        User newUser = new User();
        newUser.setUserName(userName);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setRole("ADMIN"); // Default role
        
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
        newUser.setRole("CUSTOMER"); // Customer role
        
        return userRepository.save(newUser);
    }

    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
