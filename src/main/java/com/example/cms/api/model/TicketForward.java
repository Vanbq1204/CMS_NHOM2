package com.example.cms.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "ticket_forwards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketForward {

    @Id
    private String id;
    
    private String ticketId;              // ID của yêu cầu hỗ trợ được chuyển tiếp
    private String sourceDepartment;      // Bộ phận nguồn (mặc định: CUSTOMER_CARE)
    private String targetDepartment;      // Bộ phận đích
    private String reason;                // Lý do chuyển tiếp
    private String notes;                 // Ghi chú cho bộ phận tiếp nhận
    private boolean notifyCustomer;       // Có thông báo cho khách hàng hay không
    private String status;                // Trạng thái: PENDING, ACCEPTED, COMPLETED, REJECTED
    private LocalDateTime forwardDate;    // Ngày chuyển tiếp
    
    // Trường phụ trợ để hiển thị trên frontend
    private String ticketInfo;            // Thông tin ticket dạng: #ID - Subject (CustomerName)
} 