document.addEventListener('DOMContentLoaded', function() {
    // Xử lý tab
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Xử lý nút trong form tạo chiến dịch
    const saveDraftBtn = document.getElementById('save-draft');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            const campaignName = document.getElementById('campaign-name').value || 'Chiến dịch chưa đặt tên';
            alert(`Đã lưu bản nháp: ${campaignName}`);
        });
    }
    
    const sendTestBtn = document.getElementById('send-test');
    if (sendTestBtn) {
        sendTestBtn.addEventListener('click', function() {
            const emailContent = document.getElementById('email-content').value;
            if (!emailContent) {
                alert('Vui lòng nhập nội dung email trước khi gửi thử nghiệm');
                return;
            }
            alert('Đã gửi email thử nghiệm');
        });
    }
    
    const scheduleCampaignBtn = document.getElementById('schedule-campaign');
    if (scheduleCampaignBtn) {
        scheduleCampaignBtn.addEventListener('click', function() {
            const schedule = document.getElementById('campaign-schedule').value;
            if (!schedule) {
                alert('Vui lòng chọn thời gian gửi');
                return;
            }
            
            const campaignName = document.getElementById('campaign-name').value || 'Chiến dịch chưa đặt tên';
            alert(`Đã lên lịch gửi chiến dịch "${campaignName}" vào ${schedule}`);
        });
    }
    
    const sendNowBtn = document.getElementById('send-now');
    if (sendNowBtn) {
        sendNowBtn.addEventListener('click', function() {
            const audienceGroup = document.getElementById('audience-group').value;
            if (!audienceGroup) {
                alert('Vui lòng chọn nhóm đối tượng trước khi gửi');
                return;
            }
            
            if (confirm('Bạn có chắc chắn muốn gửi chiến dịch ngay bây giờ?')) {
                alert('Đã gửi chiến dịch');
            }
        });
    }
    
    // Xử lý nút trong phần Danh sách email
    const viewButtons = document.querySelectorAll('#email-lists .view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const listName = row.querySelector('td:nth-child(2)').textContent;
            alert(`Xem danh sách: ${listName}`);
        });
    });
    
    const editButtons = document.querySelectorAll('#email-lists .edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const listName = row.querySelector('td:nth-child(2)').textContent;
            alert(`Chỉnh sửa danh sách: ${listName}`);
        });
    });
    
    const deleteButtons = document.querySelectorAll('#email-lists .delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const listName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Bạn có chắc chắn muốn xóa danh sách "${listName}"?`)) {
                alert(`Đã xóa danh sách: ${listName}`);
            }
        });
    });
    
    // Xử lý nút trong phần Thống kê chiến dịch
    const campaignViewButtons = document.querySelectorAll('#campaign-stats .view');
    campaignViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const campaignName = row.querySelector('td:nth-child(2)').textContent;
            alert(`Xem chi tiết chiến dịch: ${campaignName}`);
        });
    });
    
    const campaignCopyButtons = document.querySelectorAll('#campaign-stats .copy');
    campaignCopyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const campaignName = row.querySelector('td:nth-child(2)').textContent;
            alert(`Sao chép chiến dịch: ${campaignName}`);
        });
    });
    
    const campaignEditButtons = document.querySelectorAll('#campaign-stats .edit');
    campaignEditButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const campaignName = row.querySelector('td:nth-child(2)').textContent;
            alert(`Chỉnh sửa chiến dịch: ${campaignName}`);
        });
    });
    
    const campaignDeleteButtons = document.querySelectorAll('#campaign-stats .delete');
    campaignDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const campaignName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Bạn có chắc chắn muốn xóa chiến dịch "${campaignName}"?`)) {
                alert(`Đã xóa chiến dịch: ${campaignName}`);
            }
        });
    });
}); 