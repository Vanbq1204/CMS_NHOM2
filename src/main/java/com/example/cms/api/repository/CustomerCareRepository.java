package com.example.cms.api.repository;

import com.example.cms.api.model.CustomerCare;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCareRepository extends MongoRepository<CustomerCare, String> {
    // Tìm tất cả yêu cầu chăm sóc của khách hàng theo customerId
    List<CustomerCare> findByCustomerId(String customerId);
}
