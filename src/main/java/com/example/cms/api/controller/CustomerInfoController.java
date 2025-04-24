package com.example.cms.api.controller;

import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.model.User;
import com.example.cms.api.repository.CustomerInfoRepository;
import com.example.cms.api.service.EmailSenderService;
import com.example.cms.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer-info")
public class CustomerInfoController {

    @Autowired
    private CustomerInfoRepository customerInfoRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailSenderService emailSenderService;

    // Lấy tất cả thông tin khách hàng
    @GetMapping
    public List<CustomerInfo> getAllCustomerInfos() {
        return customerInfoRepository.findAll(); // Trả về tất cả thông tin khách hàng
    }

    // Lấy thông tin khách hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerInfoById(@PathVariable String id) {
        // Tìm thông tin khách hàng theo ID
        Optional<CustomerInfo> customerInfo = customerInfoRepository.findById(id);
        if (customerInfo.isPresent()) {
            return ResponseEntity.ok(customerInfo.get()); // Trả về dữ liệu nếu tìm thấy
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerInfo with ID " + id + " not found."); // Thông báo lỗi nếu không tìm thấy
        }
    }

    // Tạo mới thông tin khách hàng
    @PostMapping
    public ResponseEntity<?> createCustomerInfo(@RequestBody CustomerInfo customerInfo) {
        // Lưu thông tin khách hàng mới vào DB
        CustomerInfo savedCustomer = customerInfoRepository.save(customerInfo);
        
        // Tạo tài khoản đăng nhập cho khách hàng
        String email = savedCustomer.getEmail();
        String defaultPassword = "khachhangcms@123";
        
        if (email != null && !email.isEmpty()) {
            // Tạo tài khoản với vai trò CUSTOMER
            User newUser = userService.registerCustomer(email, defaultPassword, email);
            
            if (newUser != null) {
                // Gửi thông báo tài khoản qua email
                String emailSubject = "Thông tin tài khoản CMS của bạn";
                String emailContent = "<html><body>"
                    + "<h2>Kính gửi " + savedCustomer.getName() + "</h2>"
                    + "<p>Tài khoản của bạn trên hệ thống CMS đã được tạo thành công.</p>"
                    + "<p><b>Thông tin đăng nhập:</b></p>"
                    + "<ul>"
                    + "<li><b>Tên đăng nhập:</b> " + email + "</li>"
                    + "<li><b>Mật khẩu:</b> " + defaultPassword + "</li>"
                    + "</ul>"
                    + "<p>Vui lòng đăng nhập tại: <a href='http://localhost:8080/login.html'>Hệ thống quản lý khách hàng</a></p>"
                    + "<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>"
                    + "</body></html>";
                
                // Gửi email thông báo
                emailSenderService.sendEmail("admin@cms.com", email, emailSubject, emailContent);
            }
        }
        
        return ResponseEntity.ok(savedCustomer);
    }

    // Cập nhật thông tin khách hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomerInfo(@PathVariable String id, @RequestBody CustomerInfo customerInfo) {
        // Kiểm tra xem khách hàng đã tồn tại chưa
        Optional<CustomerInfo> existing = customerInfoRepository.findById(id);
        if (existing.isPresent()) {
            CustomerInfo oldInfo = existing.get();
            // Cập nhật các trường thông tin khách hàng
            oldInfo.setName(customerInfo.getName());
            oldInfo.setEmail(customerInfo.getEmail());
            oldInfo.setPhone(customerInfo.getPhone());
            oldInfo.setAddress(customerInfo.getAddress());
            oldInfo.setType(customerInfo.getType());
            oldInfo.setStatus(customerInfo.getStatus());
            oldInfo.setCreatedAt(customerInfo.getCreatedAt());
            return ResponseEntity.ok(customerInfoRepository.save(oldInfo)); // Lưu và trả về thông tin khách hàng đã cập nhật
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerInfo with ID " + id + " not found."); // Thông báo lỗi nếu không tìm thấy khách hàng
        }
    }

    // Xóa thông tin khách hàng theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerInfo(@PathVariable String id) {
        // Kiểm tra xem khách hàng có tồn tại không
        Optional<CustomerInfo> existing = customerInfoRepository.findById(id);
        if (existing.isPresent()) {
            customerInfoRepository.deleteById(id); // Xóa thông tin khách hàng theo ID
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // Trả về mã 204 khi xóa thành công
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerInfo with ID " + id + " not found."); // Thông báo lỗi nếu không tìm thấy khách hàng
        }
    }

    // Tìm kiếm khách hàng theo tên
    @GetMapping("/search/name")
    public List<CustomerInfo> searchByName(@RequestParam String name) {
        return customerInfoRepository.findByNameContainingIgnoreCase(name); // Tìm kiếm khách hàng theo tên
    }

    // Tìm kiếm khách hàng theo loại
    @GetMapping("/search/type")
    public List<CustomerInfo> searchByType(@RequestParam String type) {
        return customerInfoRepository.findByType(type); // Tìm kiếm khách hàng theo loại
    }

    // Tìm kiếm khách hàng theo email
    @GetMapping("/search/email")
    public List<CustomerInfo> searchByEmail(@RequestParam String email) {
        return customerInfoRepository.findByEmail(email); // Tìm kiếm khách hàng theo email
    }
}
