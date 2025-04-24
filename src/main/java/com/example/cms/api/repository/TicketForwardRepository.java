package com.example.cms.api.repository;

import com.example.cms.api.model.TicketForward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketForwardRepository extends MongoRepository<TicketForward, String> {
    // Tìm tất cả bản ghi chuyển tiếp theo ticketId
    List<TicketForward> findByTicketId(String ticketId);
    
    // Tìm tất cả bản ghi chuyển tiếp đến một bộ phận
    List<TicketForward> findByTargetDepartment(String targetDepartment);
    
    // Tìm tất cả bản ghi chuyển tiếp từ một bộ phận
    List<TicketForward> findBySourceDepartment(String sourceDepartment);
    
    // Tìm tất cả bản ghi chuyển tiếp theo trạng thái
    List<TicketForward> findByStatus(String status);
} 