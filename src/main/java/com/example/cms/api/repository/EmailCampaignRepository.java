package com.example.cms.api.repository;

import com.example.cms.api.model.EmailCampaign;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailCampaignRepository extends MongoRepository<EmailCampaign, String> {
}
