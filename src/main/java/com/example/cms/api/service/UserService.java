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
                .filter(user -> user.getPassword() != null && user.getPassword().equals(password));
    }

    public boolean userExists(String userName) {
        return userRepository.findByUserName(userName).isPresent();
    }
}
