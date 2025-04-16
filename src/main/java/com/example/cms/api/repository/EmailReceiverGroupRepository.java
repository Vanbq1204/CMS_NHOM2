package com.example.cms.api.repository;

import com.example.cms.api.model.EmailReceiverGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailReceiverGroupRepository extends MongoRepository<EmailReceiverGroup, String> {
}
