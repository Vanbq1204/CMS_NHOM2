document.addEventListener('DOMContentLoaded', function() {
    // API URL
    const API_URL = '/api/customer-info';
    
    // DOM Elements
    const customerForm = document.getElementById('customerForm');
    const customerFormCard = document.getElementById('customerFormCard');
    const formTitle = document.getElementById('formTitle');
    const customerTableBody = document.getElementById('customerTableBody');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');
    const btnRefresh = document.getElementById('btnRefresh');
    const btnSearchName = document.getElementById('btnSearchName');
    const btnAddCustomer = document.getElementById('btnAddCustomer');
    const btnCloseForm = document.getElementById('btnCloseForm');
    const btnApplyFilter = document.getElementById('btnApplyFilter');
    const btnClearFilter = document.getElementById('btnClearFilter');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    // Toggle sidebar
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });

    // Add Customer Button
    btnAddCustomer.addEventListener('click', function() {
        resetForm();
        showForm();
    });

    // Hiển thị form
    function showForm() {
        customerFormCard.style.display = 'block';
        setTimeout(() => {
            customerFormCard.classList.add('show');
        }, 10);
        window.scrollTo({
            top: customerFormCard.offsetTop - 20,
            behavior: 'smooth'
        });
    }

    // Ẩn form
    function hideForm() {
        customerFormCard.classList.remove('show');
        setTimeout(() => {
            customerFormCard.style.display = 'none';
        }, 300);
    }

    // Close Form Button
    btnCloseForm.addEventListener('click', hideForm);
    
    // Tải danh sách khách hàng
    function loadCustomers() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                customerTableBody.innerHTML = '';
                data.forEach(customer => {
                    renderCustomerRow(customer);
                });
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu khách hàng:', error);
                alert('Không thể tải dữ liệu khách hàng. Vui lòng thử lại sau.');
            });
    }
    
    // Render hàng dữ liệu khách hàng
    function renderCustomerRow(customer) {
        // Mô phỏng các trường dữ liệu bổ sung (sẽ được cập nhật khi bạn thêm vào API thực tế)
        const company = customer.company || 'N/A';
        const projectType = customer.projectType || 'N/A';
        const budget = customer.budget ? formatCurrency(customer.budget) : 'N/A';
        const paid = customer.paid ? formatCurrency(customer.paid) : 'N/A';
        const progress = customer.progress || 50; // Mặc định 50%
        const deadline = customer.deadline ? formatDate(customer.deadline) : 'N/A';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${company}</td>
            <td>${translateProjectType(projectType)}</td>
            <td>${budget}</td>
            <td>${paid}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar ${getProgressBarClass(progress)}" role="progressbar" 
                        style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                        ${progress}%
                    </div>
                </div>
            </td>
            <td>${deadline}</td>
            <td class="${customer.status === 'Active' ? 'status-active' : 'status-inactive'}">${translateStatus(customer.status)}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-warning me-1 btn-edit" data-id="${customer.id}">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${customer.id}">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </td>
        `;
        
        customerTableBody.appendChild(row);
        
        // Add event listeners for buttons
        row.querySelector('.btn-edit').addEventListener('click', () => editCustomer(customer.id));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteCustomer(customer.id));
    }

    // Định dạng tiền tệ
    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    // Định dạng ngày tháng
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('vi-VN');
    }

    // Lấy class cho progress bar
    function getProgressBarClass(progress) {
        if (progress < 30) return 'bg-danger';
        if (progress < 70) return 'bg-warning';
        return 'bg-success';
    }
    
    // Dịch loại khách hàng
    function translateCustomerType(type) {
        const types = {
            'VIP': 'VIP',
            'Regular': 'Thường xuyên',
            'New': 'Mới'
        };
        return types[type] || type;
    }

    // Dịch loại dự án
    function translateProjectType(type) {
        const types = {
            'Website': 'Website',
            'Mobile App': 'Ứng dụng di động',
            'Consulting': 'Tư vấn'
        };
        return types[type] || type;
    }
    
    // Dịch trạng thái
    function translateStatus(status) {
        const statuses = {
            'Active': 'Đang hoạt động',
            'Inactive': 'Không hoạt động'
        };
        return statuses[status] || status;
    }
    
    // Lưu thông tin khách hàng
    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerId = document.getElementById('customerId').value;
        const customerData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            type: document.getElementById('type').value,
            status: document.getElementById('status').value,
            company: document.getElementById('company').value,
            projectType: document.getElementById('projectType').value,
            budget: document.getElementById('budget').value ? parseInt(document.getElementById('budget').value) : null,
            region: document.getElementById('region').value
        };
        
        if (customerId) {
            // Cập nhật khách hàng
            updateCustomer(customerId, customerData);
        } else {
            // Tạo khách hàng mới
            createCustomer(customerData);
        }
    });
    
    // Tạo khách hàng mới
    function createCustomer(customerData) {
        customerData.createdAt = new Date().toISOString();
        
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi khi tạo khách hàng mới');
            }
            return response.json();
        })
        .then(() => {
            alert('Tạo khách hàng mới thành công!');
            hideForm();
            loadCustomers();
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert(error.message);
        });
    }
    
    // Cập nhật khách hàng
    function updateCustomer(id, customerData) {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi khi cập nhật thông tin khách hàng');
            }
            return response.json();
        })
        .then(() => {
            alert('Cập nhật thông tin khách hàng thành công!');
            hideForm();
            loadCustomers();
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert(error.message);
        });
    }
    
    // Sửa thông tin khách hàng
    function editCustomer(id) {
        fetch(`${API_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không tìm thấy thông tin khách hàng');
                }
                return response.json();
            })
            .then(customer => {
                document.getElementById('customerId').value = customer.id;
                document.getElementById('name').value = customer.name;
                document.getElementById('email').value = customer.email;
                document.getElementById('phone').value = customer.phone;
                document.getElementById('address').value = customer.address || '';
                document.getElementById('type').value = customer.type;
                document.getElementById('status').value = customer.status;
                
                // Các trường bổ sung
                document.getElementById('company').value = customer.company || '';
                document.getElementById('projectType').value = customer.projectType || '';
                document.getElementById('budget').value = customer.budget || '';
                document.getElementById('region').value = customer.region || '';
                
                formTitle.textContent = 'Chỉnh Sửa Thông Tin Khách Hàng';
                btnSave.textContent = 'Cập nhật';
                
                showForm();
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert(error.message);
            });
    }
    
    // Xóa khách hàng
    function deleteCustomer(id) {
        if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Không tìm thấy khách hàng');
                    }
                    throw new Error('Lỗi khi xóa khách hàng');
                }
                alert('Xóa khách hàng thành công!');
                loadCustomers();
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert(error.message);
            });
        }
    }
    
    // Reset form
    function resetForm() {
        customerForm.reset();
        document.getElementById('customerId').value = '';
        formTitle.textContent = 'Thêm Khách Hàng Mới';
        btnSave.textContent = 'Lưu';
    }
    
    // Tìm kiếm theo tên
    btnSearchName.addEventListener('click', function() {
        const searchTerm = document.getElementById('searchName').value.trim();
        if (searchTerm) {
            searchCustomersByName(searchTerm);
        } else {
            loadCustomers();
        }
    });

    // Xử lý nút Enter khi tìm kiếm
    document.getElementById('searchName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            btnSearchName.click();
        }
    });
    
    // Tìm kiếm khách hàng theo tên
    function searchCustomersByName(name) {
        fetch(`${API_URL}/search/name?name=${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                customerTableBody.innerHTML = '';
                data.forEach(customer => {
                    renderCustomerRow(customer);
                });
            })
            .catch(error => {
                console.error('Lỗi khi tìm kiếm:', error);
                alert('Không thể tìm kiếm. Vui lòng thử lại sau.');
            });
    }
    
    // Áp dụng bộ lọc
    btnApplyFilter.addEventListener('click', function() {
        const typeFilter = document.getElementById('filterType').value;
        const statusFilter = document.getElementById('filterStatus').value;
        const projectFilter = document.getElementById('filterProject').value;
        const regionFilter = document.getElementById('filterRegion').value;

        // Cần mở rộng API để hỗ trợ lọc theo nhiều tiêu chí
        // Tạm thời chỉ lọc trên client-side với dữ liệu đã tải
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                let filteredData = data;
                
                if (typeFilter) {
                    filteredData = filteredData.filter(customer => customer.type === typeFilter);
                }
                
                if (statusFilter) {
                    filteredData = filteredData.filter(customer => customer.status === statusFilter);
                }

                // Giả lập lọc theo trường chưa có trong API
                if (projectFilter || regionFilter) {
                    alert('Chức năng lọc theo dự án và khu vực sẽ được cập nhật trong phiên bản tới.');
                }
                
                customerTableBody.innerHTML = '';
                filteredData.forEach(customer => {
                    renderCustomerRow(customer);
                });
            })
            .catch(error => {
                console.error('Lỗi khi lọc dữ liệu:', error);
                alert('Không thể lọc dữ liệu. Vui lòng thử lại sau.');
            });
    });
    
    // Xóa bộ lọc
    btnClearFilter.addEventListener('click', function() {
        document.getElementById('filterType').value = '';
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterProject').value = '';
        document.getElementById('filterRegion').value = '';
        document.getElementById('searchName').value = '';
        loadCustomers();
    });
    
    // Cancel button
    btnCancel.addEventListener('click', function() {
        hideForm();
    });
    
    // Refresh button
    btnRefresh.addEventListener('click', loadCustomers);
    
    // Load customers on page load
    loadCustomers();
}); 