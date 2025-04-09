package com.example.cms.api.model;

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
    private String customerType;
    private String customerStatus;

    private CustomerInfo() {
        // Default constructor
    }

}
