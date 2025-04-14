package com.example.cms.api.repository;

import com.example.cms.api.model.CustomerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerInfoRepository extends MongoRepository<CustomerInfo, String> {
    List<CustomerInfo> findByType(String type);
}
