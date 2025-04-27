document.addEventListener('DOMContentLoaded', function() {

    let customerData = null;
    let customerTickets = [];
    const userEmail = localStorage.getItem('userEmail');
// Thêm biến debug
    const DEBUG = true; // Đặt thành false khi triển khai

// Hàm debug log
    function debugLog(...args) {
        if (DEBUG) {
            console.log(...args);
        }
    }

    fetch('/api/users/me')
        .then(response => {
            if (!response.ok) {
                throw new Error('Authentication required');
            }
            return response.json();
        })
        .then(user => {
            if (!user || !user.email) {
                throw new Error('User email not found');
            }
            // Store email and fetch customer profile
            localStorage.setItem('userEmail', user.email);
            document.getElementById('customerEmail').textContent = user.email;
            return fetchCustomerProfile(user.email);
        })
        .catch(error => {
            console.error('Auth error:', error);
            window.location.href = '/login.html';
        });


// Hệ thống kiểm tra API
    function testAPI() {
        debugLog('Kiểm tra các API endpoints...');

        // Kiểm tra API khách hàng
        fetch('/api')
            .then(response => {
                debugLog('API gốc:', response.status, response.ok ? 'OK' : 'Lỗi');
                return response.json();
            })
            .then(data => {
                debugLog('Các endpoints có sẵn:', data);
            })
            .catch(error => {
                console.error('Không thể truy cập API gốc:', error);
            });

        // Kiểm tra API khách hàng
        if (userEmail) {
            debugLog('Thử kiểm tra API khách hàng với email:', userEmail);
            fetch(`/api/customer-info/search/findByEmail?email=${encodeURIComponent(userEmail)}`)
                .then(response => {
                    debugLog('API khách hàng (findByEmail):', response.status, response.ok ? 'OK' : 'Lỗi');
                    if (response.ok) return response.json();
                    return response.text().then(text => {
                        throw new Error(`Lỗi ${response.status}: ${text}`);
                    });
                })
                .then(data => {
                    debugLog('Dữ liệu khách hàng:', data);
                })
                .catch(error => {
                    console.error('Lỗi API khách hàng:', error);
                });
        }
    }

// Initialize notifications
    let notifications = [];
    let lastSeenTicketStatuses = {}; // To track status changes
    let oldTicketStatuses = {}; // To track status changes for UI updates

    document.addEventListener('DOMContentLoaded', function () {
        console.log('Trang đã tải xong, bắt đầu khởi tạo dữ liệu...');

        // Kiểm tra API endpoints
        testAPI();

        // Hiển thị email người dùng
        if (userEmail) {
            document.getElementById('customerEmail').textContent = userEmail;

            // Lấy thông tin khách hàng ngay khi trang tải
            fetchCustomerProfile()
                .then(data => {
                    console.log('Đã tải thông tin khách hàng thành công');
                    if (data && data.name) {
                        document.getElementById('customerName').textContent = data.name;
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi tải thông tin khách hàng:', error);
                });
        } else {
            // Nếu không có thông tin đăng nhập, chuyển hướng về trang đăng nhập
            console.log('Không tìm thấy thông tin đăng nhập, chuyển về trang login');
            window.location.href = '/login.html';
        }

        // Xử lý đăng xuất
        document.querySelector('a[href="login.html"]').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userEmail');
            window.location.href = '/login.html';
        });

        // Xử lý form cập nhật thông tin cá nhân
        document.getElementById('profile-form').addEventListener('submit', function (e) {
            e.preventDefault();
            updateCustomerProfile();
        });

        // Xử lý form gửi yêu cầu hỗ trợ
        document.getElementById('support-form').addEventListener('submit', function (e) {
            e.preventDefault();
            submitSupportRequest();
        });

        // Check for new notifications every minute
        setInterval(checkForNewStatusChanges, 60000);

        // Thêm chức năng debug
        if (DEBUG) {
            // Chức năng debug chỉ hiển thị trong console, không hiển thị trên giao diện
            console.log('Debug mode is enabled. Check console for logs.');
        }

        // Load saved notifications
        loadNotifications();
    });

// Hàm hiển thị tab
    function showTab(tabName) {
        // Ẩn tất cả các tab content
        document.querySelectorAll('.tab-pane').forEach(tab => {
            tab.classList.remove('show', 'active');
        });

        // Bỏ active tất cả các tab
        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.classList.remove('active');
        });

        // Hiển thị tab được chọn
        document.getElementById(`${tabName}-content`).classList.add('show', 'active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Xử lý riêng cho từng tab
        if ((tabName === 'profile' || tabName === 'support') && !customerData) {
            fetchCustomerProfile();
        } else if (tabName === 'tickets') {
            fetchCustomerTickets();
        }
    }

