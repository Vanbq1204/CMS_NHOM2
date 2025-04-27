package com.example.cms.api.controller;

import com.example.cms.api.model.EmailReceiverGroup;
import com.example.cms.api.service.EmailReceiverGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/email/receiver-group")
@PreAuthorize("hasAnyAuthority('ADMIN', 'ADMIN_EMAIL_MARKETING', 'ADMIN_CUSTOMER')")
public class EmailReceiverGroupController {

    @Autowired
    private EmailReceiverGroupService emailReceiverGroupService;

    @GetMapping
    public ResponseEntity<List<EmailReceiverGroup>> getAllEmailReceiverGroup() {
        return ResponseEntity.ok(emailReceiverGroupService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailReceiverGroup> getEmailReceiverGroupById(@PathVariable String id) {
        EmailReceiverGroup group = emailReceiverGroupService.getById(id);
        if (group != null) {
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EmailReceiverGroup> createEmailReceiverGroup(@RequestBody EmailReceiverGroup emailReceiverGroup) {
        return ResponseEntity.ok(emailReceiverGroupService.create(emailReceiverGroup));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailReceiverGroup> updateEmailReceiverGroup(@PathVariable String id, @RequestBody EmailReceiverGroup emailReceiverGroup) {
        EmailReceiverGroup updatedEmailReceiverGroup = emailReceiverGroupService.update(id, emailReceiverGroup);
        return updatedEmailReceiverGroup != null ? ResponseEntity.ok(updatedEmailReceiverGroup) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteEmailReceiverGroup(@PathVariable String id) {
        if (emailReceiverGroupService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/add-customer/{customerId}")
    public ResponseEntity<EmailReceiverGroup> addCustomerToGroup(@PathVariable String id, @PathVariable String customerId) {
        return emailReceiverGroupService.addCustomerToGroup(id, customerId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/remove-customer/{customerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<EmailReceiverGroup> removeCustomerFromGroup(@PathVariable String id, @PathVariable String customerId) {
        return emailReceiverGroupService.removeCustomerFromGroup(id, customerId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
