package com.example.cms.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "customer_info")
public class CustomerInfo {

    @Id
    private String customerId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String type;
    private String status;


}
