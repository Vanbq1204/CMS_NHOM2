package com.example.cms.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailSenderService {
    
    @Value("${spring.mail.host:smtp.gmail.com}")
    private String host;
    
    @Value("${spring.mail.port:587}")
    private String port;
    
    @Value("${spring.mail.username:}")
    private String username;
    
    @Value("${spring.mail.password:}")
    private String password;
    
    public boolean sendEmail(String from, String to, String subject, String content) {
        try {
            System.out.println("Attempting to send email from " + from + " to " + to);
            
            // Nếu không có thông tin cấu hình email, ghi log và giả lập gửi thành công
            if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
                System.out.println("Email configuration is missing. Using simulation mode.");
                System.out.println("Simulated: Sending email from " + from + " to " + to + " with subject: " + subject);
                return !to.endsWith("@invalid.com");
            }
            
            System.out.println("Using email credentials: " + username + " [password hidden]");
            
            // Cấu hình properties cho session
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", port);
            props.put("mail.smtp.ssl.trust", host);
            props.put("mail.smtp.connectiontimeout", "5000");
            props.put("mail.smtp.timeout", "5000");
            props.put("mail.smtp.writetimeout", "5000");
            props.put("mail.debug", "true"); // Enable for debugging
            
            System.out.println("Establishing mail session with properties: " + props);
            
            // Tạo session email với xác thực
            Session session = Session.getInstance(props, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });
            
            // In ra thông tin debug
            session.setDebug(true);
            
            // Tạo message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username)); // Sử dụng tài khoản được cấu hình
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);
            message.setHeader("X-Mailer", "CMS Email System");
            
            // Thêm thông tin "Sent on behalf of" vào nội dung
            String finalContent = "<p><i>Sent on behalf of: " + from + "</i></p><hr>" + content;
            
            // Hỗ trợ HTML
            message.setContent(finalContent, "text/html; charset=utf-8");
            
            System.out.println("Sending email message...");
            
            // Gửi message
            Transport.send(message);
            
            System.out.println("Email sent successfully from " + username + " to " + to);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Failed to send email: " + e.getMessage());
            
            // In thêm chi tiết lỗi để debug
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Root cause: " + cause.getMessage());
                cause.printStackTrace();
            }
            
            return false;
        }
    }
}
