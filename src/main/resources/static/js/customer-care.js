document.addEventListener('DOMContentLoaded', function() {
    // Xử lý tab
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa class active khỏi tất cả các nút và ẩn tất cả nội dung
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Thêm class active cho nút được nhấp
            this.classList.add('active');
            
            // Hiển thị nội dung tương ứng
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Xử lý nút tạo yêu cầu hỗ trợ mới
    const newTicketBtn = document.getElementById('new-ticket');
    if (newTicketBtn) {
        newTicketBtn.addEventListener('click', function() {
            // Ẩn nội dung hiển thị ban đầu
            document.getElementById('tickets-content').style.display = 'none';
            
            // Hiển thị form tạo yêu cầu hỗ trợ
            const formContainer = document.getElementById('support-request-form-container');
            formContainer.style.display = 'block';
            
            // Thiết lập giá trị mặc định cho trường hạn xử lý (7 ngày sau)
            const deadline = document.getElementById('deadline');
            if (deadline) {
                const date = new Date();
                date.setDate(date.getDate() + 7);
                deadline.value = date.toISOString().split('T')[0];
            }
        });
    }
    
    // Xử lý nút hủy bỏ yêu cầu hỗ trợ
    const cancelButton = document.getElementById('cancel-support-request');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // Ẩn form
            document.getElementById('support-request-form-container').style.display = 'none';
            
            // Hiển thị lại nội dung ban đầu
            document.getElementById('tickets-content').style.display = 'block';
        });
    }
    
    // Xử lý nút lưu yêu cầu hỗ trợ
    const saveButton = document.getElementById('save-support-request');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Kiểm tra form
            const title = document.getElementById('title').value;
            const customer = document.getElementById('customer').value;
            const requestType = document.getElementById('request-type').value;
            const description = document.getElementById('description').value;
            const priority = document.getElementById('priority').value;
            const deadline = document.getElementById('deadline').value;
            
            if (!title || !customer || !requestType || !description || !priority || !deadline) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            
            // Thông báo thành công
            alert('Đã tạo yêu cầu hỗ trợ mới thành công!');
            
            // Ẩn form
            document.getElementById('support-request-form-container').style.display = 'none';
            
            // Hiển thị lại nội dung ban đầu
            document.getElementById('tickets-content').style.display = 'block';
        });
    }
    
    // Xử lý nút tạo khiếu nại mới
    const newComplaintBtn = document.getElementById('new-complaint');
    if (newComplaintBtn) {
        newComplaintBtn.addEventListener('click', function() {
            // Ẩn nội dung hiển thị ban đầu
            document.getElementById('complaints-content').style.display = 'none';
            
            // Hiển thị form tạo khiếu nại
            const formContainer = document.getElementById('complaint-form-container');
            formContainer.style.display = 'block';
            
            // Thiết lập giá trị mặc định cho trường hạn xử lý (7 ngày sau)
            const deadline = document.getElementById('complaint-deadline');
            if (deadline) {
                const date = new Date();
                date.setDate(date.getDate() + 7);
                deadline.value = date.toISOString().split('T')[0];
            }
        });
    }
    
    // Xử lý nút hủy bỏ khiếu nại
    const cancelComplaintButton = document.getElementById('cancel-complaint');
    if (cancelComplaintButton) {
        cancelComplaintButton.addEventListener('click', function() {
            // Ẩn form
            document.getElementById('complaint-form-container').style.display = 'none';
            
            // Hiển thị lại nội dung ban đầu
            document.getElementById('complaints-content').style.display = 'block';
        });
    }
    
    // Xử lý nút lưu khiếu nại
    const saveComplaintButton = document.getElementById('save-complaint');
    if (saveComplaintButton) {
        saveComplaintButton.addEventListener('click', function() {
            // Kiểm tra form
            const title = document.getElementById('complaint-title').value;
            const customer = document.getElementById('complaint-customer').value;
            const complaintType = document.getElementById('complaint-type').value;
            const description = document.getElementById('complaint-description').value;
            const severity = document.getElementById('complaint-severity').value;
            const deadline = document.getElementById('complaint-deadline').value;
            
            if (!title || !customer || !complaintType || !description || !severity || !deadline) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            
            // Thông báo thành công
            alert('Đã tạo khiếu nại mới thành công!');
            
            // Ẩn form
            document.getElementById('complaint-form-container').style.display = 'none';
            
            // Hiển thị lại nội dung ban đầu
            document.getElementById('complaints-content').style.display = 'block';
        });
    }
    
    // Xử lý các nút hành động cho yêu cầu hỗ trợ
    const viewTicketButtons = document.querySelectorAll('.view-ticket');
    viewTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            alert(`Xem chi tiết yêu cầu hỗ trợ ${ticketId} của khách hàng ${customerName}`);
        });
    });
    
    const editTicketButtons = document.querySelectorAll('.edit-ticket');
    editTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            alert(`Chỉnh sửa yêu cầu hỗ trợ ${ticketId} của khách hàng ${customerName}`);
        });
    });
    
    const assignTicketButtons = document.querySelectorAll('.assign-ticket');
    assignTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            
            const staff = prompt('Nhập tên nhân viên phụ trách:');
            if (staff) {
                alert(`Đã phân công nhân viên ${staff} phụ trách yêu cầu hỗ trợ ${ticketId}`);
            }
        });
    });
    
    // Xử lý các nút hành động cho khiếu nại
    const viewComplaintButtons = document.querySelectorAll('.view-complaint');
    viewComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            alert(`Xem chi tiết khiếu nại ${complaintId} của khách hàng ${customerName}`);
        });
    });
    
    const editComplaintButtons = document.querySelectorAll('.edit-complaint');
    editComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            alert(`Chỉnh sửa khiếu nại ${complaintId} của khách hàng ${customerName}`);
        });
    });
    
    const resolveComplaintButtons = document.querySelectorAll('.resolve-complaint');
    resolveComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Đánh dấu khiếu nại ${complaintId} của khách hàng ${customerName} là đã giải quyết?`)) {
                alert(`Đã giải quyết khiếu nại ${complaintId}`);
            }
        });
    });
    
    // Xử lý lọc yêu cầu hỗ trợ
    const ticketFilters = document.querySelectorAll('#ticket-status-filter, #ticket-staff-filter, #ticket-type-filter');
    ticketFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterTickets();
        });
    });
    
    // Xử lý lọc khiếu nại
    const complaintFilters = document.querySelectorAll('#complaint-status-filter, #complaint-severity-filter, #complaint-type-filter');
    complaintFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterComplaints();
        });
    });
    
    // Xử lý tìm kiếm
    const searchButtons = document.querySelectorAll('.search-button');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const searchInput = this.previousElementSibling;
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                alert(`Đang tìm kiếm: ${searchTerm}`);
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm');
            }
        });
    });
    
    // Hàm lọc yêu cầu hỗ trợ
    function filterTickets() {
        const statusFilter = document.getElementById('ticket-status-filter').value;
        const staffFilter = document.getElementById('ticket-staff-filter').value;
        const typeFilter = document.getElementById('ticket-type-filter').value;
        
        if (statusFilter || staffFilter || typeFilter) {
            const filterText = [];
            if (statusFilter) filterText.push(`Trạng thái: ${statusFilter}`);
            if (staffFilter) filterText.push(`Nhân viên: ${staffFilter}`);
            if (typeFilter) filterText.push(`Loại: ${typeFilter}`);
            
            alert(`Đang lọc yêu cầu hỗ trợ theo: ${filterText.join(', ')}`);
        } else {
            alert('Hiển thị tất cả yêu cầu hỗ trợ');
        }
    }
    
    // Hàm lọc khiếu nại
    function filterComplaints() {
        const statusFilter = document.getElementById('complaint-status-filter').value;
        const severityFilter = document.getElementById('complaint-severity-filter').value;
        const typeFilter = document.getElementById('complaint-type-filter').value;
        
        if (statusFilter || severityFilter || typeFilter) {
            const filterText = [];
            if (statusFilter) filterText.push(`Trạng thái: ${statusFilter}`);
            if (severityFilter) filterText.push(`Mức độ: ${severityFilter}`);
            if (typeFilter) filterText.push(`Loại: ${typeFilter}`);
            
            alert(`Đang lọc khiếu nại theo: ${filterText.join(', ')}`);
        } else {
            alert('Hiển thị tất cả khiếu nại');
        }
    }
}); 