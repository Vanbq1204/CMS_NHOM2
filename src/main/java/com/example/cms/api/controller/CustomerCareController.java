package com.example.cms.api.controller;

import com.example.cms.api.model.CustomerCare;
import com.example.cms.api.repository.CustomerCareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * CustomerCareController: Quản lý API chăm sóc khách hàng.
 * Bao gồm chức năng thêm mới, lấy danh sách, chi tiết theo ID.
 */
@RestController
@RequestMapping("/api/customer-care")
public class CustomerCareController {

    @Autowired
    private CustomerCareRepository customerCareRepository;

    @PostMapping
    public ResponseEntity<CustomerCare> createCare(@RequestBody CustomerCare care) {
        care.setCreatedAt(LocalDateTime.now());
        CustomerCare saved = customerCareRepository.save(care);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<CustomerCare>> getAllCare() {
        List<CustomerCare> list = customerCareRepository.findAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerCare> getCareById(@PathVariable String id) {
        Optional<CustomerCare> care = customerCareRepository.findById(id);
        return care.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
