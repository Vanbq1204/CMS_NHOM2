package com.example.cms.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "email_receiver_group")
public class EmailReceiverGroup {

    @Id
    private String id;
    private String name;
    private List<String> customerIds;
    private String customerType;
    private boolean autoSegmented;
}
