package com.example.cms.api.service;

import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.model.EmailCampaign;
import com.example.cms.api.repository.CustomerInfoRepository;
import com.example.cms.api.repository.EmailCampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmailCampaignService {

    @Autowired
    private EmailCampaignRepository emailCampaignRepository;

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
        return emailCampaignRepository.findById(id).map(campaign -> {
            List<CustomerInfo> receivers = customerInfoRepository.findByType(campaign.getReceiverGroup());

            int received = 0, bounced = 0;

            for (CustomerInfo receiver : receivers) {
                boolean success = emailSenderService.sendEmail(
                        receiver.getEmail(), campaign.getTitle(), campaign.getContent());

                if (success) received++;
                else bounced++;
            }

            campaign.setStatus("Sent");
            campaign.setReceivedCount(received);
            campaign.setBouncedCount(bounced);
            return emailCampaignRepository.save(campaign);
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
}