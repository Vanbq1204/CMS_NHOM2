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
    private String issue;
    private String status;
    private String priority;
    private String resolution;
    private LocalDateTime createdAt;

}
