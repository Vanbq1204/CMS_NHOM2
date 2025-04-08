package com.example.cms.controller;

import com.example.cms.model.CustomerCare;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/customer-care")
public class CustomerCareController {
    private final Map<String, CustomerCare> tickets = new HashMap<>();

    @PostMapping("/tickets")
    public String createTicket(@RequestBody CustomerCare ticket) {
        String id = UUID.randomUUID().toString();
        tickets.put(id, ticket);
        return id;
    }

    @PutMapping("/tickets/{id}")
    public boolean updateTicket(@PathVariable String id, @RequestBody CustomerCare update) {
        if (tickets.containsKey(id)) {
            tickets.put(id, update);
            return true;
        }
        return false;
    }

    @GetMapping("/tickets/{id}")
    public CustomerCare getTicket(@PathVariable String id) {
        return tickets.get(id);
    }

    @GetMapping("/tickets")
    public Collection<CustomerCare> getAllTickets() {
        return tickets.values();
    }
}
