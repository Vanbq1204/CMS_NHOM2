package com.example.cms.api.repository;

import com.example.cms.api.model.*;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerCareRepository extends MongoRepository<com.example.cms.api.model.CustomerCare, String> {
}
