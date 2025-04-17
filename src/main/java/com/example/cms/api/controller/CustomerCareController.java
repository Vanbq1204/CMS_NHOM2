package com.example.cms.api.controller;

import com.example.cms.api.model.CustomerCare;
import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.repository.CustomerCareRepository;
import com.example.cms.api.repository.CustomerInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer-care")
public class CustomerCareController {

    @Autowired
    private CustomerCareRepository customerCareRepository;

    @Autowired
    private CustomerInfoRepository customerInfoRepository;


    // Lấy toàn bộ yêu cầu chăm sóc khách hàng
    @GetMapping
    public List<CustomerCare> getAllCustomerCares() {
        return customerCareRepository.findAll();
    }

    // Tìm kiếm yêu cầu chăm sóc theo customerId
    @GetMapping("/search/customer-id")
    public ResponseEntity<?> searchByCustomerId(@RequestParam String customerId) {
        List<CustomerCare> customerCares = customerCareRepository.findByCustomerId(customerId);
        if (!customerCares.isEmpty()) {
            return ResponseEntity.ok(customerCares);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No CustomerCare records found for customerId: " + customerId);
        }
    }

    // Lấy yêu cầu chăm sóc khách hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerCareById(@PathVariable String id) {
        Optional<CustomerCare> customerCare = customerCareRepository.findById(id);
        if (customerCare.isPresent()) {
            return ResponseEntity.ok(customerCare.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerCare with ID " + id + " not found.");
        }
    }

    // Tạo mới một yêu cầu chăm sóc khách hàng
    @PostMapping
    public ResponseEntity<?> createCustomerCare(@RequestBody CustomerCare customerCare) {
        String customerId = customerCare.getCustomerId();
        if (customerInfoRepository.existsById(customerId)) {
            CustomerCare saved = customerCareRepository.save(customerCare);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("CustomerInfo ID không tồn tại. Không thể tạo CustomerCare.");
        }
    }


    // Cập nhật thông tin yêu cầu chăm sóc khách hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomerCare(@PathVariable String id, @RequestBody CustomerCare customerCare) {
        Optional<CustomerCare> existing = customerCareRepository.findById(id);
        if (existing.isPresent()) {
            CustomerCare oldCare = existing.get();
            oldCare.setCustomerId(customerCare.getCustomerId());
            oldCare.setIssue(customerCare.getIssue());
            oldCare.setStatus(customerCare.getStatus());
            oldCare.setPriority(customerCare.getPriority());
            oldCare.setResolution(customerCare.getResolution());
            oldCare.setCreatedAt(customerCare.getCreatedAt());
            return ResponseEntity.ok(customerCareRepository.save(oldCare));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerCare with ID " + id + " not found.");
        }
    }

    // Xóa yêu cầu chăm sóc khách hàng theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerCare(@PathVariable String id) {
        Optional<CustomerCare> existing = customerCareRepository.findById(id);
        if (existing.isPresent()) {
            customerCareRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerCare with ID " + id + " not found.");
        }
    }
}
