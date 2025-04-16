package com.example.cms.corba.service;

import CMS.CustomerInfo;
import CMS.CustomerUpdateServicePOA;

public class CorbaCustomerUpdateService extends CustomerUpdateServicePOA {
    @Override
    public boolean updateCustomerInfo(String customerId, CustomerInfo newInfo) {
        return false;
    }

    @Override
    public boolean updateStatus(String customerId, String newStatus) {
        return false;
    }

    @Override
    public void logCustomerChange(String customerId, String changeType) {

    }
}
