package com.example.cms.api.service;

import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    public boolean sendEmail(String to, String subject, String content) {
        System.out.println("Sending email to " + to + " with subject: " + subject);
        return !to.endsWith("@invalid.com");
    }
}
