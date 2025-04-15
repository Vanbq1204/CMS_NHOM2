document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggleButton = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });
    
    // Add event listeners for action buttons
    const addCustomerButton = document.querySelector('.add-customer');
    addCustomerButton.addEventListener('click', function() {
        // Ẩn nút thêm khách hàng, bảng khách hàng và phần tìm kiếm/lọc
        this.style.display = 'none';
        document.querySelector('.customer-table').style.display = 'none';
        document.querySelector('.search-filter-container').style.display = 'none';
        
        // Hiện form thêm khách hàng với bổ sung trường chọn khu vực
        const formHTML = `
            <div class="add-customer-form active">
                <h2 class="form-title">Thêm khách hàng mới</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="fullname">Họ và tên</label>
                        <input type="text" id="fullname">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Số điện thoại</label>
                        <input type="text" id="phone">
                    </div>
                    <div class="form-group">
                        <label for="company">Công ty</label>
                        <input type="text" id="company">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-type">Phân loại khách hàng</label>
                        <select id="customer-type">
                            <option>Khách hàng tiềm năng</option>
                            <option>Khách hàng hiện tại</option>
                            <option>Khách hàng VIP</option>
                            <option>Khách hàng theo ngành nghề</option>
                            <option>Khách hàng theo khu vực</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="customer-status">Tình trạng khách hàng</label>
                        <select id="customer-status">
                            <option selected>Mới tạo</option>
                            <option>Đang hoạt động</option>
                            <option>Không hoạt động</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-region">Khu vực</label>
                        <select id="customer-region">
                            <option value="">Chọn khu vực</option>
                            <option value="north">Miền Bắc</option>
                            <option value="central">Miền Trung</option>
                            <option value="south">Miền Nam</option>
                            <option value="foreign">Nước ngoài</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="address">Địa chỉ</label>
                        <textarea id="address"></textarea>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="website">Website hiện tại</label>
                        <input type="url" id="website">
                    </div>
                    <div class="form-group">
                        <label for="project-type">Loại dự án</label>
                        <input type="text" id="project-type">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="budget">Ngân sách (VNĐ)</label>
                        <input type="text" id="budget">
                    </div>
                    <div class="form-group">
                        <label for="payment">Đã thanh toán</label>
                        <input type="text" id="payment">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="progress">Tiến độ (%)</label>
                        <input type="number" id="progress" min="0" max="100" value="1">
                    </div>
                    <div class="form-group">
                        <label for="deadline">Thời hạn</label>
                        <input type="date" id="deadline">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="contact-date">Ngày liên hệ</label>
                        <input type="date" id="contact-date" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="status">Trạng thái dự án</label>
                        <select id="status">
                            <option selected>Mới</option>
                            <option>Đang xử lý</option>
                            <option>Hoàn thành</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="requirements">Yêu cầu cụ thể</label>
                        <textarea id="requirements"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="notes">Ghi chú</label>
                        <textarea id="notes"></textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn-primary" id="save-customer">Thêm khách hàng</button>
                    <button class="btn-secondary" id="cancel-add">Quay lại</button>
                </div>
            </div>
        `;
        
        // Thêm form vào DOM
        const formContainer = document.createElement('div');
        formContainer.id = 'customer-form-container';
        formContainer.innerHTML = formHTML;
        document.querySelector('.content').appendChild(formContainer);
        
        // Xử lý sự kiện nút Quay lại
        document.getElementById('cancel-add').addEventListener('click', function() {
            document.getElementById('customer-form-container').remove();
            document.querySelector('.customer-table').style.display = 'block';
            document.querySelector('.search-filter-container').style.display = 'block';
            addCustomerButton.style.display = 'flex'; // Hiện lại nút thêm khách hàng
        });
        
        // Xử lý sự kiện thêm khách hàng
        document.getElementById('save-customer').addEventListener('click', function() {
            // Lấy giá trị từ form
            const customerName = document.getElementById('fullname').value || 'Khách hàng mới';
            
            // Thông báo và đóng form
            alert('Đã thêm khách hàng mới: ' + customerName);
            document.getElementById('customer-form-container').remove();
            document.querySelector('.customer-table').style.display = 'block';
            document.querySelector('.search-filter-container').style.display = 'block';
            addCustomerButton.style.display = 'flex'; // Hiện lại nút thêm khách hàng
        });
    });
    
    // Xử lý nút Sửa thông tin khách hàng
    const editButtons = document.querySelectorAll('.customer-table .edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;
            const email = row.querySelector('td:nth-child(3)').textContent;
            const phone = row.querySelector('td:nth-child(4)').textContent;
            const company = row.querySelector('td:nth-child(5)').textContent;
            const projectType = row.querySelector('td:nth-child(6)').textContent;
            const budget = row.querySelector('td:nth-child(7)').textContent;
            const payment = row.querySelector('td:nth-child(8)').textContent;
            const progress = row.querySelector('.progress-bar .progress').style.width || '0%';
            const deadline = row.querySelector('td:nth-child(10)').textContent;
            
            // Ẩn bảng và phần tìm kiếm
            document.querySelector('.customer-table').style.display = 'none';
            document.querySelector('.search-filter-container').style.display = 'none';
            document.querySelector('.add-customer').style.display = 'none';
            
            // Hiển thị form chỉnh sửa khách hàng
            const editFormHTML = `
                <div class="add-customer-form active">
                    <h2 class="form-title">Chỉnh sửa thông tin khách hàng</h2>
                    
                    <div class="form-tabs">
                        <button class="tab-btn active" data-tab="info">Thông tin cơ bản</button>
                        <button class="tab-btn" data-tab="history">Lịch sử chỉnh sửa</button>
                    </div>
                    
                    <div class="tab-content" id="info-tab" style="display: block;">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-id">ID</label>
                                <input type="text" id="edit-id" value="${id}" readonly>
                            </div>
                            <div class="form-group">
                                <label for="edit-fullname">Họ và tên</label>
                                <input type="text" id="edit-fullname" value="${name}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-email">Email</label>
                                <input type="email" id="edit-email" value="${email}">
                            </div>
                            <div class="form-group">
                                <label for="edit-phone">Số điện thoại</label>
                                <input type="text" id="edit-phone" value="${phone}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-company">Công ty</label>
                                <input type="text" id="edit-company" value="${company}">
                            </div>
                            <div class="form-group">
                                <label for="edit-customer-type">Phân loại khách hàng</label>
                                <select id="edit-customer-type">
                                    <option>Khách hàng tiềm năng</option>
                                    <option selected>Khách hàng hiện tại</option>
                                    <option>Khách hàng VIP</option>
                                    <option>Khách hàng theo ngành nghề</option>
                                    <option>Khách hàng theo khu vực</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-customer-status">Tình trạng khách hàng</label>
                                <select id="edit-customer-status">
                                    <option>Mới tạo</option>
                                    <option selected>Đang hoạt động</option>
                                    <option>Không hoạt động</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="edit-customer-region">Khu vực</label>
                                <select id="edit-customer-region">
                                    <option value="">Chọn khu vực</option>
                                    <option value="north" selected>Miền Bắc</option>
                                    <option value="central">Miền Trung</option>
                                    <option value="south">Miền Nam</option>
                                    <option value="foreign">Nước ngoài</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-address">Địa chỉ</label>
                                <textarea id="edit-address">Hà Nội, Việt Nam</textarea>
                            </div>
                            <div class="form-group">
                                <label for="edit-website">Website hiện tại</label>
                                <input type="url" id="edit-website" value="https://example.com">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-project-type">Loại dự án</label>
                                <input type="text" id="edit-project-type" value="${projectType}">
                            </div>
                            <div class="form-group">
                                <label for="edit-budget">Ngân sách (VNĐ)</label>
                                <input type="text" id="edit-budget" value="${budget}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-payment">Đã thanh toán</label>
                                <input type="text" id="edit-payment" value="${payment}">
                            </div>
                            <div class="form-group">
                                <label for="edit-progress">Tiến độ (%)</label>
                                <input type="number" id="edit-progress" min="0" max="100" value="${progress.replace('%', '')}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-deadline">Thời hạn</label>
                                <input type="date" id="edit-deadline" value="${deadline}">
                            </div>
                            <div class="form-group">
                                <label for="edit-status">Trạng thái dự án</label>
                                <select id="edit-status">
                                    <option>Mới</option>
                                    <option selected>Đang xử lý</option>
                                    <option>Hoàn thành</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-notes">Ghi chú</label>
                                <textarea id="edit-notes">Khách hàng thân thiết, đã hợp tác nhiều lần.</textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="history-tab" style="display: none;">
                        <div class="edit-history">
                            <div class="history-item">
                                <div class="history-header">
                                    <span class="history-date">20/06/2023 - 10:45</span>
                                    <span class="history-user">admin</span>
                                </div>
                                <div class="history-details">
                                    <p>Cập nhật số điện thoại từ <span class="old-value">0912345678</span> thành <span class="new-value">0975510794</span></p>
                                </div>
                            </div>
                            
                            <div class="history-item">
                                <div class="history-header">
                                    <span class="history-date">15/05/2023 - 14:20</span>
                                    <span class="history-user">admin</span>
                                </div>
                                <div class="history-details">
                                    <p>Cập nhật trạng thái từ <span class="old-value">Mới tạo</span> thành <span class="new-value">Đang hoạt động</span></p>
                                    <p>Cập nhật ngân sách từ <span class="old-value">15.000.000 VND</span> thành <span class="new-value">20.000.000 VND</span></p>
                                </div>
                            </div>
                            
                            <div class="history-item">
                                <div class="history-header">
                                    <span class="history-date">01/04/2023 - 09:15</span>
                                    <span class="history-user">admin</span>
                                </div>
                                <div class="history-details">
                                    <p>Tạo mới khách hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn-primary" id="update-customer">Cập nhật thông tin</button>
                        <button class="btn-secondary" id="cancel-edit">Quay lại</button>
                    </div>
                </div>
            `;
            
            // Thêm form vào DOM
            const editFormContainer = document.createElement('div');
            editFormContainer.id = 'edit-form-container';
            editFormContainer.innerHTML = editFormHTML;
            document.querySelector('.content').appendChild(editFormContainer);
            
            // Xử lý chuyển tab
            const tabButtons = document.querySelectorAll('#edit-form-container .tab-btn');
            const tabContents = document.querySelectorAll('#edit-form-container .tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Loại bỏ active từ tất cả các tab
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Ẩn tất cả các tab content
                    tabContents.forEach(content => content.style.display = 'none');
                    
                    // Thêm active cho tab được chọn
                    this.classList.add('active');
                    
                    // Hiển thị nội dung tab được chọn
                    document.getElementById(`${tabId}-tab`).style.display = 'block';
                });
            });
            
            // Xử lý sự kiện nút Quay lại
            document.getElementById('cancel-edit').addEventListener('click', function() {
                document.getElementById('edit-form-container').remove();
                document.querySelector('.customer-table').style.display = 'block';
                document.querySelector('.search-filter-container').style.display = 'block';
                document.querySelector('.add-customer').style.display = 'flex';
            });
            
            // Xử lý sự kiện cập nhật thông tin
            document.getElementById('update-customer').addEventListener('click', function() {
                alert(`Đã cập nhật thông tin khách hàng: ${document.getElementById('edit-fullname').value}`);
                
                document.getElementById('edit-form-container').remove();
                document.querySelector('.customer-table').style.display = 'block';
                document.querySelector('.search-filter-container').style.display = 'block';
                document.querySelector('.add-customer').style.display = 'flex';
            });
        });
    });
    
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;
            if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${name} (ID: ${id})?`)) {
                row.remove();
                alert('Đã xóa khách hàng thành công');
            }
        });
    });
    
    const printButtons = document.querySelectorAll('.print');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;
            alert(`In báo giá cho khách hàng: ${name} (ID: ${id})`);
        });
    });
    
    // Xử lý tìm kiếm và lọc
    if (document.querySelector('.search-input')) {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        const applyFiltersButton = document.querySelector('.apply-filters');
        const resetFiltersButton = document.querySelector('.reset-filters');
        
        // Tìm kiếm khi nhấn nút tìm kiếm
        searchButton.addEventListener('click', function() {
            filterCustomers();
        });
        
        // Tìm kiếm khi nhấn Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterCustomers();
            }
        });
        
        // Áp dụng bộ lọc
        applyFiltersButton.addEventListener('click', function() {
            filterCustomers();
        });
        
        // Xóa bộ lọc
        resetFiltersButton.addEventListener('click', function() {
            searchInput.value = '';
            document.getElementById('filter-type').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-project-type').value = '';
            document.getElementById('filter-region').value = '';
            
            // Hiển thị lại tất cả khách hàng
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.display = '';
            });
        });
        
        function filterCustomers() {
            const searchTerm = searchInput.value.toLowerCase();
            const customerType = document.getElementById('filter-type').value;
            const customerStatus = document.getElementById('filter-status').value;
            const projectType = document.getElementById('filter-project-type').value;
            const region = document.getElementById('filter-region').value;
            
            const rows = document.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                const phone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                
                // Đơn giản hóa cho demo - chỉ tìm kiếm theo tên, email, phone
                const matchesSearch = name.includes(searchTerm) || 
                                     email.includes(searchTerm) || 
                                     phone.includes(searchTerm) ||
                                     searchTerm === '';
                
                // Để demo chạy được, tạm thời để tất cả hiển thị
                row.style.display = matchesSearch ? '' : 'none';
            });
        }
    }
    
    // Điều hướng menu sidebar
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const customerContent = document.querySelector('.customer-content');
    const emailMarketingContent = document.querySelector('.email-marketing-content');
    
    // Xử lý sự kiện khi click vào các mục menu
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Bỏ active khỏi tất cả menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Thêm active cho menu item được click
            this.classList.add('active');
            
            // Lấy data-section của menu item
            const section = this.getAttribute('data-section');
            
            // Ẩn tất cả các section
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Hiển thị section tương ứng
            document.getElementById(section + '-section').style.display = 'block';
            
            // Cập nhật tiêu đề
            const sectionTitle = this.querySelector('span').textContent;
            document.querySelector('.header h1').textContent = sectionTitle;
        });
    });
    
    // Giữ lại code xử lý Modal
    const openEmailMarketingButton = document.getElementById('openEmailMarketing');
    if (openEmailMarketingButton) {
        openEmailMarketingButton.addEventListener('click', function() {
            // Khi click vào nút "Tạo chiến dịch Email", chuyển sang tab Email Marketing
            const emailMarketingMenuItem = document.querySelector('[data-section="email-marketing"]');
            if (emailMarketingMenuItem) {
                emailMarketingMenuItem.click();
                // Mặc định hiển thị tab "Tạo chiến dịch"
                document.querySelector('[data-tab="create-campaign"]').click();
            }
        });
    }
    
    // Xử lý Tab trong Email Marketing
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tabContainer = this.closest('.tab-container');
            // Xóa active khỏi tất cả tab và nội dung trong container này
            tabContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Thêm active cho tab được chọn
            this.classList.add('active');
            
            // Hiển thị nội dung tương ứng
            const tabId = this.getAttribute('data-tab');
            tabContainer.querySelector('#' + tabId).classList.add('active');
        });
    });

    // Xử lý sự kiện cho phần Chăm sóc khách hàng
    const newTicketButton = document.getElementById('new-ticket');
    const newComplaintButton = document.getElementById('new-complaint');
    
    if (newTicketButton) {
        newTicketButton.addEventListener('click', function() {
            // Hiển thị form tạo yêu cầu hỗ trợ mới
            createTicketForm();
        });
    }
    
    if (newComplaintButton) {
        newComplaintButton.addEventListener('click', function() {
            // Hiển thị form tạo khiếu nại mới
            createComplaintForm();
        });
    }
    
    // Xử lý cho các nút trong bảng yêu cầu hỗ trợ
    const viewTicketButtons = document.querySelectorAll('.view-ticket');
    const editTicketButtons = document.querySelectorAll('.edit-ticket');
    const assignTicketButtons = document.querySelectorAll('.assign-ticket');
    
    viewTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            viewTicketDetails(ticketId);
        });
    });
    
    editTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            editTicketDetails(ticketId);
        });
    });
    
    assignTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const ticketId = row.querySelector('td:first-child').textContent;
            assignTicket(ticketId);
        });
    });
    
    // Xử lý cho các nút trong bảng khiếu nại
    const viewComplaintButtons = document.querySelectorAll('.view-complaint');
    const editComplaintButtons = document.querySelectorAll('.edit-complaint');
    const resolveComplaintButtons = document.querySelectorAll('.resolve-complaint');
    
    viewComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            viewComplaintDetails(complaintId);
        });
    });
    
    editComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            editComplaintDetails(complaintId);
        });
    });
    
    resolveComplaintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const complaintId = row.querySelector('td:first-child').textContent;
            resolveComplaint(complaintId);
        });
    });
    
    // Hàm xử lý lọc cho yêu cầu hỗ trợ
    const ticketStatusFilter = document.getElementById('ticket-status-filter');
    const ticketStaffFilter = document.getElementById('ticket-staff-filter');
    const ticketTypeFilter = document.getElementById('ticket-type-filter');
    
    if (ticketStatusFilter && ticketStaffFilter && ticketTypeFilter) {
        [ticketStatusFilter, ticketStaffFilter, ticketTypeFilter].forEach(filter => {
            filter.addEventListener('change', filterTickets);
        });
    }
    
    function filterTickets() {
        const statusValue = ticketStatusFilter.value;
        const staffValue = ticketStaffFilter.value;
        const typeValue = ticketTypeFilter.value;
        
        const rows = document.querySelectorAll('.tickets-table tbody tr');
        
        rows.forEach(row => {
            const status = row.querySelector('td:nth-child(8) .status').className.split(' ')[1];
            const staffText = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            const type = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            
            const matchesStatus = statusValue === '' || status === statusValue;
            const matchesStaff = staffValue === '' || 
                               (staffValue === 'unassigned' && staffText.includes('chưa phân công')) ||
                               staffText.toLowerCase().includes(staffValue.replace('-', ' '));
            const matchesType = typeValue === '' || type.includes(typeValue);
            
            row.style.display = matchesStatus && matchesStaff && matchesType ? '' : 'none';
        });
    }
    
    // Hàm xử lý lọc cho khiếu nại
    const complaintStatusFilter = document.getElementById('complaint-status-filter');
    const complaintSeverityFilter = document.getElementById('complaint-severity-filter');
    const complaintTypeFilter = document.getElementById('complaint-type-filter');
    
    if (complaintStatusFilter && complaintSeverityFilter && complaintTypeFilter) {
        [complaintStatusFilter, complaintSeverityFilter, complaintTypeFilter].forEach(filter => {
            filter.addEventListener('change', filterComplaints);
        });
    }
    
    function filterComplaints() {
        const statusValue = complaintStatusFilter.value;
        const severityValue = complaintSeverityFilter.value;
        const typeValue = complaintTypeFilter.value;
        
        const rows = document.querySelectorAll('.complaints-table tbody tr');
        
        rows.forEach(row => {
            const status = row.querySelector('td:nth-child(8) .status').className.split(' ')[1];
            const severity = row.querySelector('td:nth-child(5) .severity').className.split(' ')[1];
            const type = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            
            const matchesStatus = statusValue === '' || status === statusValue;
            const matchesSeverity = severityValue === '' || severity === severityValue;
            const matchesType = typeValue === '' || type.includes(typeValue);
            
            row.style.display = matchesStatus && matchesSeverity && matchesType ? '' : 'none';
        });
    }
    
    // Hàm tạo form yêu cầu hỗ trợ mới
    function createTicketForm() {
        // Ẩn bảng yêu cầu hỗ trợ
        const ticketsTable = document.querySelector('.tickets-table');
        const ticketsStats = document.querySelector('.tickets-stats');
        const filterContainer = document.querySelector('.filter-container');
        const actionButtons = document.querySelector('#support-tickets .action-buttons');
        
        if (ticketsTable) ticketsTable.style.display = 'none';
        if (ticketsStats) ticketsStats.style.display = 'none';
        if (filterContainer) filterContainer.style.display = 'none';
        if (actionButtons) actionButtons.style.display = 'none';
        
        // Tạo form HTML
        const formHTML = `
            <div class="support-ticket-form">
                <h2 class="form-title">Tạo yêu cầu hỗ trợ mới</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ticket-customer">Khách hàng</label>
                        <select id="ticket-customer" required>
                            <option value="">Chọn khách hàng</option>
                            <option value="1">Nguyễn Xuân Bình</option>
                            <option value="2">Trần Minh Hùng</option>
                            <option value="3">Lê Thị Hoa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ticket-type">Loại yêu cầu</label>
                        <select id="ticket-type" required>
                            <option value="">Chọn loại</option>
                            <option value="technical">Kỹ thuật</option>
                            <option value="billing">Thanh toán</option>
                            <option value="product">Sản phẩm</option>
                            <option value="service">Dịch vụ</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ticket-title">Tiêu đề</label>
                        <input type="text" id="ticket-title" placeholder="Nhập tiêu đề yêu cầu" required>
                    </div>
                    <div class="form-group">
                        <label for="ticket-staff">Nhân viên phụ trách</label>
                        <select id="ticket-staff">
                            <option value="">Chọn nhân viên</option>
                            <option value="nguyen-van-a">Nguyễn Văn A</option>
                            <option value="tran-thi-b">Trần Thị B</option>
                            <option value="le-van-c">Lê Văn C</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group full-width">
                        <label for="ticket-description">Mô tả yêu cầu hỗ trợ</label>
                        <textarea id="ticket-description" rows="5" placeholder="Nhập mô tả chi tiết về yêu cầu hỗ trợ" required></textarea>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ticket-priority">Mức độ ưu tiên</label>
                        <select id="ticket-priority" required>
                            <option value="">Chọn mức độ ưu tiên</option>
                            <option value="low">Thấp</option>
                            <option value="medium">Trung bình</option>
                            <option value="high">Cao</option>
                            <option value="urgent">Khẩn cấp</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ticket-deadline">Hạn xử lý</label>
                        <input type="date" id="ticket-deadline">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn-primary" id="save-ticket">Lưu yêu cầu</button>
                    <button class="btn-secondary" id="cancel-ticket">Hủy bỏ</button>
                </div>
            </div>
        `;
        
        // Thêm form vào DOM
        const supportTicketsTab = document.getElementById('support-tickets');
        const formContainer = document.createElement('div');
        formContainer.id = 'ticket-form-container';
        formContainer.innerHTML = formHTML;
        supportTicketsTab.appendChild(formContainer);
        
        // Xử lý sự kiện nút Hủy bỏ
        document.getElementById('cancel-ticket').addEventListener('click', function() {
            document.getElementById('ticket-form-container').remove();
            if (ticketsTable) ticketsTable.style.display = 'block';
            if (ticketsStats) ticketsStats.style.display = 'flex';
            if (filterContainer) filterContainer.style.display = 'flex';
            if (actionButtons) actionButtons.style.display = 'flex';
        });
        
        // Xử lý sự kiện nút Lưu yêu cầu
        document.getElementById('save-ticket').addEventListener('click', function() {
            const customer = document.getElementById('ticket-customer').value;
            const title = document.getElementById('ticket-title').value;
            
            if (!customer || !title) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            
            alert('Đã tạo yêu cầu hỗ trợ mới thành công!');
            document.getElementById('ticket-form-container').remove();
            if (ticketsTable) ticketsTable.style.display = 'block';
            if (ticketsStats) ticketsStats.style.display = 'flex';
            if (filterContainer) filterContainer.style.display = 'flex';
            if (actionButtons) actionButtons.style.display = 'flex';
        });
    }
    
    // Hàm tạo form khiếu nại mới
    function createComplaintForm() {
        // Ẩn bảng khiếu nại
        const complaintsTable = document.querySelector('.complaints-table');
        const complaintsStats = document.querySelector('.complaints-stats');
        const filterContainer = document.querySelector('#complaints .filter-container');
        const actionButtons = document.querySelector('#complaints .action-buttons');
        
        if (complaintsTable) complaintsTable.style.display = 'none';
        if (complaintsStats) complaintsStats.style.display = 'none';
        if (filterContainer) filterContainer.style.display = 'none';
        if (actionButtons) actionButtons.style.display = 'none';
        
        // Tạo form HTML
        const formHTML = `
            <div class="complaint-form">
                <h2 class="form-title">Tạo khiếu nại mới</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="complaint-customer">Khách hàng</label>
                        <select id="complaint-customer" required>
                            <option value="">Chọn khách hàng</option>
                            <option value="1">Nguyễn Xuân Bình</option>
                            <option value="2">Trần Minh Hùng</option>
                            <option value="3">Lê Thị Hoa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="complaint-type">Loại khiếu nại</label>
                        <select id="complaint-type" required>
                            <option value="">Chọn loại</option>
                            <option value="product">Sản phẩm</option>
                            <option value="service">Dịch vụ</option>
                            <option value="delivery">Giao hàng</option>
                            <option value="payment">Thanh toán</option>
                            <option value="staff">Nhân viên</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="complaint-title">Tiêu đề</label>
                        <input type="text" id="complaint-title" placeholder="Nhập tiêu đề khiếu nại" required>
                    </div>
                    <div class="form-group">
                        <label for="complaint-severity">Mức độ nghiêm trọng</label>
                        <select id="complaint-severity" required>
                            <option value="">Chọn mức độ</option>
                            <option value="low">Thấp</option>
                            <option value="medium">Trung bình</option>
                            <option value="high">Cao</option>
                            <option value="critical">Nghiêm trọng</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group full-width">
                        <label for="complaint-description">Mô tả chi tiết</label>
                        <textarea id="complaint-description" rows="5" placeholder="Nhập mô tả chi tiết về khiếu nại" required></textarea>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="complaint-deadline">Hạn xử lý</label>
                        <input type="date" id="complaint-deadline" required>
                    </div>
                    <div class="form-group">
                        <label for="complaint-requested-solution">Giải pháp yêu cầu</label>
                        <input type="text" id="complaint-requested-solution" placeholder="Nhập giải pháp khách hàng yêu cầu">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn-primary" id="save-complaint">Lưu khiếu nại</button>
                    <button class="btn-secondary" id="cancel-complaint">Hủy bỏ</button>
                </div>
            </div>
        `;
        
        // Thêm form vào DOM
        const complaintsTab = document.getElementById('complaints');
        const formContainer = document.createElement('div');
        formContainer.id = 'complaint-form-container';
        formContainer.innerHTML = formHTML;
        complaintsTab.appendChild(formContainer);
        
        // Xử lý sự kiện nút Hủy bỏ
        document.getElementById('cancel-complaint').addEventListener('click', function() {
            document.getElementById('complaint-form-container').remove();
            if (complaintsTable) complaintsTable.style.display = 'block';
            if (complaintsStats) complaintsStats.style.display = 'flex';
            if (filterContainer) filterContainer.style.display = 'flex';
            if (actionButtons) actionButtons.style.display = 'flex';
        });
        
        // Xử lý sự kiện nút Lưu khiếu nại
        document.getElementById('save-complaint').addEventListener('click', function() {
            const customer = document.getElementById('complaint-customer').value;
            const title = document.getElementById('complaint-title').value;
            const description = document.getElementById('complaint-description').value;
            
            if (!customer || !title || !description) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            
            alert('Đã tạo khiếu nại mới thành công!');
            document.getElementById('complaint-form-container').remove();
            if (complaintsTable) complaintsTable.style.display = 'block';
            if (complaintsStats) complaintsStats.style.display = 'flex';
            if (filterContainer) filterContainer.style.display = 'flex';
            if (actionButtons) actionButtons.style.display = 'flex';
        });
    }
    
    // Các hàm xử lý chi tiết
    function viewTicketDetails(ticketId) {
        alert(`Xem chi tiết yêu cầu hỗ trợ ${ticketId}`);
    }
    
    function editTicketDetails(ticketId) {
        alert(`Chỉnh sửa yêu cầu hỗ trợ ${ticketId}`);
    }
    
    function assignTicket(ticketId) {
        const staff = prompt('Nhập tên nhân viên phụ trách:', 'Nguyễn Văn A');
        if (staff) {
            alert(`Đã phân công yêu cầu ${ticketId} cho nhân viên ${staff}`);
        }
    }
    
    function viewComplaintDetails(complaintId) {
        alert(`Xem chi tiết khiếu nại ${complaintId}`);
    }
    
    function editComplaintDetails(complaintId) {
        alert(`Chỉnh sửa khiếu nại ${complaintId}`);
    }
    
    function resolveComplaint(complaintId) {
        const solution = prompt('Nhập giải pháp xử lý khiếu nại:');
        if (solution) {
            alert(`Đã giải quyết khiếu nại ${complaintId} với giải pháp: ${solution}`);
        }
    }

    // Xử lý các chức năng trong trang Quản lý hạng mục dịch vụ
    const addServiceButton = document.getElementById('add-service');
    if (addServiceButton) {
        addServiceButton.addEventListener('click', function() {
            // Lấy giá trị từ form
            const serviceName = document.getElementById('service-name').value;
            const serviceDescription = document.getElementById('service-description').value;
            const serviceType = document.getElementById('service-type');
            const serviceTypeText = serviceType.options[serviceType.selectedIndex].text;
            const servicePrice = document.getElementById('service-price').value;
            
            if (!serviceName || !serviceDescription || !serviceType.value) {
                alert('Vui lòng điền đầy đủ thông tin dịch vụ');
                return;
            }
            
            // Lấy ID lớn nhất hiện tại để tạo ID mới
            const serviceTable = document.querySelector('.service-table table tbody');
            const rows = serviceTable.querySelectorAll('tr');
            let maxId = 0;
            
            rows.forEach(row => {
                const id = parseInt(row.querySelector('td:first-child').textContent);
                if (id > maxId) maxId = id;
            });
            
            // Tạo hàng mới
            const newRow = document.createElement('tr');
            
            // Tạo nội dung cho hàng mới
            const priceCol = serviceType.value === 'once' ? servicePrice : '-';
            const monthlyCol = serviceType.value === 'monthly' ? servicePrice : '-';
            
            newRow.innerHTML = `
                <td>${maxId + 1}</td>
                <td>${serviceName}</td>
                <td>${serviceDescription}</td>
                <td>${serviceTypeText}</td>
                <td>${priceCol}</td>
                <td>${monthlyCol}</td>
                <td class="actions">
                    <button class="edit-service"><i class="fas fa-edit"></i> Sửa</button>
                    <button class="delete-service"><i class="fas fa-trash"></i> Xóa</button>
                </td>
            `;
            
            // Thêm hàng mới vào bảng
            serviceTable.appendChild(newRow);
            
            // Xóa nội dung form
            document.getElementById('service-name').value = '';
            document.getElementById('service-description').value = '';
            document.getElementById('service-type').selectedIndex = 0;
            document.getElementById('service-price').value = '';
            
            // Thêm sự kiện cho các nút mới
            attachServiceButtonEvents(newRow);
            
            alert('Đã thêm dịch vụ mới thành công!');
        });
    }
    
    // Gán sự kiện cho các nút trong bảng dịch vụ
    const serviceRows = document.querySelectorAll('.service-table tbody tr');
    serviceRows.forEach(row => {
        attachServiceButtonEvents(row);
    });
    
    // Hàm gán sự kiện cho các nút trong mỗi hàng
    function attachServiceButtonEvents(row) {
        // Sự kiện nút Sửa
        const editBtn = row.querySelector('.edit-service');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const cells = row.querySelectorAll('td');
                const id = cells[0].textContent;
                const name = cells[1].textContent;
                const description = cells[2].textContent;
                const type = cells[3].textContent;
                const price = cells[4].textContent !== '-' ? cells[4].textContent : cells[5].textContent;
                
                // Hiển thị thông tin trong form
                document.getElementById('service-name').value = name;
                document.getElementById('service-description').value = description;
                document.getElementById('service-price').value = price;
                
                // Chọn loại dịch vụ phù hợp
                const serviceType = document.getElementById('service-type');
                for (let i = 0; i < serviceType.options.length; i++) {
                    if (serviceType.options[i].text === type) {
                        serviceType.selectedIndex = i;
                        break;
                    }
                }
                
                // Thay đổi nút Thêm dịch vụ thành Cập nhật dịch vụ
                const addServiceBtn = document.getElementById('add-service');
                addServiceBtn.textContent = 'Cập nhật dịch vụ';
                addServiceBtn.setAttribute('data-id', id);
                
                // Thêm nút Hủy
                const formActions = addServiceBtn.parentElement;
                if (!document.getElementById('cancel-edit-service')) {
                    const cancelBtn = document.createElement('button');
                    cancelBtn.id = 'cancel-edit-service';
                    cancelBtn.className = 'btn-secondary';
                    cancelBtn.textContent = 'Hủy';
                    cancelBtn.addEventListener('click', function() {
                        // Xóa trống form
                        document.getElementById('service-name').value = '';
                        document.getElementById('service-description').value = '';
                        document.getElementById('service-type').selectedIndex = 0;
                        document.getElementById('service-price').value = '';
                        
                        // Đổi lại nút Cập nhật thành Thêm dịch vụ
                        addServiceBtn.textContent = 'Thêm dịch vụ';
                        addServiceBtn.removeAttribute('data-id');
                        
                        // Xóa nút Hủy
                        this.remove();
                    });
                    formActions.appendChild(cancelBtn);
                }
                
                // Thay đổi sự kiện của nút
                addServiceBtn.removeEventListener('click', addServiceClickHandler);
                addServiceBtn.addEventListener('click', function updateHandler() {
                    const newName = document.getElementById('service-name').value;
                    const newDescription = document.getElementById('service-description').value;
                    const newTypeSelect = document.getElementById('service-type');
                    const newTypeText = newTypeSelect.options[newTypeSelect.selectedIndex].text;
                    const newPrice = document.getElementById('service-price').value;
                    
                    if (!newName || !newDescription || !newTypeSelect.value) {
                        alert('Vui lòng điền đầy đủ thông tin dịch vụ');
                        return;
                    }
                    
                    // Cập nhật thông tin trong hàng
                    cells[1].textContent = newName;
                    cells[2].textContent = newDescription;
                    cells[3].textContent = newTypeText;
                    
                    if (newTypeSelect.value === 'once') {
                        cells[4].textContent = newPrice;
                        cells[5].textContent = '-';
                    } else {
                        cells[4].textContent = '-';
                        cells[5].textContent = newPrice;
                    }
                    
                    // Xóa trống form
                    document.getElementById('service-name').value = '';
                    document.getElementById('service-description').value = '';
                    document.getElementById('service-type').selectedIndex = 0;
                    document.getElementById('service-price').value = '';
                    
                    // Đổi lại nút Cập nhật thành Thêm dịch vụ
                    addServiceBtn.textContent = 'Thêm dịch vụ';
                    addServiceBtn.removeAttribute('data-id');
                    addServiceBtn.removeEventListener('click', updateHandler);
                    addServiceBtn.addEventListener('click', addServiceClickHandler);
                    
                    // Xóa nút Hủy
                    document.getElementById('cancel-edit-service').remove();
                    
                    alert('Đã cập nhật dịch vụ thành công!');
                });
            });
        }
        
        // Sự kiện nút Xóa
        const deleteBtn = row.querySelector('.delete-service');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                const id = row.querySelector('td:first-child').textContent;
                const name = row.querySelector('td:nth-child(2)').textContent;
                
                if (confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}" (ID: ${id})?`)) {
                    row.remove();
                    alert('Đã xóa dịch vụ thành công!');
                }
            });
        }
    }
    
    // Lưu hàm thêm dịch vụ ban đầu để có thể thay đổi và khôi phục
    function addServiceClickHandler() {
        // Lấy giá trị từ form
        const serviceName = document.getElementById('service-name').value;
        const serviceDescription = document.getElementById('service-description').value;
        const serviceType = document.getElementById('service-type');
        const serviceTypeText = serviceType.options[serviceType.selectedIndex].text;
        const servicePrice = document.getElementById('service-price').value;
        
        if (!serviceName || !serviceDescription || !serviceType.value) {
            alert('Vui lòng điền đầy đủ thông tin dịch vụ');
            return;
        }
        
        // Lấy ID lớn nhất hiện tại để tạo ID mới
        const serviceTable = document.querySelector('.service-table table tbody');
        const rows = serviceTable.querySelectorAll('tr');
        let maxId = 0;
        
        rows.forEach(row => {
            const id = parseInt(row.querySelector('td:first-child').textContent);
            if (id > maxId) maxId = id;
        });
        
        // Tạo hàng mới
        const newRow = document.createElement('tr');
        
        // Tạo nội dung cho hàng mới
        const priceCol = serviceType.value === 'once' ? servicePrice : '-';
        const monthlyCol = serviceType.value === 'monthly' ? servicePrice : '-';
        
        newRow.innerHTML = `
            <td>${maxId + 1}</td>
            <td>${serviceName}</td>
            <td>${serviceDescription}</td>
            <td>${serviceTypeText}</td>
            <td>${priceCol}</td>
            <td>${monthlyCol}</td>
            <td class="actions">
                <button class="edit-service"><i class="fas fa-edit"></i> Sửa</button>
                <button class="delete-service"><i class="fas fa-trash"></i> Xóa</button>
            </td>
        `;
        
        // Thêm hàng mới vào bảng
        serviceTable.appendChild(newRow);
        
        // Xóa nội dung form
        document.getElementById('service-name').value = '';
        document.getElementById('service-description').value = '';
        document.getElementById('service-type').selectedIndex = 0;
        document.getElementById('service-price').value = '';
        
        // Thêm sự kiện cho các nút mới
        attachServiceButtonEvents(newRow);
        
        alert('Đã thêm dịch vụ mới thành công!');
    }
    
    // Sự kiện cho nút quay lại
    const pageBackBtn = document.querySelector('.page-btn');
    if (pageBackBtn) {
        pageBackBtn.addEventListener('click', function() {
            alert('Đã quay lại trang trước');
        });
    }
}); 