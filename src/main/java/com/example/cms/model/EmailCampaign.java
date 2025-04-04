package com.example.cms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class EmailCampaign {
    @Id
    private String campaignId;
    private String title;
    private String content;
    private String targetSegment;
    private String status;

}
