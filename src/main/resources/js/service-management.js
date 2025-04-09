document.addEventListener('DOMContentLoaded', function() {
    // Xử lý thêm dịch vụ mới
    const addServiceBtn = document.getElementById('add-service');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            const serviceName = document.getElementById('service-name').value;
            const serviceDescription = document.getElementById('service-description').value;
            const serviceType = document.getElementById('service-type').value;
            const servicePrice = document.getElementById('service-price').value;
            
            if (!serviceName) {
                alert('Vui lòng nhập tên dịch vụ');
                return;
            }
            
            if (!serviceType) {
                alert('Vui lòng chọn loại dịch vụ');
                return;
            }
            
            if (!servicePrice) {
                alert('Vui lòng nhập chi phí dịch vụ');
                return;
            }
            
            // Thông báo thành công
            alert(`Đã thêm dịch vụ: ${serviceName}`);
            
            // Xóa dữ liệu form
            document.getElementById('service-name').value = '';
            document.getElementById('service-description').value = '';
            document.getElementById('service-type').value = '';
            document.getElementById('service-price').value = '';
        });
    }
    
    // Xử lý chỉnh sửa dịch vụ
    const editButtons = document.querySelectorAll('.edit-service');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;
            const description = row.querySelector('td:nth-child(3)').textContent;
            const type = row.querySelector('td:nth-child(4)').textContent;
            
            // Hiển thị modal chỉnh sửa
            const typeValue = type === 'Một lần' ? 'once' : 'monthly';
            const priceField = type === 'Một lần' ? 'td:nth-child(5)' : 'td:nth-child(6)';
            const price = row.querySelector(priceField).textContent;
            
            const editFormHTML = `
                <div class="modal-form">
                    <h2>Chỉnh sửa dịch vụ</h2>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-service-name">Tên dịch vụ</label>
                            <input type="text" id="edit-service-name" value="${name}">
                        </div>
                        <div class="form-group">
                            <label for="edit-service-description">Mô tả</label>
                            <input type="text" id="edit-service-description" value="${description}">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-service-type">Loại dịch vụ</label>
                            <select id="edit-service-type">
                                <option value="once" ${typeValue === 'once' ? 'selected' : ''}>Chi phí một lần</option>
                                <option value="monthly" ${typeValue === 'monthly' ? 'selected' : ''}>Theo tháng</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-service-price">Chi phí (VNĐ)</label>
                            <input type="text" id="edit-service-price" value="${price.replace('-', '')}">
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn-primary" id="update-service">Cập nhật</button>
                        <button class="btn-secondary" id="cancel-edit">Hủy bỏ</button>
                    </div>
                </div>
            `;
            
            showModal(editFormHTML, function() {
                document.getElementById('update-service').addEventListener('click', function() {
                    const updatedName = document.getElementById('edit-service-name').value;
                    
                    if (!updatedName) {
                        alert('Vui lòng nhập tên dịch vụ');
                        return;
                    }
                    
                    alert(`Đã cập nhật dịch vụ: ${updatedName}`);
                    closeModal();
                });
                
                document.getElementById('cancel-edit').addEventListener('click', function() {
                    closeModal();
                });
            });
        });
    });
    
    // Xử lý xóa dịch vụ
    const deleteButtons = document.querySelectorAll('.delete-service');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}"?`)) {
                alert(`Đã xóa dịch vụ: ${name}`);
            }
        });
    });
    
    // Xử lý nút quay lại
    const backButton = document.querySelector('.page-btn');
    if (backButton) {
        backButton.addEventListener('click', function() {
            alert('Hiện tại không có trang nào để quay lại.');
        });
    }
    
    // Hàm hiển thị modal
    function showModal(content, callback) {
        // Tạo modal
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal';
        modalContainer.id = 'modal-container';
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                ${content}
            </div>
        `;
        
        // Thêm modal vào DOM
        document.body.appendChild(modalContainer);
        
        // Xử lý nút đóng
        const closeBtn = document.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        
        // Gọi callback nếu có
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
    
    // Hàm đóng modal
    function closeModal() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            modalContainer.remove();
        }
    }
}); 