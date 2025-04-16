package com.example.cms.api.controller;

import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.repository.CustomerInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerInfoController {

    @Autowired
    private CustomerInfoRepository customerInfoRepository;


    //Tạo mới thông tin khách hàng.
    @PostMapping
    public ResponseEntity<CustomerInfo> createCustomer(@RequestBody CustomerInfo customer) {
        CustomerInfo saved = customerInfoRepository.save(customer);
        return ResponseEntity.ok(saved);
    }

    // Lấy danh sách tất cả khách hàng.

    @GetMapping
    public ResponseEntity<List<CustomerInfo>> getAllCustomers() {
        List<CustomerInfo> customers = customerInfoRepository.findAll();
        return ResponseEntity.ok(customers);
    }


//Lấy thông tin khách hàng theo ID.

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerInfo> getCustomerById(@PathVariable String customerId) {
        Optional<CustomerInfo> customer = customerInfoRepository.findById(customerId);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Cập nhật thông tin khách hàng.
     */
    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerInfo> updateCustomer(@PathVariable String customerId, @RequestBody CustomerInfo update) {
        if (!customerInfoRepository.existsById(customerId)) {
            return ResponseEntity.notFound().build();
        }
        update.setCustomerId(customerId);
        CustomerInfo saved = customerInfoRepository.save(update);
        return ResponseEntity.ok(saved);
    }

    //Xóa khách hàng theo ID.
    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String customerId) {
        if (!customerInfoRepository.existsById(customerId)) {
            return ResponseEntity.notFound().build();
        }
        customerInfoRepository.deleteById(customerId);
        return ResponseEntity.noContent().build();
    }

    //Lấy danh sách khách hàng theo loại.

    @GetMapping("/type/{customerType}")
    public ResponseEntity<List<CustomerInfo>> getCustomersByType(@PathVariable String customerType) {
        List<CustomerInfo> customers = customerInfoRepository.findByType(customerType);
        return ResponseEntity.ok(customers);
    }
}
