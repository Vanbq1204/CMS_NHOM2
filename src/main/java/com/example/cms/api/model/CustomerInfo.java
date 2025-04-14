package com.example.cms.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * CustomerInfo: Đại diện cho thông tin khách hàng.
 * Map với collection 'customer_info' trong MongoDB.
 */
@Document(collection = "customer_info")
public class CustomerInfo {

    @Id
    private String customerId;  // ID khách hàng (duy nhất)
    private String name;        // Tên khách hàng
    private String email;       // Email liên hệ
    private String phone;       // Số điện thoại
    private String address;     // Địa chỉ khách hàng
    private String type;        // Loại khách hàng
    private String status;      // Trạng thái khách hàng

    // Getter - Setter
    public String getCustomerId() {
        return customerId;
    }
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
