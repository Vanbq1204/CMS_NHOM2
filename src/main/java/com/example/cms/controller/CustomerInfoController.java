package com.example.cms.controller;

import com.example.cms.model.CustomerInfo;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/customer-info")
public class CustomerInfoController {
    private final Map<String, CustomerInfo> customers = new HashMap<>();

    @PostMapping("/add")
    public String addCustomer(@RequestBody CustomerInfo customer) {
        String id = UUID.randomUUID().toString();
        customers.put(id, customer);
        return id;
    }

    @GetMapping("/{id}")
    public CustomerInfo getCustomer(@PathVariable String id) {
        return customers.get(id);
    }

    @PutMapping("/{id}")
    public boolean updateCustomer(@PathVariable String id, @RequestBody CustomerInfo updated) {
        if (customers.containsKey(id)) {
            customers.put(id, updated);
            return true;
        }
        return false;
    }

    @GetMapping("/all")
    public Collection<CustomerInfo> getAllCustomers() {
        return customers.values();
    }
}
