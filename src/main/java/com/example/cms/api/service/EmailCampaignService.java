package com.example.cms.api.service;

import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.model.EmailCampaign;
import com.example.cms.api.model.EmailReceiverGroup;
import com.example.cms.api.repository.CustomerInfoRepository;
import com.example.cms.api.repository.EmailCampaignRepository;
import com.example.cms.api.repository.EmailReceiverGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmailCampaignService {

    @Autowired
    private EmailCampaignRepository emailCampaignRepository;

    @Autowired
    private EmailReceiverGroupRepository emailReceiverGroupRepository;

    @Autowired
    private CustomerInfoRepository customerInfoRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    public List<EmailCampaign> getAll() {
        return emailCampaignRepository.findAll();
    }

    public Optional<EmailCampaign> getById(String id) {
        return emailCampaignRepository.findById(id);
    }

    public EmailCampaign create(EmailCampaign emailCampaign) {
        if (emailCampaign.getCreatedAt() == null || emailCampaign.getCreatedAt().isEmpty()) {
            emailCampaign.setCreatedAt(LocalDateTime.now().toString());
        }
        return emailCampaignRepository.save(emailCampaign);
    }

    public Optional<EmailCampaign> update(String id, EmailCampaign emailCampaign) {
        return emailCampaignRepository.findById(id).map(existing -> {
            emailCampaign.setId(id);
            return emailCampaignRepository.save(emailCampaign);
        });
    }

    public boolean delete(String id) {
        if (emailCampaignRepository.existsById(id)) {
            emailCampaignRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<EmailCampaign> sendCampaignNow(String id) {
        return emailCampaignRepository.findById(id).map(emailCampaign -> {
            List<CustomerInfo> receivers;

            if (emailCampaign.getReceiverGroupId() != null) {
                Optional<EmailReceiverGroup> receiverGroup = emailReceiverGroupRepository.findById(emailCampaign.getReceiverGroupId());
                if (receiverGroup.isPresent()) {
                    receivers = customerInfoRepository.findAllById(receiverGroup.get().getCustomerIds());
                } else {
                    receivers = new ArrayList<>();
                }
            } else if (emailCampaign.getCustomerType() != null) {
                receivers = customerInfoRepository.findByType(emailCampaign.getCustomerType());
            } else {
                receivers = new ArrayList<>();
            }

            int received = 0;
            int bounced = 0;

            for (CustomerInfo customerInfo : receivers) {
                boolean success = emailSenderService.sendEmail(
                        customerInfo.getEmail(),
                        emailCampaign.getTitle(),
                        emailCampaign.getContent()
                );

                if (success) {
                    received++;
                } else {
                    bounced++;
                }
            }
            emailCampaign.setStatus(("Đã gửi"));
            emailCampaign.setReceivedCount(received);
            emailCampaign.setBouncedCount(bounced);
            return emailCampaignRepository.save(emailCampaign);
        });
    }

    public void trackOpen(String campaignId) {
        emailCampaignRepository.findById(campaignId).ifPresent(campaign -> {
            campaign.setOpenCount(campaign.getOpenCount() + 1);
            emailCampaignRepository.save(campaign);
        });
    }

    public void trackClick(String campaignId) {
        emailCampaignRepository.findById(campaignId).ifPresent(campaign -> {
            campaign.setClickCount(campaign.getClickCount() + 1);
            emailCampaignRepository.save(campaign);
        });
    }

    public Optional<EmailCampaign> scheduleCampaign(String id, LocalDateTime scheduledTime) {
        return emailCampaignRepository.findById(id).map(campaign -> {
            campaign.setScheduledAt(scheduledTime);
            campaign.setStatus("Scheduled");
            return emailCampaignRepository.save(campaign);
        });
    }

    public Optional<EmailCampaign> updateStatus(String id, String status) {
        return emailCampaignRepository.findById(id).map(campaign -> {
            campaign.setStatus(status);
            return emailCampaignRepository.save(campaign);
        });
    }
}