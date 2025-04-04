package com.example.cms.service;

import CMS.CustomerInfo;
import CMS.CustomerInfoServicePOA;
import org.springframework.stereotype.Service;

@Service
public class CustomerInfoService extends CustomerInfoServicePOA {
    @Override
    public CustomerInfo getCustomer(String customerId) {
        return new CustomerInfo();
    }

    @Override
    public CustomerInfo[] searchCustomer(String customerId) {
        return new CustomerInfo[0];
    }

    @Override
    public boolean addCustomer(CustomerInfo customerInfo) {
        return true;
    }

    @Override
    public CustomerInfo[] getAllCustomer() {
        return new CustomerInfo[0];
    }
}
