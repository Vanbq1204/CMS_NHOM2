package com.example.cms.api.controller;

import com.example.cms.api.model.CustomerCare;
import com.example.cms.api.model.CustomerInfo;
import com.example.cms.api.model.TicketForward;
import com.example.cms.api.repository.CustomerCareRepository;
import com.example.cms.api.repository.CustomerInfoRepository;
import com.example.cms.api.repository.TicketForwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer-care")
public class CustomerCareController {

    @Autowired
    private CustomerCareRepository customerCareRepository;

    @Autowired
    private CustomerInfoRepository customerInfoRepository;
    
    @Autowired
    private TicketForwardRepository ticketForwardRepository;

    // Lấy toàn bộ yêu cầu chăm sóc khách hàng
    @GetMapping
    public List<CustomerCare> getAllCustomerCares() {
        return customerCareRepository.findAll();
    }

    // Endpoint tương thích với frontend - alias cho getAllCustomerCares()
    @GetMapping("/tickets")
    public List<CustomerCare> getAllTickets() {
        List<CustomerCare> tickets = customerCareRepository.findAll();
        enrichTicketsWithCustomerInfo(tickets);
        return tickets;
    }

    // Tìm kiếm yêu cầu chăm sóc theo customerId
    @GetMapping("/search/customer-id")
    public ResponseEntity<?> searchByCustomerId(@RequestParam String customerId) {
        List<CustomerCare> customerCares = customerCareRepository.findByCustomerId(customerId);
        if (!customerCares.isEmpty()) {
            enrichTicketsWithCustomerInfo(customerCares);
            return ResponseEntity.ok(customerCares);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No CustomerCare records found for customerId: " + customerId);
        }
    }

    // Endpoint lọc theo status và priority để tương thích với frontend
    @GetMapping("/tickets/filter")
    public ResponseEntity<?> filterTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {
        
        List<CustomerCare> allTickets = customerCareRepository.findAll();
        List<CustomerCare> filteredTickets = allTickets.stream()
                .filter(ticket -> (status == null || status.isEmpty() || ticket.getStatus().equals(status)))
                .filter(ticket -> (priority == null || priority.isEmpty() || ticket.getPriority().equals(priority)))
                .collect(Collectors.toList());
        
        enrichTicketsWithCustomerInfo(filteredTickets);
        return ResponseEntity.ok(filteredTickets);
    }

    // Endpoint tìm kiếm theo query để tương thích với frontend
    @GetMapping("/tickets/search")
    public ResponseEntity<?> searchTickets(@RequestParam String query) {
        List<CustomerCare> allTickets = customerCareRepository.findAll();
        List<CustomerCare> searchResults = allTickets.stream()
                .filter(ticket -> 
                    ticket.getId().contains(query) || 
                    ticket.getCustomerId().contains(query) || 
                    (ticket.getSubject() != null && ticket.getSubject().contains(query)) ||
                    (ticket.getIssue() != null && ticket.getIssue().contains(query)) ||
                    (ticket.getDescription() != null && ticket.getDescription().contains(query)) ||
                    (ticket.getStatus() != null && ticket.getStatus().contains(query)) ||
                    (ticket.getPriority() != null && ticket.getPriority().contains(query)))
                .collect(Collectors.toList());
        
        enrichTicketsWithCustomerInfo(searchResults);
        return ResponseEntity.ok(searchResults);
    }

