package com.example.cms.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "customer_care")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCare {

    @Id
    private String id;
    private String customerId;
    private String subject;         // Tiêu đề của yêu cầu
    private String issue;           // Vấn đề chi tiết (có thể là alias của description)
    private String description;     // Mô tả chi tiết vấn đề
    private String status;
    private String priority;
    private String resolution;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Các trường phụ trợ để hỗ trợ hiển thị trên frontend
    private String customerName;    // Tên khách hàng
    private String customerEmail;   // Email khách hàng
    private String customerPhone;   // Điện thoại khách hàng
}
