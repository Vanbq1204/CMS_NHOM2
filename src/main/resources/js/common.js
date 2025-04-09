document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggleButton = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });
    }
    
    // Set active link in sidebar based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove all active classes first
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set active class based on current page
    if (currentPage === '' || currentPage === 'index.html') {
        document.getElementById('customer-management-link').classList.add('active');
        document.getElementById('page-title').textContent = 'Quản lý khách hàng';
    } else if (currentPage === 'email-marketing.html') {
        document.getElementById('email-marketing-link').classList.add('active');
        document.getElementById('page-title').textContent = 'Email Marketing';
    } else if (currentPage === 'customer-care.html') {
        document.getElementById('customer-care-link').classList.add('active');
        document.getElementById('page-title').textContent = 'Chăm sóc khách hàng';
    } else if (currentPage === 'service-management.html') {
        document.getElementById('service-management-link').classList.add('active');
        document.getElementById('page-title').textContent = 'Quản lý hạng mục dịch vụ';
    }
    
    // Logout handler
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                // Redirect to login page or perform logout action
                window.location.href = 'login.html';
            }
        });
    }
}); 