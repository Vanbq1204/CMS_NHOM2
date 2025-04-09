package com.example.cms.corba.service;

import CMS.EmailCampaign;
import CMS.EmailMarketingServicePOA;

public class EmailMarketingService extends EmailMarketingServicePOA {
    @Override
    public boolean createCampaign(EmailCampaign campaign) {
        return false;
    }

    @Override
    public boolean sendCampaign(String campaignId) {
        return false;
    }

    @Override
    public String[] getCustomerSegment(String segmentCriteria) {
        return new String[0];
    }

    @Override
    public EmailCampaign getCampaign(String campaignId) {
        return null;
    }
}
