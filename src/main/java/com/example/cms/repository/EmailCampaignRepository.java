package com.example.cms.repository;

import com.example.cms.model.EmailCampaign;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailCampaignRepository extends MongoRepository<EmailCampaign, String> {
}
