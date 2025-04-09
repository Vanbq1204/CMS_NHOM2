package com.example.cms.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "customerInfo")
public class CustomerInfo {
    @Id
    private String customerId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String customerStatus;

    private CustomerInfo(String customerId, String customerName, String customerEmail, String customerPhone, String customerAddress, String customerStatus) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
        this.customerStatus = customerStatus;
    }

}
