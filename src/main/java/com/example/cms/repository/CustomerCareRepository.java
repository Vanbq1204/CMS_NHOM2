package com.example.cms.repository;

import com.example.cms.model.CustomerCare;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerCareRepository extends MongoRepository<CustomerCare, String> {
}
