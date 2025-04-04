package com.example.cms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CustomerCare {
    @Id
    private String ticketId;
    private String customerId;
    private String issue;
    private String status;
    private String priority;
    private String resolution;
}
