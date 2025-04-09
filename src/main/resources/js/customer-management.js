document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for action buttons
    const addCustomerButton = document.querySelector('.add-customer');
    if (addCustomerButton) {
        addCustomerButton.addEventListener('click', function() {
            // Ẩn nút thêm khách hàng, bảng khách hàng và phần tìm kiếm/lọc
            this.style.display = 'none';
            document.querySelector('.customer-table').style.display = 'none';
            document.querySelector('.search-filter-container').style.display = 'none';
            
            // Lấy template từ HTML
            const template = document.getElementById('add-customer-template');
            const clone = template.content.cloneNode(true);
            
            // Thiết lập ngày liên hệ là ngày hôm nay
            const today = new Date().toISOString().split('T')[0];
            clone.querySelector('#contact-date').value = today;
            
            // Thêm form vào DOM
            const formContainer = document.createElement('div');
            formContainer.id = 'customer-form-container';
            formContainer.appendChild(clone);
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
    }
    
    // Xử lý nút Sửa thông tin khách hàng
    const editButtons = document.querySelectorAll('.edit');
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
            const status = row.querySelector('td:nth-child(11) span').textContent;
            
            // Ẩn bảng và container tìm kiếm
            document.querySelector('.customer-table').style.display = 'none';
            document.querySelector('.search-filter-container').style.display = 'none';
            document.querySelector('.add-customer').style.display = 'none';
            
            // Lấy template từ HTML
            const template = document.getElementById('edit-customer-template');
            const clone = template.content.cloneNode(true);
            
            // Cập nhật tên khách hàng trong tiêu đề
            clone.querySelector('#customer-name-title').textContent = name;
            
            // Điền dữ liệu vào form
            clone.querySelector('#edit-name').value = name || '';
            clone.querySelector('#edit-email').value = email || '';
            clone.querySelector('#edit-phone').value = phone || '';
            clone.querySelector('#edit-company').value = company || '';
            clone.querySelector('#edit-project-type').value = projectType || '';
            clone.querySelector('#edit-budget').value = budget || '';
            clone.querySelector('#edit-payment').value = payment || '';
            clone.querySelector('#edit-progress').value = progress ? progress.replace('%', '') : '0';
            clone.querySelector('#edit-deadline').value = deadline || '';
            clone.querySelector('#edit-id').value = id || '';
            
            // Thiết lập các select box dựa trên dữ liệu
            if (status) {
                const statusSelect = clone.querySelector('#edit-status');
                for (let i = 0; i < statusSelect.options.length; i++) {
                    if (statusSelect.options[i].text.toLowerCase() === status.toLowerCase()) {
                        statusSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Thêm form vào DOM
            const editContainer = document.createElement('div');
            editContainer.id = 'edit-customer-container';
            editContainer.appendChild(clone);
            document.querySelector('.content').appendChild(editContainer);
            
            // Xử lý sự kiện quay lại
            const backButtons = document.querySelectorAll('.back-button');
            backButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    document.getElementById('edit-customer-container').remove();
                    document.querySelector('.customer-table').style.display = 'block';
                    document.querySelector('.search-filter-container').style.display = 'block';
                    document.querySelector('.add-customer').style.display = 'flex';
                });
            });
            
            // Xử lý sự kiện submit form
            document.getElementById('edit-customer-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Thông báo và quay lại
                alert(`Đã cập nhật thông tin khách hàng: ${name}`);
                document.getElementById('edit-customer-container').remove();
                document.querySelector('.customer-table').style.display = 'block';
                document.querySelector('.search-filter-container').style.display = 'block';
                document.querySelector('.add-customer').style.display = 'flex';
            });
        });
    });

    // Xử lý nút Xóa khách hàng
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${name}?`)) {
                alert(`Đã xóa khách hàng: ${name}`);
            }
        });
    });

    // Xử lý nút In báo giá
    const printButtons = document.querySelectorAll('.print');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.querySelector('td:nth-child(2)').textContent;
            
            alert(`Đang tạo báo giá cho khách hàng: ${name}`);
        });
    });

    // Xử lý lọc và tìm kiếm
    const applyFilterBtn = document.querySelector('.apply-filters');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const filterType = document.getElementById('filter-type').value;
            const filterStatus = document.getElementById('filter-status').value;
            const filterProjectType = document.getElementById('filter-project-type').value;
            const filterRegion = document.getElementById('filter-region').value;
            
            alert('Đã áp dụng bộ lọc');
        });
    }

    const resetFilterBtn = document.querySelector('.reset-filters');
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            document.getElementById('filter-type').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-project-type').value = '';
            document.getElementById('filter-region').value = '';
            
            alert('Đã xóa bộ lọc');
        });
    }

    const searchBtn = document.querySelector('.search-button');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = document.querySelector('.search-input').value;
            
            if (searchTerm) {
                alert(`Đang tìm kiếm: ${searchTerm}`);
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm');
            }
        });
    }
}); 