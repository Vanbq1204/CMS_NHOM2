package com.example.cms.api.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class CustomerCare {
    @Id
    private String ticketId;
    private String customerId;
    private String issue;
    private String status;
    private String priority;
    private String resolution;
    private String createdAt;

    private CustomerCare() {
        // Default constructor
    }
}
