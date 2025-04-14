package com.example.cms.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * CustomerCare: Model đại diện cho dữ liệu chăm sóc khách hàng.
 * Map với collection 'customer_care' trong MongoDB.
 */
@Document(collection = "customer_care")
public class CustomerCare {

    @Id
    private String id;              // ID chăm sóc khách hàng
    private String customerId;      // ID khách hàng liên quan
    private String note;            // Nội dung chăm sóc hoặc phản hồi
    private String supporter;       // Người phụ trách chăm sóc
    private LocalDateTime createdAt; // Ngày tạo bản ghi

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSupporter() {
        return supporter;
    }

    public void setSupporter(String supporter) {
        this.supporter = supporter;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
