package com.example.cms.api.repository;

import com.example.cms.api.model.CustomerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerInfoRepository extends MongoRepository<CustomerInfo, String> {
}