    // Lấy yêu cầu chăm sóc khách hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerCareById(@PathVariable String id) {
        Optional<CustomerCare> customerCareOpt = customerCareRepository.findById(id);
        if (customerCareOpt.isPresent()) {
            CustomerCare customerCare = customerCareOpt.get();
            enrichTicketWithCustomerInfo(customerCare);
            return ResponseEntity.ok(customerCare);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerCare with ID " + id + " not found.");
        }
    }

    // Alias cho getCustomerCareById() để tương thích với frontend
    @GetMapping("/tickets/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable String id) {
        return getCustomerCareById(id);
    }

    // Tạo mới một yêu cầu chăm sóc khách hàng
    @PostMapping
    public ResponseEntity<?> createCustomerCare(@RequestBody CustomerCare customerCare) {
        String customerId = customerCare.getCustomerId();
        Optional<CustomerInfo> customerInfoOpt = customerInfoRepository.findById(customerId);
        
        if (customerInfoOpt.isPresent()) {
            // Thiết lập thời gian tạo và cập nhật
            LocalDateTime now = LocalDateTime.now();
            customerCare.setCreatedAt(now);
            customerCare.setUpdatedAt(now);
            
            // Luôn đặt trạng thái là NEW cho yêu cầu mới từ khách hàng
            customerCare.setStatus("NEW");
            
            // Đảm bảo các trường tương thích
            syncFields(customerCare);
            
            // Thiết lập thông tin khách hàng
            CustomerInfo customerInfo = customerInfoOpt.get();
            customerCare.setCustomerName(customerInfo.getName());
            customerCare.setCustomerEmail(customerInfo.getEmail());
            customerCare.setCustomerPhone(customerInfo.getPhone());
            
            CustomerCare saved = customerCareRepository.save(customerCare);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("CustomerInfo ID không tồn tại. Không thể tạo CustomerCare.");
        }
    }

    // Alias cho createCustomerCare() để tương thích với frontend
    @PostMapping("/tickets")
    public ResponseEntity<?> createTicket(@RequestBody CustomerCare customerCare) {
        return createCustomerCare(customerCare);
    }

    // Cập nhật thông tin yêu cầu chăm sóc khách hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomerCare(@PathVariable String id, @RequestBody CustomerCare customerCare) {
        Optional<CustomerCare> existingOpt = customerCareRepository.findById(id);
        if (existingOpt.isPresent()) {
            CustomerCare existing = existingOpt.get();
            
            // Cập nhật các trường
            existing.setCustomerId(customerCare.getCustomerId());
            existing.setSubject(customerCare.getSubject());
            existing.setIssue(customerCare.getIssue());
            existing.setDescription(customerCare.getDescription());
            existing.setStatus(customerCare.getStatus());
            existing.setPriority(customerCare.getPriority());
            existing.setResolution(customerCare.getResolution());
            existing.setUpdatedAt(LocalDateTime.now());
            
            // Đảm bảo các trường tương thích
            syncFields(existing);
            
            // Cập nhật thông tin khách hàng nếu customerId thay đổi
            Optional<CustomerInfo> customerInfoOpt = customerInfoRepository.findById(existing.getCustomerId());
            if (customerInfoOpt.isPresent()) {
                CustomerInfo customerInfo = customerInfoOpt.get();
                existing.setCustomerName(customerInfo.getName());
                existing.setCustomerEmail(customerInfo.getEmail());
                existing.setCustomerPhone(customerInfo.getPhone());
            }
            
            return ResponseEntity.ok(customerCareRepository.save(existing));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("CustomerCare with ID " + id + " not found.");
        }
    }

    // Alias cho updateCustomerCare() để tương thích với frontend
    @PutMapping("/tickets/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable String id, @RequestBody CustomerCare customerCare) {
        return updateCustomerCare(id, customerCare);
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

    // Alias cho deleteCustomerCare() để tương thích với frontend
    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable String id) {
        return deleteCustomerCare(id);
    }
    
    // Phương thức phụ trợ để đồng bộ hóa các trường
    private void syncFields(CustomerCare customerCare) {
        // Đảm bảo issue và description được đồng bộ
        if (customerCare.getIssue() == null && customerCare.getDescription() != null) {
            customerCare.setIssue(customerCare.getDescription());
        } else if (customerCare.getDescription() == null && customerCare.getIssue() != null) {
            customerCare.setDescription(customerCare.getIssue());
        }
    }
    
    // Phương thức phụ trợ để thêm thông tin khách hàng vào ticket
    private void enrichTicketWithCustomerInfo(CustomerCare ticket) {
        if (ticket != null && ticket.getCustomerId() != null) {
            Optional<CustomerInfo> customerInfoOpt = customerInfoRepository.findById(ticket.getCustomerId());
            if (customerInfoOpt.isPresent()) {
                CustomerInfo customerInfo = customerInfoOpt.get();
                ticket.setCustomerName(customerInfo.getName());
                ticket.setCustomerEmail(customerInfo.getEmail());
                ticket.setCustomerPhone(customerInfo.getPhone());
            }
        }
    }
    
    // Phương thức phụ trợ để thêm thông tin khách hàng vào danh sách ticket
    private void enrichTicketsWithCustomerInfo(List<CustomerCare> tickets) {
        if (tickets != null && !tickets.isEmpty()) {
            tickets.forEach(this::enrichTicketWithCustomerInfo);
        }
    }

    // Endpoint cho frontend để tìm kiếm khách hàng
    @GetMapping("/customers/search")
    public ResponseEntity<?> searchCustomers(@RequestParam String query) {
        if (query == null || query.trim().isEmpty() || query.length() < 2) {
            return ResponseEntity.badRequest().body("Chuỗi tìm kiếm phải có ít nhất 2 ký tự");
        }
        
        List<CustomerInfo> customers = customerInfoRepository.findByNameContainingIgnoreCase(query);
        if (customers.isEmpty()) {
            customers = customerInfoRepository.findAll().stream()
                .filter(c -> (c.getEmail() != null && c.getEmail().contains(query)) ||
                            (c.getPhone() != null && c.getPhone().contains(query)))
                .collect(Collectors.toList());
        }
        
        return ResponseEntity.ok(customers);
    }

    // Endpoint để lấy tất cả khách hàng cho combobox
    @GetMapping("/customers/all")
    public ResponseEntity<?> getAllCustomers() {
        List<CustomerInfo> customers = customerInfoRepository.findAll();
        
        // Chuyển thành định dạng đơn giản hơn cho frontend
        List<Map<String, Object>> simplifiedCustomers = customers.stream()
            .map(customer -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", customer.getId());
                map.put("name", customer.getName());
                map.put("email", customer.getEmail());
                map.put("phone", customer.getPhone());
                return map;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(simplifiedCustomers);
    }

    // CHỨC NĂNG CHUYỂN TIẾP DỊCH VỤ
    
    // Lấy tất cả bản ghi chuyển tiếp
    @GetMapping("/forwards")
    public ResponseEntity<?> getAllForwards() {
        List<TicketForward> forwards = ticketForwardRepository.findAll();
        enrichForwardsWithTicketInfo(forwards);
        return ResponseEntity.ok(forwards);
    }
    
    // Tạo mới bản ghi chuyển tiếp
    @PostMapping("/forwards")
    public ResponseEntity<?> createForward(@RequestBody TicketForward forward) {
        // Kiểm tra ticket tồn tại
        Optional<CustomerCare> ticketOpt = customerCareRepository.findById(forward.getTicketId());
        if (!ticketOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Yêu cầu hỗ trợ với ID " + forward.getTicketId() + " không tồn tại.");
        }
        
        CustomerCare ticket = ticketOpt.get();
        
        // Thiết lập thông tin mặc định
        forward.setSourceDepartment("CUSTOMER_CARE");
        forward.setStatus("PENDING");
        forward.setForwardDate(LocalDateTime.now());
        
        // Thiết lập thông tin ticket để hiển thị
        String ticketInfo = "#" + ticket.getId() + " - " + 
                (ticket.getSubject() != null ? ticket.getSubject() : ticket.getIssue());
        if (ticket.getCustomerName() != null) {
            ticketInfo += " (" + ticket.getCustomerName() + ")";
        }
        forward.setTicketInfo(ticketInfo);
        
        // Cập nhật trạng thái ticket thành đang xử lý
        ticket.setStatus("IN_PROGRESS");
        ticket.setUpdatedAt(LocalDateTime.now());
        customerCareRepository.save(ticket);
        
        // Lưu bản ghi chuyển tiếp
        TicketForward saved = ticketForwardRepository.save(forward);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    // Lấy chi tiết một bản ghi chuyển tiếp
    @GetMapping("/forwards/{id}")
    public ResponseEntity<?> getForwardById(@PathVariable String id) {
        Optional<TicketForward> forwardOpt = ticketForwardRepository.findById(id);
        if (forwardOpt.isPresent()) {
            TicketForward forward = forwardOpt.get();
            enrichForwardWithTicketInfo(forward);
            return ResponseEntity.ok(forward);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Bản ghi chuyển tiếp với ID " + id + " không tồn tại.");
        }
    }
    
    // Cập nhật trạng thái bản ghi chuyển tiếp
    @PutMapping("/forwards/{id}/status")
    public ResponseEntity<?> updateForwardStatus(
            @PathVariable String id, 
            @RequestParam String status) {
        
        Optional<TicketForward> forwardOpt = ticketForwardRepository.findById(id);
        if (forwardOpt.isPresent()) {
            TicketForward forward = forwardOpt.get();
            
            // Kiểm tra trạng thái hợp lệ
            if (!status.equals("PENDING") && !status.equals("ACCEPTED") && 
                !status.equals("COMPLETED") && !status.equals("REJECTED")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Trạng thái không hợp lệ. Các trạng thái hợp lệ: PENDING, ACCEPTED, COMPLETED, REJECTED");
            }
            
            forward.setStatus(status);
            
            // Cập nhật trạng thái ticket nếu trạng thái chuyển tiếp là COMPLETED
            if (status.equals("COMPLETED")) {
                Optional<CustomerCare> ticketOpt = customerCareRepository.findById(forward.getTicketId());
                if (ticketOpt.isPresent()) {
                    CustomerCare ticket = ticketOpt.get();
                    ticket.setStatus("RESOLVED");
                    ticket.setUpdatedAt(LocalDateTime.now());
                    customerCareRepository.save(ticket);
                }
            }
            
            return ResponseEntity.ok(ticketForwardRepository.save(forward));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Bản ghi chuyển tiếp với ID " + id + " không tồn tại.");
        }
    }
    
    // Tìm tất cả bản ghi chuyển tiếp của một yêu cầu
    @GetMapping("/tickets/{ticketId}/forwards")
    public ResponseEntity<?> getForwardsByTicketId(@PathVariable String ticketId) {
        List<TicketForward> forwards = ticketForwardRepository.findByTicketId(ticketId);
        enrichForwardsWithTicketInfo(forwards);
        return ResponseEntity.ok(forwards);
    }
    
    // CHỨC NĂNG THỐNG KÊ
    
    // Lấy thống kê tổng quan
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        List<CustomerCare> allTickets = customerCareRepository.findAll();
        
        // Tính toán thống kê
        Map<String, Object> statistics = new HashMap<>();
        
        // Tổng số yêu cầu
        statistics.put("totalTickets", allTickets.size());
        
        // Phân loại theo trạng thái
        long newTickets = allTickets.stream().filter(t -> "NEW".equals(t.getStatus())).count();
        long inProgressTickets = allTickets.stream().filter(t -> "IN_PROGRESS".equals(t.getStatus())).count();
        long resolvedTickets = allTickets.stream().filter(t -> "RESOLVED".equals(t.getStatus())).count();
        long closedTickets = allTickets.stream().filter(t -> "CLOSED".equals(t.getStatus())).count();
        
        statistics.put("newTickets", newTickets);
        statistics.put("inProgressTickets", inProgressTickets);
        statistics.put("resolvedTickets", resolvedTickets);
        statistics.put("closedTickets", closedTickets);
        
        // Phân loại theo mức độ ưu tiên
        long highPriorityTickets = allTickets.stream().filter(t -> "HIGH".equals(t.getPriority())).count();
        long mediumPriorityTickets = allTickets.stream().filter(t -> "MEDIUM".equals(t.getPriority())).count();
        long lowPriorityTickets = allTickets.stream().filter(t -> "LOW".equals(t.getPriority())).count();
        
        statistics.put("highPriorityTickets", highPriorityTickets);
        statistics.put("mediumPriorityTickets", mediumPriorityTickets);
        statistics.put("lowPriorityTickets", lowPriorityTickets);
        
        return ResponseEntity.ok(statistics);
    }
    
    // Lấy phân tích theo khách hàng
    @GetMapping("/statistics/by-customer")
    public ResponseEntity<?> getStatisticsByCustomer() {
        List<CustomerCare> allTickets = customerCareRepository.findAll();
        
        // Nhóm yêu cầu theo khách hàng
        Map<String, List<CustomerCare>> ticketsByCustomer = allTickets.stream()
                .collect(Collectors.groupingBy(CustomerCare::getCustomerId));
        
        // Tạo thống kê cho từng khách hàng
        List<Map<String, Object>> customerStats = ticketsByCustomer.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> stats = new HashMap<>();
                    String customerId = entry.getKey();
                    List<CustomerCare> customerTickets = entry.getValue();
                    
                    // Lấy thông tin khách hàng
                    Optional<CustomerInfo> customerInfoOpt = customerInfoRepository.findById(customerId);
                    if (customerInfoOpt.isPresent()) {
                        CustomerInfo customerInfo = customerInfoOpt.get();
                        stats.put("customerId", customerId);
                        stats.put("customerName", customerInfo.getName());
                        stats.put("customerEmail", customerInfo.getEmail());
                    } else {
                        stats.put("customerId", customerId);
                        stats.put("customerName", "Unknown");
                    }
                    
                    // Thống kê
                    stats.put("totalTickets", customerTickets.size());
                    stats.put("openTickets", customerTickets.stream()
                            .filter(t -> "NEW".equals(t.getStatus()) || "IN_PROGRESS".equals(t.getStatus()))
                            .count());
                    stats.put("resolvedTickets", customerTickets.stream()
                            .filter(t -> "RESOLVED".equals(t.getStatus()) || "CLOSED".equals(t.getStatus()))
                            .count());
                    
                    return stats;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(customerStats);
    }
    
    // Phương thức phụ trợ để thêm thông tin ticket vào bản ghi chuyển tiếp
    private void enrichForwardWithTicketInfo(TicketForward forward) {
        if (forward != null && forward.getTicketId() != null) {
            Optional<CustomerCare> ticketOpt = customerCareRepository.findById(forward.getTicketId());
            if (ticketOpt.isPresent()) {
                CustomerCare ticket = ticketOpt.get();
                String ticketInfo = "#" + ticket.getId() + " - " + 
                        (ticket.getSubject() != null ? ticket.getSubject() : ticket.getIssue());
                if (ticket.getCustomerName() != null) {
                    ticketInfo += " (" + ticket.getCustomerName() + ")";
                }
                forward.setTicketInfo(ticketInfo);
            }
        }
    }
    
    // Phương thức phụ trợ để thêm thông tin ticket vào danh sách bản ghi chuyển tiếp
    private void enrichForwardsWithTicketInfo(List<TicketForward> forwards) {
        if (forwards != null && !forwards.isEmpty()) {
            forwards.forEach(this::enrichForwardWithTicketInfo);
        }
    }
}
