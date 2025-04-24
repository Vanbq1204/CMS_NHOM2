package com.example.cms.api.controller;

import com.example.cms.api.model.EmailCampaign;
import com.example.cms.api.service.EmailCampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/email-campaigns")
public class EmailCampaignController {

    private final EmailCampaignService emailCampaignService;

    @Autowired
    public EmailCampaignController(EmailCampaignService emailCampaignService) {
        this.emailCampaignService = emailCampaignService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailCampaign> getEmailCampaignById(@PathVariable String id) {
        return emailCampaignService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<EmailCampaign>> getAllEmailCampaigns() {
        return ResponseEntity.ok(emailCampaignService.getAll());
    }

    @PostMapping
    public ResponseEntity<EmailCampaign> createEmailCampaign(@RequestBody EmailCampaign campaign) {
        return ResponseEntity.ok(emailCampaignService.create(campaign));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailCampaign> updateEmailCampaign(@PathVariable String id,
                                                             @RequestBody EmailCampaign campaign) {
        return emailCampaignService.update(id, campaign)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmailCampaign(@PathVariable String id) {
        if (emailCampaignService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/send")
    public ResponseEntity<EmailCampaign> sendNow(@PathVariable String id, @RequestParam String senderEmail) {
        return emailCampaignService.sendCampaignNow(id, senderEmail)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/track/open")
    public void trackOpen(@PathVariable String id) {
        emailCampaignService.trackOpen(id);
    }

    @GetMapping("/{id}/track/click")
    public void trackClick(@PathVariable String id) {
        emailCampaignService.trackClick(id);
    }

    @PostMapping("/{id}/schedule")
    public ResponseEntity<EmailCampaign> scheduleCampaign(@PathVariable String id, @RequestParam String scheduledAt) {
        return emailCampaignService.scheduleCampaign(id, LocalDateTime.parse(scheduledAt))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/draft")
    public ResponseEntity<EmailCampaign> saveDraft(@PathVariable String id) {
        return emailCampaignService.updateStatus(id, "Draft")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
