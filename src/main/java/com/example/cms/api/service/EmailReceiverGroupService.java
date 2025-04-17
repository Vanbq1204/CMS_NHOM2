package com.example.cms.api.service;

import com.example.cms.api.model.EmailReceiverGroup;
import com.example.cms.api.repository.EmailReceiverGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmailReceiverGroupService {

    @Autowired
    private EmailReceiverGroupRepository emailReceiverGroupRepository;

    public List<EmailReceiverGroup> getAll() {
        return emailReceiverGroupRepository.findAll();
    }

    public EmailReceiverGroup create(EmailReceiverGroup emailReceiverGroup) {
        return emailReceiverGroupRepository.save(emailReceiverGroup);
    }

    public EmailReceiverGroup update(String id, EmailReceiverGroup emailReceiverGroup) {
        return emailReceiverGroupRepository.findById(id).map(existing -> {
            emailReceiverGroup.setId(id);
            return emailReceiverGroupRepository.save(emailReceiverGroup);
        }).orElse(null);
    }

    public boolean delete(String id) {
        if (emailReceiverGroupRepository.existsById(id)) {
            emailReceiverGroupRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<EmailReceiverGroup> addCustomerToGroup(String groupId, String customerId) {
        return emailReceiverGroupRepository.findById(groupId).map(group -> {
            if (!group.getCustomerIds().contains(customerId)) {
                group.getCustomerIds().add(customerId);
                return emailReceiverGroupRepository.save(group);
            }
            return group;
        });
    }

    public Optional<EmailReceiverGroup> removeCustomerFromGroup(String groupId, String customerId) {
        return emailReceiverGroupRepository.findById(groupId).map(group -> {
            group.getCustomerIds().remove(customerId);
            return emailReceiverGroupRepository.save(group);
        });
    }
}
