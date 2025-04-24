package com.example.cms.api.repository;

import com.example.cms.api.model.CustomerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository // Repository thao tác với MongoDB cho CustomerInfo
public interface CustomerInfoRepository extends MongoRepository<CustomerInfo, String> {
    List<CustomerInfo> findByNameContainingIgnoreCase(String name); // Tìm khách theo tên
    List<CustomerInfo> findByType(String type); // Tìm khách theo loại
    List<CustomerInfo> findByEmail(String email); // Tìm khách theo email
}