// Lấy thông tin khách hàng
    function fetchCustomerProfile() {
        document.getElementById('profile-loading').style.display = 'block';
        document.getElementById('profile-form').style.display = 'none';
        document.getElementById('profile-error').style.display = 'none';

        console.log('Đang lấy thông tin khách hàng cho email:', userEmail);

        if (!userEmail) {
            document.getElementById('profile-error').textContent = 'Không tìm thấy email đăng nhập';
            document.getElementById('profile-error').style.display = 'block';
            document.getElementById('profile-loading').style.display = 'none';
            return Promise.reject(new Error('Không tìm thấy email đăng nhập'));
        }

        // Phải sử dụng endpoint API đúng theo backend: /api/customer-info/search/email
        return fetch(`/api/customer-info/search/email?email=${encodeURIComponent(userEmail)}`)
            .then(response => {
                console.log('Phản hồi API profile:', response.status);
                if (!response.ok) {
                    throw new Error('Không thể lấy thông tin khách hàng');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dữ liệu khách hàng:', data);
                // Dữ liệu được trả về là mảng trực tiếp từ API endpoint search/email
                if (data && Array.isArray(data) && data.length > 0) {
                    customerData = data[0];
                    displayCustomerProfile();
                    document.getElementById('profile-loading').style.display = 'none';
                    return customerData;
                } else {
                    throw new Error('Không tìm thấy thông tin khách hàng');
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy thông tin khách hàng:', error);
                document.getElementById('profile-error').textContent = error.message;
                document.getElementById('profile-error').style.display = 'block';
                document.getElementById('profile-loading').style.display = 'none';
                return Promise.reject(error);
            });
    }

// Hiển thị thông tin khách hàng
    function displayCustomerProfile() {
        if (customerData) {
            document.getElementById('name').value = customerData.name || '';
            document.getElementById('email').value = customerData.email || '';
            document.getElementById('phone').value = customerData.phone || '';
            document.getElementById('address').value = customerData.address || '';
            document.getElementById('type').value = customerData.type || 'Khách hàng thường';

            document.getElementById('profile-form').style.display = 'block';
        }
    }

// Cập nhật thông tin khách hàng
    function updateCustomerProfile() {
        if (!customerData) return;

        const updatedData = {
            ...customerData,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        fetch(`/api/customer-info/${customerData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể cập nhật thông tin');
                }
                return response.json();
            })
            .then(data => {
                customerData = data;
                alert('Cập nhật thông tin thành công!');
            })
            .catch(error => {
                alert('Lỗi: ' + error.message);
            });
    }

// Lấy danh sách yêu cầu hỗ trợ của khách hàng
    function fetchCustomerTickets() {
        if (!customerData || !customerData.id) {
            // Nếu chưa có thông tin khách hàng, cần lấy trước
            fetchCustomerProfile().then(() => {
                if (customerData && customerData.id) fetchCustomerTickets();
            }).catch(() => {
                document.getElementById('tickets-error').textContent = 'Không thể lấy thông tin khách hàng';
                document.getElementById('tickets-error').style.display = 'block';
                document.getElementById('tickets-loading').style.display = 'none';
            });
            return;
        }

        document.getElementById('tickets-loading').style.display = 'block';
        document.getElementById('tickets-container').style.display = 'none';
        document.getElementById('tickets-error').style.display = 'none';
        document.getElementById('tickets-empty').style.display = 'none';

        console.log('Đang lấy danh sách yêu cầu hỗ trợ cho khách hàng ID:', customerData.id);

        // Sử dụng đúng endpoint API: /api/customer-care/search/customer-id
        fetch(`/api/customer-care/search/customer-id?customerId=${customerData.id}`)
            .then(response => {
                console.log('Phản hồi API tickets:', response.status);
                if (response.status === 404) {
                    // Không có yêu cầu nào
                    return [];
                }
                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách yêu cầu');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dữ liệu yêu cầu hỗ trợ:', data);
                // Dữ liệu có thể là mảng trực tiếp từ API endpoint
                customerTickets = Array.isArray(data) ? data : [];

                // Check for status changes and add notifications
                checkTicketStatusChanges(customerTickets || [], customerTickets);

                if (customerTickets.length === 0) {
                    document.getElementById('tickets-empty').style.display = 'block';
                } else {
                    displayTickets();
                    document.getElementById('tickets-container').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách yêu cầu:', error);
                document.getElementById('tickets-error').textContent = error.message;
                document.getElementById('tickets-error').style.display = 'block';
            })
            .finally(() => {
                document.getElementById('tickets-loading').style.display = 'none';
            });
    }

// Check for ticket status changes
    function checkTicketStatusChanges(oldTickets, newTickets) {
        if (!newTickets || !Array.isArray(newTickets)) return;

        newTickets.forEach(newTicket => {
            // Skip if ticket is invalid
            if (!newTicket || !newTicket.id) return;

            // Find matching old ticket
            const oldTicket = oldTickets && Array.isArray(oldTickets) ?
                oldTickets.find(t => t && t.id === newTicket.id) : null;

            // Check if we've seen this ticket before
            const lastSeenStatus = lastSeenTicketStatuses[newTicket.id];

            // Status change notification
            if (oldTicket && oldTicket.status !== newTicket.status) {
                // Status has changed
                const statusMessage = getStatusChangeMessage(oldTicket.status, newTicket.status);
                addNotification(
                    newTicket,
                    `Yêu cầu "${newTicket.subject || 'Không có tiêu đề'}" ${statusMessage}`,
                    'status-change'
                );
            } else if (lastSeenStatus && lastSeenStatus !== newTicket.status) {
                // Status changed since last time we saved status
                const statusMessage = getStatusChangeMessage(lastSeenStatus, newTicket.status);
                addNotification(
                    newTicket,
                    `Yêu cầu "${newTicket.subject || 'Không có tiêu đề'}" ${statusMessage}`,
                    'status-change'
                );
            }

            // Resolution change notification (for admin response)
            if (oldTicket && newTicket.resolution &&
                (!oldTicket.resolution || oldTicket.resolution !== newTicket.resolution)) {
                addNotification(
                    newTicket,
                    `Yêu cầu "${newTicket.subject || 'Không có tiêu đề'}" đã có phản hồi mới`,
                    'resolution'
                );
            }

            // Update last seen status
            lastSeenTicketStatuses[newTicket.id] = newTicket.status;
        });

        // Save updated status
        try {
            localStorage.setItem('lastSeenTicketStatuses', JSON.stringify(lastSeenTicketStatuses));
        } catch (e) {
            console.error('Failed to save status to localStorage:', e);
        }
    }

// Display tickets with status change indicators
    function displayTickets() {
        const tableBody = document.getElementById('tickets-table-body');
        tableBody.innerHTML = '';

        customerTickets.forEach(ticket => {
            const row = document.createElement('tr');

            // Check if status has recently changed
            const oldStatus = oldTicketStatuses && oldTicketStatuses[ticket.id];
            const statusChanged = oldStatus && oldStatus !== ticket.status;

            // Định dạng trạng thái
            let statusClass = 'bg-secondary';
            if (ticket.status === 'IN_PROGRESS') statusClass = 'bg-primary';
            else if (ticket.status === 'RESOLVED') statusClass = 'bg-success';
            else if (ticket.status === 'CLOSED') statusClass = 'bg-dark';
            else if (ticket.status === 'NEW') statusClass = 'bg-info';

            // Định dạng ngày
            const createdDate = ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('vi-VN') : 'N/A';

            // Add status update animation if changed
            const statusSpan = `<span class="badge ${statusClass} status-badge ${statusChanged ? 'status-update' : ''}">${formatStatus(ticket.status)}</span>`;

            // Add notification dot if there's a new response
            const resolvedAndResponse = ticket.status === 'RESOLVED' && ticket.resolution;
            const hasNewResponse = resolvedAndResponse && (!oldTicketStatuses || oldTicketStatuses[ticket.id] !== 'RESOLVED');

            row.innerHTML = `
                    <td>${ticket.id.substring(0, 8)}...</td>
                    <td>${ticket.subject || 'Không có tiêu đề'}</td>
                    <td>${ticket.issue || 'N/A'}</td>
                    <td>${statusSpan}</td>
                    <td>${createdDate}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary position-relative" onclick="viewTicketDetails('${ticket.id}')">
                            <i class="fas fa-eye"></i> Xem
                            ${hasNewResponse ? '<span class="badge-dot"></span>' : ''}
                        </button>
                    </td>
                `;
            tableBody.appendChild(row);
        });

        // Save current statuses for future comparison
        oldTicketStatuses = {};
        customerTickets.forEach(ticket => {
            oldTicketStatuses[ticket.id] = ticket.status;
        });
    }

// Xem chi tiết yêu cầu hỗ trợ - enhanced to show admin response better
    function viewTicketDetails(ticketId) {
        try {
            // Tìm yêu cầu theo ID
            const ticket = customerTickets.find(t => t && t.id === ticketId);
            if (!ticket) return;

            // Get elements - with null checks
            const subjectEl = document.getElementById('ticket-subject');
            const issueEl = document.getElementById('ticket-issue');
            const priorityEl = document.getElementById('ticket-priority');
            const descriptionEl = document.getElementById('ticket-description');
            const createdEl = document.getElementById('ticket-created');
            const updatedEl = document.getElementById('ticket-updated');
            const statusBadge = document.getElementById('ticket-status-badge');
            const resolutionCard = document.getElementById('resolution-card');
            const resolutionEl = document.getElementById('ticket-resolution');

            // Ensure we have all the elements we need
            if (!subjectEl || !statusBadge || !resolutionCard) {
                console.error('Missing required elements for ticket details');
                return;
            }

            // Cập nhật nội dung modal
            if (subjectEl) subjectEl.textContent = ticket.subject || 'Không có tiêu đề';
            if (issueEl) issueEl.textContent = ticket.issue || 'N/A';
            if (priorityEl) priorityEl.textContent = formatPriority(ticket.priority) || 'N/A';
            if (descriptionEl) descriptionEl.textContent = ticket.description || 'Không có mô tả';

            // Format dates
            const createdDate = ticket.createdAt ? new Date(ticket.createdAt).toLocaleString('vi-VN') : 'N/A';
            const updatedDate = ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString('vi-VN') : 'N/A';
            if (createdEl) createdEl.textContent = createdDate;
            if (updatedEl) updatedEl.textContent = updatedDate;

            // Status badge with icon
            if (statusBadge) {
                let statusIcon = '';
                if (ticket.status === 'NEW') statusIcon = '<i class="fas fa-bell"></i> ';
                else if (ticket.status === 'IN_PROGRESS') statusIcon = '<i class="fas fa-spinner fa-spin"></i> ';
                else if (ticket.status === 'RESOLVED') statusIcon = '<i class="fas fa-check-circle"></i> ';
                else if (ticket.status === 'CLOSED') statusIcon = '<i class="fas fa-lock"></i> ';

                statusBadge.innerHTML = statusIcon + formatStatus(ticket.status);
                statusBadge.className = 'badge ' + getStatusBadgeClass(ticket.status);
            }

            // Resolution with clear formatting
            if (resolutionCard && resolutionEl) {
                if (ticket.resolution && ticket.resolution.trim()) {
                    resolutionEl.textContent = ticket.resolution;
                    resolutionCard.style.display = 'block';
                } else {
                    resolutionCard.style.display = 'none';
                }
            }

            // Show modal - with null check
            const modalElement = document.getElementById('ticketDetailsModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }

            // Mark all related notifications as read
            markTicketAsViewed(ticket);

        } catch (err) {
            console.error('Error displaying ticket details:', err);
        }
    }

// Mark a ticket as viewed to clear notifications
    function markTicketAsViewed(ticket) {
        // Mark any related notifications as read
        notifications.forEach(notification => {
            if (notification.ticketId === ticket.id && !notification.read) {
                notification.read = true;
            }
        });

        // Save updated notifications
        localStorage.setItem('ticketNotifications', JSON.stringify(notifications));
        updateNotificationBadge();
        renderNotifications();
    }

// Load notifications from localStorage
    function loadNotifications() {
        const savedNotifications = localStorage.getItem('ticketNotifications');
        if (savedNotifications) {
            notifications = JSON.parse(savedNotifications);
            updateNotificationBadge();
            renderNotifications();
        }

        // Load last seen statuses
        const savedStatuses = localStorage.getItem('lastSeenTicketStatuses');
        if (savedStatuses) {
            lastSeenTicketStatuses = JSON.parse(savedStatuses);
        }
    }

// Add a new notification
    function addNotification(ticket, message, specificType = 'status-change') {
        if (!ticket || !ticket.id) return; // Guard against invalid tickets

        // Get status icon based on the ticket status
        let statusIcon = '';
        if (ticket.status === 'NEW') {
            statusIcon = '<i class="fas fa-bell status-icon status-new"></i>';
        } else if (ticket.status === 'IN_PROGRESS') {
            statusIcon = '<i class="fas fa-spinner fa-spin status-icon status-in-progress"></i>';
        } else if (ticket.status === 'RESOLVED') {
            statusIcon = '<i class="fas fa-check-circle status-icon status-resolved"></i>';
        } else if (ticket.status === 'CLOSED') {
            statusIcon = '<i class="fas fa-lock status-icon status-closed"></i>';
        } else {
            statusIcon = '<i class="fas fa-info-circle status-icon"></i>';
        }

        const notification = {
            id: Date.now(),
            ticketId: ticket.id,
            message: message,
            statusIcon: statusIcon,
            type: specificType,
            status: ticket.status,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Check if we already have a notification for this ticket and status
        const existingIndex = notifications.findIndex(n =>
            n.ticketId === ticket.id &&
            n.status === ticket.status &&
            n.type === specificType &&
            !n.read
        );

        if (existingIndex !== -1) {
            // Update existing notification instead of creating a new one
            notifications[existingIndex].timestamp = notification.timestamp;
            notifications[existingIndex].message = notification.message;
        } else {
            // Add new notification
            notifications.unshift(notification); // Add to beginning
        }

        // Keep only the latest 20 notifications
        if (notifications.length > 20) {
            notifications = notifications.slice(0, 20);
        }

        // Save to localStorage
        try {
            localStorage.setItem('ticketNotifications', JSON.stringify(notifications));
        } catch (e) {
            console.error('Failed to save notifications to localStorage:', e);
        }

        // Update UI
        updateNotificationBadge();
        renderNotifications();

        // Show alert if the user is looking at tickets tab
        const activePane = document.querySelector('.tab-pane.active');
        if (activePane && activePane.id === 'tickets-content') {
            showAlert(`${statusIcon} <strong>Thông báo:</strong> ${message}`, 'info');
        }
    }

// Update notification badge count
    function updateNotificationBadge() {
        // Sử dụng notificationDot thay vì badge
        const notificationDot = document.getElementById('notificationDot');

        if (!notificationDot) {
            console.warn('Phần tử notificationDot không tồn tại trong DOM');
            return;
        }

        const hasUnread = notifications.some(n => !n.read);
        notificationDot.style.display = hasUnread ? 'inline-block' : 'none';
    }

// Render notifications in dropdown
    function renderNotifications() {
        const panel = document.getElementById('notificationsContainer');
        const notificationDot = document.getElementById('notificationDot');

        if (!panel) {
            console.warn('Phần tử notificationsContainer không tồn tại trong DOM');
            return;
        }

        // Cập nhật nút thông báo nhỏ (dot)
        if (notificationDot) {
            const hasUnread = notifications.some(n => !n.read);
            notificationDot.style.display = hasUnread ? 'inline-block' : 'none';
        }

        if (!notifications || notifications.length === 0) {
            panel.innerHTML = '<div class="dropdown-item text-center text-muted py-2">Không có thông báo mới</div>';
            return;
        }

        panel.innerHTML = '';

        // Sắp xếp thông báo theo thời gian, mới nhất lên đầu
        const sortedNotifications = [...notifications].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Hiển thị tối đa 5 thông báo gần nhất
        const recentNotifications = sortedNotifications.slice(0, 5);

        recentNotifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = 'dropdown-item notification-item' + (notification.read ? '' : ' unread');

            const date = new Date(notification.timestamp);

            item.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <p class="mb-1">${notification.statusIcon || ''} ${notification.message}</p>
                            <p class="notification-time mb-0">${date.toLocaleString('vi-VN')}</p>
                        </div>
                        ${!notification.read ? '<span class="badge-dot"></span>' : ''}
                    </div>
                `;

            item.addEventListener('click', () => {
                markNotificationAsRead(notification.id);
                if (notification.ticketId) {
                    // Hiển thị chi tiết ticket
                    const ticket = customerTickets.find(t => t && t.id === notification.ticketId);
                    if (ticket) viewTicketDetails(ticket.id);
                }
            });

            panel.appendChild(item);
        });
    }

// Mark a notification as read
    function markNotificationAsRead(id) {
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications[index].read = true;
            localStorage.setItem('ticketNotifications', JSON.stringify(notifications));
            updateNotificationBadge();
            renderNotifications();
        }
    }

// Mark all notifications as read
    function clearAllNotifications() {
        notifications.forEach(notification => {
            notification.read = true;
        });

        localStorage.setItem('ticketNotifications', JSON.stringify(notifications));
        updateNotificationBadge();
        renderNotifications();
    }

// Check for status changes when loading tickets
    function checkForNewStatusChanges() {
        if (customerData) {
            fetchCustomerTickets();
        }
    }

// Format status display
    function formatStatus(status) {
        if (!status) return "Mới";

        switch (status) {
            case "NEW":
                return "Mới";
            case "IN_PROGRESS":
                return "Đang xử lý";
            case "RESOLVED":
                return "Đã giải quyết";
            case "CLOSED":
                return "Đã đóng";
            default:
                return status;
        }
    }

// Get CSS class for status badge
    function getStatusBadgeClass(status) {
        if (!status) return "bg-secondary";

        switch (status) {
            case "NEW":
                return "bg-info";
            case "IN_PROGRESS":
                return "bg-primary";
            case "RESOLVED":
                return "bg-success";
            case "CLOSED":
                return "bg-dark";
            default:
                return "bg-secondary";
        }
    }

// Gửi yêu cầu hỗ trợ mới
    function submitSupportRequest() {
        // Kiểm tra dữ liệu đầu vào
        const subject = document.getElementById('subject').value.trim();
        const issueType = document.getElementById('issue-type').value;
        const description = document.getElementById('description').value.trim();
        const priority = document.getElementById('priority').value;

        if (!subject || !issueType || !description || !priority) {
            alert('Vui lòng điền đầy đủ thông tin yêu cầu');
            return;
        }

        // Show loading indicator
        const submitBtn = document.querySelector('#support-form button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';

        // Nếu chưa có thông tin khách hàng, lấy lại từ server
        const getCustomerDataAndSubmit = () => {
            if (!customerData || !customerData.id) {
                console.log('Đang lấy thông tin khách hàng trước khi gửi yêu cầu...');
                fetchCustomerProfile()
                    .then(data => {
                        if (data && data.id) {
                            console.log('Đã lấy được thông tin khách hàng, tiếp tục gửi yêu cầu');
                            processSubmitRequest();
                        } else {
                            throw new Error('Không thể lấy thông tin khách hàng');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi lấy thông tin khách hàng:', error);
                        alert('Không thể lấy thông tin khách hàng. Vui lòng thử lại sau.');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    });
            } else {
                processSubmitRequest();
            }
        };

        // Xử lý gửi yêu cầu sau khi có thông tin khách hàng
        const processSubmitRequest = () => {
            // Map to backend values
            const priorityMapping = {
                'Thấp': 'LOW',
                'Trung bình': 'MEDIUM',
                'Cao': 'HIGH',
                'Khẩn cấp': 'HIGH'  // Trong backend là HIGH chứ không phải URGENT
            };

            const supportRequest = {
                customerId: customerData.id,
                customerEmail: customerData.email,
                customerName: customerData.name,
                customerPhone: customerData.phone,
                subject: subject,
                issue: issueType,
                description: description,
                priority: priorityMapping[priority] || 'MEDIUM',
                status: 'NEW' // Always set to NEW for new requests from customers
            };

            // Log yêu cầu để debug
            console.log('Đang gửi yêu cầu:', supportRequest);

            fetch('/api/customer-care', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(supportRequest)
            })
                .then(response => {
                    console.log('Phản hồi status:', response.status);
                    if (!response.ok) {
                        return response.text().then(text => {
                            console.error('Lỗi từ server:', text);
                            throw new Error('Không thể gửi yêu cầu. Mã lỗi: ' + response.status);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dữ liệu phản hồi:', data);
                    alert('Yêu cầu hỗ trợ đã được gửi thành công!');
                    document.getElementById('support-form').reset();
                    // Cập nhật danh sách yêu cầu và chuyển đến tab tickets
                    fetchCustomerTickets();
                    showTab('tickets');
                })
                .catch(error => {
                    console.error('Lỗi khi gửi yêu cầu:', error);
                    alert('Lỗi: ' + error.message);
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        };

        // Bắt đầu quá trình
        getCustomerDataAndSubmit();
    }

// Show alert message with added null checks
    function showAlert(message, type = 'success') {
        const container = document.querySelector('.container');
        if (!container) {
            console.warn('Không tìm thấy container để hiển thị alert');
            return; // Guard clause if container doesn't exist
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

        container.insertBefore(alertDiv, container.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv && alertDiv.classList) {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    if (alertDiv && alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 150);
            }
        }, 5000);
    }

// Format priority display
    function formatPriority(priority) {
        if (!priority) return "Trung bình";

        switch (priority) {
            case "LOW":
                return "Thấp";
            case "MEDIUM":
                return "Trung bình";
            case "HIGH":
                return "Cao";
            default:
                return priority;
        }
    }

// Get appropriate message for status changes
    function getStatusChangeMessage(oldStatus, newStatus) {
        if (!oldStatus || !newStatus) return "đã được cập nhật trạng thái";

        if (!oldStatus || oldStatus === 'NEW') {
            if (newStatus === 'IN_PROGRESS') {
                return 'đã được tiếp nhận và đang được xử lý';
            } else if (newStatus === 'RESOLVED') {
                return 'đã được giải quyết';
            } else if (newStatus === 'CLOSED') {
                return 'đã được đóng';
            }
        } else if (oldStatus === 'IN_PROGRESS') {
            if (newStatus === 'RESOLVED') {
                return 'đã được xử lý xong';
            } else if (newStatus === 'CLOSED') {
                return 'đã được đóng sau khi xử lý';
            }
        } else if (oldStatus === 'RESOLVED') {
            if (newStatus === 'CLOSED') {
                return 'đã được đóng lại';
            } else if (newStatus === 'IN_PROGRESS') {
                return 'đang được xem xét lại';
            }
        }

        return `đã được cập nhật trạng thái thành <strong>${formatStatus(newStatus)}</strong>`;
    }

// Hàm chạy kiểm tra API - Đã được ẩn khỏi giao diện người dùng
    function runApiTests() {
        console.log('API tests are disabled in production mode');
    }

// Hàm kiểm tra API GET - Chỉ dùng cho debug, không hiển thị trên UI
    function testApi(url) {
        console.log('Testing API is disabled in production mode');
        return Promise.resolve({
            name: `GET ${url}`,
            success: false,
            error: 'Testing disabled'
        });
    }

// Hàm kiểm tra API POST - Chỉ dùng cho debug, không hiển thị trên UI
    function testApiPost(url, data) {
        console.log('Testing API is disabled in production mode');
        return Promise.resolve({
            name: `POST ${url}`,
            success: false,
            error: 'Testing disabled'
        });
    }
});