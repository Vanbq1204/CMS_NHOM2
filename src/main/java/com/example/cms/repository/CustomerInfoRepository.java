package com.example.cms.repository;

import com.example.cms.model.CustomerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerInfoRepository extends MongoRepository<CustomerInfo, String> {
}
