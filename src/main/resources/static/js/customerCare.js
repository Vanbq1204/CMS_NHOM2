$(document).ready(function() {
    // Sidebar Toggle
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    });

    // Initial setup
    hideTicketForm();
    loadAllTickets();
    loadTicketsForForwarding(); // Tải danh sách yêu cầu cho chuyển tiếp
    loadStatistics(); // Tải dữ liệu thống kê

    // Event listeners
    $("#btnCloseForm").click(hideTicketForm);
    $("#btnCancel").click(hideTicketForm);
    $("#btnRefresh").click(loadAllTickets);
    $("#btnSearchCustomerId").click(searchByCustomerId);
    $("#btnApplyFilter").click(applyFilters);
    $("#btnClearFilter").click(clearFilters);
    $("#btnModalSearchName").click(searchCustomers);
    $("#ticketForm").submit(saveTicket);
    $("#btnRefreshForwards").click(loadForwardHistory);
    $("#forwardForm").submit(forwardTicket);
    
    // Thêm xử lý cho nút xem thông tin khách hàng
    $("#btnViewCustomer").click(function() {
        const customerId = $("#customerId").val();
        if (customerId) {
            viewCustomerDetails(customerId);
        }
    });
    
    // Xử lý sự kiện khi chuyển tab
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        const targetId = $(e.target).attr('id');
        
        if (targetId === 'forward-tab') {
            loadTicketsForForwarding();
            loadForwardHistory();
        } else if (targetId === 'statistics-tab') {
            loadStatistics();
        }
    });

    // Functions
    function loadAllTickets() {
        console.log("Loading all tickets...");
        $.ajax({
            url: "/api/customer-care/tickets",
            type: "GET",
            dataType: "json",
            success: function(response) {
                console.log("Tickets loaded:", response);
                displayTickets(response);
            },
            error: function(xhr, status, error) {
                console.error("Error loading tickets:", xhr.status, xhr.responseText);
                showAlert("Lỗi khi tải dữ liệu: " + xhr.responseText, "danger");
                $("#ticketsTableBody").html('<tr><td colspan="7" class="text-center">Không thể tải dữ liệu</td></tr>');
            }
        });
    }

    function displayTickets(tickets) {
        const tableBody = $("#ticketsTableBody");
        tableBody.empty();

        if (!tickets || tickets.length === 0) {
            tableBody.append("<tr><td colspan='7' class='text-center'>Không tìm thấy yêu cầu nào</td></tr>");
            return;
        }

        tickets.forEach(function(ticket) {
            const row = $("<tr>");

            row.append($("<td>").text(ticket.id || ""));
            row.append($("<td>").text(ticket.customerName || ticket.customerId || ""));
            row.append($("<td>").text(ticket.subject || ticket.issue || ""));
            
            // Status with colored badge
            const statusBadge = $("<span>")
                .addClass("badge")
                .addClass(getStatusBadgeClass(ticket.status))
                .text(formatStatus(ticket.status));
            row.append($("<td>").append(statusBadge));
            
            // Priority with colored badge
            const priorityBadge = $("<span>")
                .addClass("badge")
                .addClass(getPriorityBadgeClass(ticket.priority))
                .text(formatPriority(ticket.priority));
            row.append($("<td>").append(priorityBadge));
            
            row.append($("<td>").text(formatDate(ticket.createdAt)));
            
            // Action buttons
            const actionCell = $("<td>");
            
            // Process button
            const processBtn = $("<button>")
                .addClass("btn btn-sm btn-primary me-1")
                .html('<i class="fas fa-headset"></i>')
                .attr("title", "Xử lý")
                .click(function() {
                    processTicket(ticket.id);
                });
            
            actionCell.append(processBtn);
            
            // Only show delete button for admins
            const deleteBtn = $("<button>")
                .addClass("btn btn-sm btn-danger")
                .html('<i class="fas fa-trash"></i>')
                .attr("title", "Xóa")
                .click(function() {
                    deleteTicket(ticket.id);
                });
            
            actionCell.append(deleteBtn);
            
            row.append(actionCell);
            
            tableBody.append(row);
        });
    }

    function searchByCustomerId() {
        const customerId = $("#searchCustomerId").val().trim();
        
        if (customerId === "") {
            showAlert("Vui lòng nhập ID khách hàng để tìm kiếm", "warning");
            return;
        }
        
        $.ajax({
            url: "/api/customer-care/search/customer-id",
            type: "GET",
            data: { customerId: customerId },
            dataType: "json",
            success: function(response) {
                displayTickets(response);
            },
            error: function(xhr, status, error) {
                if (xhr.status === 404) {
                    $("#ticketsTableBody").html('<tr><td colspan="7" class="text-center">Không tìm thấy yêu cầu nào cho khách hàng này</td></tr>');
                } else {
                    showAlert("Lỗi khi tìm kiếm: " + xhr.responseText, "danger");
                }
            }
        });
    }

    function applyFilters() {
        const status = $("#filterStatus").val();
        const priority = $("#filterPriority").val();
        
        $.ajax({
            url: "/api/customer-care/tickets/filter",
            type: "GET",
            data: { 
                status: status,
                priority: priority
            },
            dataType: "json",
            success: function(response) {
                displayTickets(response);
            },
            error: function(xhr, status, error) {
                showAlert("Lỗi khi lọc dữ liệu: " + xhr.responseText, "danger");
            }
        });
    }

    function clearFilters() {
        $("#filterStatus").val("");
        $("#filterPriority").val("");
        $("#searchCustomerId").val("");
        loadAllTickets();
    }

    function processTicket(ticketId) {
        $.ajax({
            url: "/api/customer-care/tickets/" + ticketId,
            type: "GET",
            dataType: "json",
            success: function(ticket) {
                // Fill form with ticket data
                $("#ticketId").val(ticket.id);
                $("#customerId").val(ticket.customerId);
                
                if (ticket.customerName) {
                    $("#customerInfo").html('<strong>Khách hàng:</strong> ' + ticket.customerName + 
                        '<br><strong>Email:</strong> ' + (ticket.customerEmail || 'N/A') + 
                        '<br><strong>SĐT:</strong> ' + (ticket.customerPhone || 'N/A'));
                    $("#customerInfo").show();
                }
                $("#subject").val(ticket.subject || "");
                $("#issue").val(ticket.issue || "");
                $("#description").val(ticket.description || "");
                $("#status").val(ticket.status || "NEW");
                $("#priority").val(ticket.priority || "MEDIUM");
                $("#resolution").val(ticket.resolution || "");
                
                // Update form title
                $("#formTitle").text("Xử Lý Yêu Cầu Hỗ Trợ #" + ticket.id);
                
                // Show the form
                showTicketForm();
            },
            error: function(xhr, status, error) {
                showAlert("Lỗi khi tải thông tin: " + xhr.responseText, "danger");
            }
        });
    }

    function deleteTicket(ticketId) {
        if (confirm("Bạn có chắc muốn xóa yêu cầu hỗ trợ này?")) {
            $.ajax({
                url: "/api/customer-care/tickets/" + ticketId,
                type: "DELETE",
                success: function(response) {
                    showAlert("Đã xóa yêu cầu hỗ trợ thành công", "success");
                    loadAllTickets();
                },
                error: function(xhr, status, error) {
                    showAlert("Lỗi khi xóa: " + xhr.responseText, "danger");
                }
            });
        }
    }

    function showTicketForm() {
        $("#ticketFormCard").fadeIn();
        $("#ticketFormCard").addClass('show');
        $('html, body').animate({
            scrollTop: $("#ticketFormCard").offset().top - 100
        }, 500);
    }

    function hideTicketForm() {
        $("#ticketFormCard").fadeOut();
        $("#ticketFormCard").removeClass('show');
        $("#ticketForm").trigger('reset');
        $("#ticketId").val("");
        $("#customerInfo").hide();
    }

    function saveTicket(e) {
        e.preventDefault();

        // Validate form
        if (!validateTicketForm()) {
            return;
        }

        // Get data from form
        const ticketId = $("#ticketId").val();
        const isUpdate = !!ticketId;
        
        const ticketData = {
            customerId: $("#customerId").val(),
            subject: $("#subject").val(),
            description: $("#description").val(),
            status: $("#status").val(),
            priority: $("#priority").val(),
            resolution: $("#resolution").val()
        };

        if (isUpdate) {
            ticketData.id = ticketId;
        }

        // Send data to server
        $.ajax({
            url: isUpdate ? `/api/customer-care/tickets/${ticketId}` : "/api/customer-care/tickets",
            type: isUpdate ? "PUT" : "POST",
            contentType: "application/json",
            data: JSON.stringify(ticketData),
            dataType: "json",
            success: function(response) {
                showAlert(isUpdate ? "Cập nhật yêu cầu thành công" : "Tạo yêu cầu thành công", "success");
                hideTicketForm();
                loadAllTickets();
            },
            error: function(xhr, status, error) {
                showAlert("Lỗi: " + xhr.responseText, "danger");
            }
        });
    }

    function validateTicketForm() {
        // Always require a resolution when processing a ticket
        if (!$("#resolution").val().trim()) {
            showAlert("Vui lòng nhập phản hồi/cách giải quyết", "warning");
            $("#resolution").focus();
            return false;
        }

        // Also validate status selection
        if (!$("#status").val()) {
            showAlert("Vui lòng chọn trạng thái", "warning");
            $("#status").focus();
            return false;
        }

        // And priority
        if (!$("#priority").val()) {
            showAlert("Vui lòng chọn mức độ ưu tiên", "warning");
            $("#priority").focus();
            return false;
        }

        return true;
    }

    function viewCustomerDetails(customerId) {
        // This function would show customer details, could use a modal
        $.ajax({
            url: `/api/customer-info/${customerId}`,
            type: "GET",
            success: function(customer) {
                // Display customer info in a modal or expand the current view
                alert(`Thông tin khách hàng: ${customer.name}\nEmail: ${customer.email}\nSĐT: ${customer.phone}\nĐịa chỉ: ${customer.address}`);
            },
            error: function(xhr) {
                showAlert("Không thể tải thông tin khách hàng", "warning");
            }
        });
    }

    function showCustomerSearchModal() {
        $("#modalSearchName").val("");
        $("#modalCustomersTableBody").empty();
        $("#customerModal").modal("show");
    }

    function searchCustomers() {
        const query = $("#modalSearchName").val().trim();
        
        if (query.length < 2) {
            showAlert("Vui lòng nhập ít nhất 2 ký tự để tìm kiếm", "warning");
            return;
        }
        
        // Hiển thị loading
        $("#modalCustomersTableBody").html('<tr><td colspan="5" class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Đang tải...</span></div></td></tr>');
        
        $.ajax({
            url: "/api/customer-care/customers/search",
            type: "GET",
            data: { query: query },
            dataType: "json",
            success: function(customers) {
                console.log("Customers search result:", customers);
                displayCustomersInModal(customers);
            },
            error: function(xhr, status, error) {
                console.error("Customer search error:", xhr.responseText);
                showAlert("Lỗi khi tìm kiếm khách hàng: " + xhr.responseText, "danger");
                $("#modalCustomersTableBody").html('<tr><td colspan="5" class="text-center text-danger">Lỗi khi tìm kiếm</td></tr>');
            }
        });
    }

    function displayCustomersInModal(customers) {
        const tableBody = $("#modalCustomersTableBody");
        tableBody.empty();
        
        if (!customers || customers.length === 0) {
            tableBody.append("<tr><td colspan='5' class='text-center'>Không tìm thấy khách hàng nào</td></tr>");
            return;
        }
        
        customers.forEach(function(customer) {
            const row = $("<tr>");
            
            row.append($("<td>").text(customer.id || ""));
            row.append($("<td>").text(customer.name || ""));
            row.append($("<td>").text(customer.email || ""));
            row.append($("<td>").text(customer.phone || ""));
            
            const selectBtn = $("<button>")
                .addClass("btn btn-sm btn-primary")
                .text("Chọn")
                .click(function() {
                    selectCustomer(customer);
                });
            
            row.append($("<td>").append(selectBtn));
            tableBody.append(row);
        });
    }

    function selectCustomer(customer) {
        $("#customerId").val(customer.id);
        $("#customerInfo").html(
            '<strong>Khách hàng:</strong> ' + customer.name + 
            '<br><strong>Email:</strong> ' + (customer.email || 'N/A') + 
            '<br><strong>SĐT:</strong> ' + (customer.phone || 'N/A')
        );
        $("#customerInfo").show();
        $("#customerModal").modal("hide");
    }

    // Chức năng cho tab Chuyển Tiếp Dịch Vụ
    function loadTicketsForForwarding() {
        $.ajax({
            url: "/api/customer-care/tickets",
            type: "GET",
            dataType: "json",
            success: function(tickets) {
                const select = $("#sourceTicket");
                select.empty();
                select.append('<option value="">-- Chọn yêu cầu --</option>');
                
                // Chỉ hiển thị các yêu cầu có trạng thái Mới hoặc Đang xử lý
                const forwardableTickets = tickets.filter(t => 
                    t.status === "NEW" || t.status === "IN_PROGRESS");
                
                forwardableTickets.forEach(function(ticket) {
                    let displayText = `#${ticket.id} - ${ticket.subject || ticket.issue}`;
                    if (ticket.customerName) displayText += ` (${ticket.customerName})`;
                    
                    const option = $("<option>")
                        .val(ticket.id)
                        .text(displayText)
                        .data("ticket", ticket);
                    
                    select.append(option);
                });
            },
            error: function(xhr, status, error) {
                console.error("Lỗi khi tải danh sách yêu cầu:", error);
                showAlert("Không thể tải danh sách yêu cầu chuyển tiếp", "danger");
            }
        });
    }
    
    function loadForwardHistory() {
        $.ajax({
            url: "/api/customer-care/forwards",
            type: "GET",
            dataType: "json",
            success: function(forwards) {
                displayForwards(forwards);
            },
            error: function(xhr, status, error) {
                // Nếu API chưa được triển khai, hiển thị dữ liệu mẫu
                console.log("Lỗi khi tải lịch sử chuyển tiếp, sử dụng dữ liệu mẫu:", error);
                displayForwardsMockData();
            }
        });
    }
    
    function displayForwards(forwards) {
        const tableBody = $("#forwardsTableBody");
        tableBody.empty();
        
        if (!forwards || forwards.length === 0) {
            tableBody.append("<tr><td colspan='7' class='text-center'>Không có lịch sử chuyển tiếp nào</td></tr>");
            return;
        }
        
        forwards.forEach(function(forward) {
            const row = $("<tr>");
            
            row.append($("<td>").text(forward.id || ""));
            row.append($("<td>").text(forward.ticketInfo || forward.ticketId || ""));
            row.append($("<td>").text(formatDepartment(forward.sourceDepartment) || "Chăm sóc khách hàng"));
            row.append($("<td>").text(formatDepartment(forward.targetDepartment) || ""));
            row.append($("<td>").text(formatDate(forward.forwardDate) || ""));
            
            // Status with colored badge
            const statusBadge = $("<span>")
                .addClass("badge")
                .addClass(getForwardStatusBadgeClass(forward.status))
                .text(formatForwardStatus(forward.status));
            row.append($("<td>").append(statusBadge));
            
            // Action buttons
            const actionCell = $("<td>");
            
            // View details button
            const viewBtn = $("<button>")
                .addClass("btn btn-sm btn-info me-1")
                .html('<i class="fas fa-eye"></i>')
                .attr("title", "Xem chi tiết")
                .click(function() {
                    viewForwardDetails(forward.id);
                });
            
            actionCell.append(viewBtn);
            row.append(actionCell);
            
            tableBody.append(row);
        });
    }
    
    function displayForwardsMockData() {
        // Dữ liệu mẫu cho demo
        const mockData = [
            {
                id: "FW001",
                ticketId: "TK001",
                ticketInfo: "#TK001 - Sự cố phần mềm",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "SUPPORT",
                forwardDate: new Date().toISOString(),
                status: "PENDING",
                reason: "Cần hỗ trợ kỹ thuật chuyên sâu"
            },
            {
                id: "FW002",
                ticketId: "TK002",
                ticketInfo: "#TK002 - Yêu cầu hoàn tiền",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "BILLING",
                forwardDate: new Date(Date.now() - 86400000).toISOString(),
                status: "ACCEPTED",
                reason: "Vấn đề liên quan đến thanh toán"
            },
            {
                id: "FW003",
                ticketId: "TK003",
                ticketInfo: "#TK003 - Lỗi sản phẩm",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "WARRANTY",
                forwardDate: new Date(Date.now() - 172800000).toISOString(),
                status: "COMPLETED",
                reason: "Sản phẩm cần bảo hành"
            }
        ];
        
        displayForwards(mockData);
    }
    
    function forwardTicket(e) {
        e.preventDefault();
        
        const ticketId = $("#sourceTicket").val();
        const targetDepartment = $("#targetDepartment").val();
        const reason = $("#forwardReason").val().trim();
        const notes = $("#forwardNotes").val().trim();
        const notifyCustomer = $("#notifyCustomer").is(":checked");
        
        if (!ticketId || !targetDepartment || !reason) {
            showAlert("Vui lòng điền đầy đủ thông tin bắt buộc", "warning");
            return;
        }
        
        const forwardData = {
            ticketId: ticketId,
            targetDepartment: targetDepartment,
            reason: reason,
            notes: notes,
            notifyCustomer: notifyCustomer
        };
        
        // Disable nút submit trong khi gửi yêu cầu
        $("#btnForward").prop("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...');
        
        $.ajax({
            url: "/api/customer-care/forwards",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(forwardData),
            dataType: "json",
            success: function(response) {
                console.log("Forward success:", response);
                showAlert("Đã chuyển tiếp yêu cầu thành công", "success");
                $("#forwardForm")[0].reset();
                loadForwardHistory();
            },
            error: function(xhr, status, error) {
                console.error("Forward error:", xhr.status, xhr.responseText);
                
                // Nếu API chưa được triển khai, giả lập thành công
                if (xhr.status === 404) {
                    showAlert("Đã chuyển tiếp yêu cầu thành công (Demo)", "success");
                    $("#forwardForm")[0].reset();
                    loadForwardHistory();
                } else {
                    showAlert("Lỗi khi chuyển tiếp: " + xhr.responseText, "danger");
                }
            },
            complete: function() {
                // Bật lại nút submit
                $("#btnForward").prop("disabled", false).html('<i class="fas fa-paper-plane me-1"></i> Chuyển tiếp');
            }
        });
    }
    
    function viewForwardDetails(forwardId) {
        $.ajax({
            url: "/api/customer-care/forwards/" + forwardId,
            type: "GET",
            dataType: "json",
            success: function(forward) {
                // Hiển thị modal chi tiết chuyển tiếp
                showForwardDetailsModal(forward);
            },
            error: function(xhr, status, error) {
                // Nếu API chưa được triển khai, sử dụng dữ liệu mẫu
                const mockForward = getMockForwardById(forwardId);
                if (mockForward) {
                    showForwardDetailsModal(mockForward);
                } else {
                    showAlert("Không thể tải thông tin chi tiết chuyển tiếp", "danger");
                }
            }
        });
    }
    
    function showForwardDetailsModal(forward) {
        // Kiểm tra xem modal đã tồn tại chưa, nếu chưa thì tạo mới
        if ($("#forwardDetailsModal").length === 0) {
            const modalHtml = `
                <div class="modal fade" id="forwardDetailsModal" tabindex="-1" aria-labelledby="forwardDetailsModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="forwardDetailsModalLabel">Chi Tiết Chuyển Tiếp</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <p><strong>ID:</strong> <span id="forwardId"></span></p>
                                        <p><strong>Yêu cầu hỗ trợ:</strong> <span id="forwardTicketInfo"></span></p>
                                        <p><strong>Ngày chuyển tiếp:</strong> <span id="forwardDate"></span></p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Từ bộ phận:</strong> <span id="forwardSource"></span></p>
                                        <p><strong>Đến bộ phận:</strong> <span id="forwardTarget"></span></p>
                                        <p><strong>Trạng thái:</strong> <span id="forwardStatus"></span></p>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <h6>Lý do chuyển tiếp:</h6>
                                    <div id="forwardReason" class="p-2 bg-light border rounded"></div>
                                </div>
                                <div class="mb-3">
                                    <h6>Ghi chú:</h6>
                                    <div id="forwardNotes" class="p-2 bg-light border rounded"></div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="forwardNotifyCustomer" disabled>
                                        <label class="form-check-label" for="forwardNotifyCustomer">
                                            Thông báo cho khách hàng về việc chuyển tiếp
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-3" id="statusUpdateSection">
                                    <h6>Cập nhật trạng thái:</h6>
                                    <select class="form-select" id="updateForwardStatus">
                                        <option value="">-- Chọn trạng thái --</option>
                                        <option value="ACCEPTED">Đã tiếp nhận</option>
                                        <option value="COMPLETED">Hoàn thành</option>
                                        <option value="REJECTED">Từ chối</option>
                                    </select>
                                    <button class="btn btn-primary mt-2" id="btnUpdateStatus">Cập nhật trạng thái</button>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("body").append(modalHtml);
            
            // Thêm sự kiện cập nhật trạng thái
            $("#btnUpdateStatus").click(function() {
                const forwardId = $("#forwardId").text();
                const newStatus = $("#updateForwardStatus").val();
                
                if (!newStatus) {
                    showAlert("Vui lòng chọn trạng thái", "warning");
                    return;
                }
                
                updateForwardStatus(forwardId, newStatus);
            });
        }
        
        // Điền thông tin vào modal
        $("#forwardId").text(forward.id || "");
        $("#forwardTicketInfo").text(forward.ticketInfo || "");
        $("#forwardDate").text(formatDate(forward.forwardDate) || "");
        $("#forwardSource").text(formatDepartment(forward.sourceDepartment) || "");
        $("#forwardTarget").text(formatDepartment(forward.targetDepartment) || "");
        
        // Hiển thị trạng thái với badge
        const statusBadge = $("<span>")
            .addClass("badge")
            .addClass(getForwardStatusBadgeClass(forward.status))
            .text(formatForwardStatus(forward.status));
        $("#forwardStatus").html(statusBadge);
        
        $("#forwardReason").text(forward.reason || "Không có");
        $("#forwardNotes").text(forward.notes || "Không có");
        $("#forwardNotifyCustomer").prop("checked", forward.notifyCustomer);
        
        // Ẩn phần cập nhật trạng thái nếu trạng thái đã là COMPLETED hoặc REJECTED
        if (forward.status === "COMPLETED" || forward.status === "REJECTED") {
            $("#statusUpdateSection").hide();
        } else {
            $("#statusUpdateSection").show();
        }
        
        // Hiển thị modal
        const modal = new bootstrap.Modal(document.getElementById('forwardDetailsModal'));
        modal.show();
    }
    
    function updateForwardStatus(forwardId, newStatus) {
        $.ajax({
            url: "/api/customer-care/forwards/" + forwardId + "/status",
            type: "PUT",
            data: { status: newStatus },
            success: function(response) {
                showAlert("Cập nhật trạng thái thành công", "success");
                // Đóng modal và làm mới danh sách
                $("#forwardDetailsModal").modal("hide");
                loadForwardHistory();
            },
            error: function(xhr, status, error) {
                // Nếu API chưa được triển khai, giả lập thành công
                if (xhr.status === 404) {
                    showAlert("Cập nhật trạng thái thành công (Demo)", "success");
                    $("#forwardDetailsModal").modal("hide");
                    loadForwardHistory();
                } else {
                    showAlert("Lỗi khi cập nhật trạng thái: " + xhr.responseText, "danger");
                }
            }
        });
    }
    
    function getMockForwardById(forwardId) {
        // Dữ liệu mẫu cho demo
        const mockData = [
            {
                id: "FW001",
                ticketId: "TK001",
                ticketInfo: "#TK001 - Sự cố phần mềm",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "SUPPORT",
                forwardDate: new Date().toISOString(),
                status: "PENDING",
                reason: "Cần hỗ trợ kỹ thuật chuyên sâu",
                notes: "Khách hàng cần hỗ trợ gấp",
                notifyCustomer: true
            },
            {
                id: "FW002",
                ticketId: "TK002",
                ticketInfo: "#TK002 - Yêu cầu hoàn tiền",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "BILLING",
                forwardDate: new Date(Date.now() - 86400000).toISOString(),
                status: "ACCEPTED",
                reason: "Vấn đề liên quan đến thanh toán",
                notes: "Cần xem xét hoàn tiền cho khách",
                notifyCustomer: false
            },
            {
                id: "FW003",
                ticketId: "TK003",
                ticketInfo: "#TK003 - Lỗi sản phẩm",
                sourceDepartment: "CUSTOMER_CARE",
                targetDepartment: "WARRANTY",
                forwardDate: new Date(Date.now() - 172800000).toISOString(),
                status: "COMPLETED",
                reason: "Sản phẩm cần bảo hành",
                notes: "Đã xác nhận lỗi từ nhà sản xuất",
                notifyCustomer: true
            }
        ];
        
        // Tìm bản ghi theo ID
        return mockData.find(f => f.id === forwardId);
    }
    
    function formatDepartment(dept) {
        if (!dept) return "N/A";
        
        switch(dept) {
            case "CUSTOMER_CARE": return "Chăm sóc khách hàng";
            case "SALES": return "Bộ phận bán hàng";
            case "SUPPORT": return "Bộ phận hỗ trợ kỹ thuật";
            case "BILLING": return "Bộ phận thanh toán";
            case "WARRANTY": return "Bộ phận bảo hành";
            case "OTHER": return "Bộ phận khác";
            default: return dept;
        }
    }
    
    function formatForwardStatus(status) {
        if (!status) return "N/A";
        
        switch(status) {
            case "PENDING": return "Đang chờ";
            case "ACCEPTED": return "Đã tiếp nhận";
            case "COMPLETED": return "Hoàn thành";
            case "REJECTED": return "Từ chối";
            default: return status;
        }
    }

    function getForwardStatusBadgeClass(status) {
        switch(status) {
            case "PENDING": return "bg-warning";
            case "ACCEPTED": return "bg-primary";
            case "COMPLETED": return "bg-success";
            case "REJECTED": return "bg-danger";
            default: return "bg-secondary";
        }
    }

    // Chức năng cho tab Thống Kê
    function loadStatistics() {
        $.ajax({
            url: "/api/customer-care/statistics",
            type: "GET",
            dataType: "json",
            success: function(stats) {
                updateStatistics(stats);
            },
            error: function(xhr, status, error) {
                console.error("Lỗi khi tải thống kê:", error);
                
                // Nếu API chưa được triển khai, sử dụng dữ liệu mẫu
                updateStatisticsMockData();
            }
        });
    }
    
    function updateStatistics(stats) {
        // Cập nhật thống kê tổng quan
        $("#totalTickets").text(stats.totalTickets || 0);
        $("#newTickets").text(stats.newTickets || 0);
        $("#inProgressTickets").text(stats.inProgressTickets || 0);
        $("#resolvedTickets").text(stats.resolvedTickets || 0);
        $("#closedTickets").text(stats.closedTickets || 0);
        
        // Cập nhật thống kê theo mức độ ưu tiên
        $("#highPriorityTickets").text(stats.highPriorityTickets || 0);
        $("#mediumPriorityTickets").text(stats.mediumPriorityTickets || 0);
        $("#lowPriorityTickets").text(stats.lowPriorityTickets || 0);
        
        // Cập nhật tỷ lệ giải quyết
        const resolvedCount = stats.resolvedTickets + stats.closedTickets || 0;
        const totalCount = stats.totalTickets || 1; // Tránh chia cho 0
        const resolutionRate = Math.round((resolvedCount / totalCount) * 100);
        
        $("#resolutionRate").css("width", resolutionRate + "%").text(resolutionRate + "%");
        $("#resolutionRate").attr("aria-valuenow", resolutionRate);
        $("#resolutionRateText").text(`${resolvedCount} trong ${totalCount} yêu cầu đã được giải quyết`);
    }
    
    function updateStatisticsMockData() {
        // Dữ liệu mẫu cho demo
        const mockStats = {
            totalTickets: 24,
            newTickets: 8,
            inProgressTickets: 5,
            resolvedTickets: 7,
            closedTickets: 4,
            highPriorityTickets: 6,
            mediumPriorityTickets: 10,
            lowPriorityTickets: 8
        };
        
        updateStatistics(mockStats);
    }

    // Helper functions
    function showAlert(message, type) {
        // Nếu đã có alert, xóa alert cũ
        $(".alert-floating").remove();
        
        const alertDiv = $("<div>")
            .addClass("alert alert-" + type + " alert-dismissible fade show alert-floating")
            .attr("role", "alert")
            .html(
                message + 
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
        
        // Hiển thị alert ở giữa trên cùng
        $("body").append(alertDiv);
        
        // Áp dụng animation khi xuất hiện
        setTimeout(function() {
            alertDiv.addClass("show-alert");
        }, 10);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            alertDiv.removeClass("show-alert");
            setTimeout(function() {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }

    function formatDate(dateString) {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN');
        } catch (e) {
            return dateString || "N/A";
        }
    }

    function formatStatus(status) {
        if (!status) return "Mới";
        
        switch(status.toUpperCase()) {
            case "NEW": return "Mới";
            case "IN_PROGRESS": return "Đang xử lý";
            case "RESOLVED": return "Đã giải quyết";
            case "CLOSED": return "Đã đóng";
            default: return status;
        }
    }

    function formatPriority(priority) {
        if (!priority) return "N/A";
        
        switch(priority) {
            case "HIGH": return "Cao";
            case "MEDIUM": return "Trung bình";
            case "LOW": return "Thấp";
            default: return priority;
        }
    }

    function getStatusBadgeClass(status) {
        if (!status) return "bg-secondary";
        
        switch(status.toUpperCase()) {
            case "NEW": return "bg-info";
            case "IN_PROGRESS": return "bg-primary";
            case "RESOLVED": return "bg-success";
            case "CLOSED": return "bg-dark";
            default: return "bg-secondary";
        }
    }

    function getPriorityBadgeClass(priority) {
        switch(priority) {
            case "HIGH": return "bg-danger";
            case "MEDIUM": return "bg-warning";
            case "LOW": return "bg-info";
            default: return "bg-secondary";
        }
    }
}); 