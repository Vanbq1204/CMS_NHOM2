document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/users/me')
        .then(res => {
            if (!res.ok) {
                throw new Error('Unauthorized');
            }
            return res.json();
        })
        .then(user => {
            if (!user || !user.roles) {
                throw new Error('No user roles found');
            }

            // Check if user has required permissions
            const isAdmin = user.roles.includes('ADMIN');
            const hasAccess = isAdmin || user.roles.includes('ADMIN_EMAIL_MARKETING');

            if (!hasAccess) {
                throw new Error('Unauthorized');
            }

            // Show menu items based on roles
            if (isAdmin) {
                document.getElementById('menu-customer').style.display = 'block';
                document.getElementById('menu-email').style.display = 'block';
                document.getElementById('menu-care').style.display = 'block';
            } else if (user.roles.includes('ADMIN_EMAIL_MARKETING')) {
                document.getElementById('menu-email').style.display = 'block';
            }

            // Initialize the application only after permission check
            initializeApp();
        })
        .catch(err => {
            console.error('Permission check failed:', err);
            alert('Lỗi khi kiểm tra quyền. Vui lòng đăng nhập lại.');
            window.location.href = '/login.html';
        });

    function initializeApp() {
        // API URLs
        const CAMPAIGNS_API_URL = '/api/email-campaigns';
        const RECEIVER_GROUPS_API_URL = '/api/email/receiver-group';
        const CUSTOMERS_API_URL = '/api/customer-info';

        // DOM Elements - Common
        const sidebarCollapse = document.getElementById('sidebarCollapse');
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        // DOM Elements - Campaigns
        const campaignForm = document.getElementById('campaignForm');
        const campaignFormCard = document.getElementById('campaignFormCard');
        const campaignFormTitle = document.getElementById('campaignFormTitle');
        const campaignsTableBody = document.getElementById('campaignsTableBody');
        const btnNewCampaign = document.getElementById('btnNewCampaign');
        const btnCloseCampaignForm = document.getElementById('btnCloseCampaignForm');
        const btnSaveDraft = document.getElementById('btnSaveDraft');
        const btnSchedule = document.getElementById('btnSchedule');
        const btnSendNow = document.getElementById('btnSendNow');
        const btnSearchCampaign = document.getElementById('btnSearchCampaign');
        const btnApplyFilterCampaigns = document.getElementById('btnApplyFilterCampaigns');
        const btnClearFilterCampaigns = document.getElementById('btnClearFilterCampaigns');

        // DOM Elements - Groups
        const groupForm = document.getElementById('groupForm');
        const groupFormCard = document.getElementById('groupFormCard');
        const groupFormTitle = document.getElementById('groupFormTitle');
        const groupsTableBody = document.getElementById('groupsTableBody');
        const btnNewGroup = document.getElementById('btnNewGroup');
        const btnCloseGroupForm = document.getElementById('btnCloseGroupForm');
        const btnSearchCustomers = document.getElementById('btnSearchCustomers');
        const customerSelectionList = document.getElementById('customerSelectionList');
        const autoSegmented = document.getElementById('autoSegmented');
        const manualCustomerSelection = document.getElementById('manualCustomerSelection');

        // Initialize rich text editor for email content
        $('#campaignContent').summernote({
            height: 300,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            placeholder: 'Viết nội dung email tại đây...'
        });

        // Toggle sidebar
        sidebarCollapse.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            content.classList.toggle('active');
        });

        // Hide/Show Auto Segmentation
        autoSegmented.addEventListener('change', function () {
            if (this.checked) {
                manualCustomerSelection.style.display = 'none';
            } else {
                manualCustomerSelection.style.display = 'block';
            }
        });

        // CAMPAIGNS FUNCTIONALITY //

        // Show New Campaign Form
        btnNewCampaign.addEventListener('click', function () {
            resetCampaignForm();
            showCampaignForm();
        });

        // Hide Campaign Form
        btnCloseCampaignForm.addEventListener('click', hideCampaignForm);

        // Save Draft Button
        btnSaveDraft.addEventListener('click', function () {
            const campaignId = document.getElementById('campaignId').value;
            const campaignData = getCampaignFormData();

            if (campaignId) {
                updateCampaign(campaignId, campaignData, 'Draft');
            } else {
                campaignData.status = 'Draft';
                createCampaign(campaignData);
            }
        });

        // Schedule Campaign Button
        btnSchedule.addEventListener('click', function () {
            const campaignId = document.getElementById('campaignId').value;
            const scheduledAt = document.getElementById('scheduledAt').value;

            if (!scheduledAt) {
                alert('Vui lòng chọn thời gian lên lịch gửi');
                return;
            }

            const campaignData = getCampaignFormData();

            if (campaignId) {
                // Update existing campaign and schedule
                updateCampaign(campaignId, campaignData, 'Đã lên lịch', scheduledAt);
            } else {
                // Create new campaign and then schedule
                campaignData.status = 'Đã lên lịch';
                campaignData.scheduledAt = scheduledAt;
                createCampaign(campaignData);
            }
        });

        // Send Now Button
        btnSendNow.addEventListener('click', function () {
            const campaignId = document.getElementById('campaignId').value;

            if (campaignId) {
                // Send existing campaign
                sendCampaign(campaignId);
            } else {
                // Create new campaign then send
                const campaignData = getCampaignFormData();
                campaignData.status = 'Draft';

                fetch(CAMPAIGNS_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(campaignData)
                })
                    .then(response => response.json())
                    .then(data => {
                        sendCampaign(data.id);
                    })
                    .catch(error => {
                        console.error('Lỗi khi tạo chiến dịch:', error);
                        alert('Không thể tạo chiến dịch. Vui lòng thử lại sau.');
                    });
            }
        });

        // Get Campaign Form Data
        function getCampaignFormData() {
            return {
                title: document.getElementById('campaignTitle').value,
                content: $('#campaignContent').summernote('code'),
                receiverGroupId: document.getElementById('receiverGroupId').value || null,
                customerType: document.getElementById('customerType').value || null,
                createdAt: new Date().toISOString(),
                receivedCount: 0,
                openCount: 0,
                clickCount: 0,
                bouncedCount: 0
            };
        }

        // Show Campaign Form
        function showCampaignForm() {
            campaignFormCard.style.display = 'block';
            setTimeout(() => {
                campaignFormCard.classList.add('show');
            }, 10);
            window.scrollTo({
                top: campaignFormCard.offsetTop - 20,
                behavior: 'smooth'
            });
        }

        // Hide Campaign Form
        function hideCampaignForm() {
            campaignFormCard.classList.remove('show');
            setTimeout(() => {
                campaignFormCard.style.display = 'none';
            }, 300);
        }

        // Reset Campaign Form
        function resetCampaignForm() {
            document.getElementById('campaignId').value = '';
            document.getElementById('campaignTitle').value = '';
            $('#campaignContent').summernote('code', '');
            document.getElementById('receiverGroupId').value = '';
            document.getElementById('customerType').value = '';
            document.getElementById('scheduledAt').value = '';
            campaignFormTitle.textContent = 'Tạo Chiến Dịch Mới';
        }

        // Create Campaign
        function createCampaign(campaignData) {
            fetch(CAMPAIGNS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campaignData)
            })
                .then(response => response.json())
                .then(data => {
                    loadCampaigns();
                    hideCampaignForm();
                    alert('Đã tạo chiến dịch thành công!');
                })
                .catch(error => {
                    console.error('Lỗi khi tạo chiến dịch:', error);
                    alert('Không thể tạo chiến dịch. Vui lòng thử lại sau.');
                });
        }

        // Update Campaign
        function updateCampaign(id, campaignData, status, scheduledAt) {
            campaignData.status = status;

            fetch(`${CAMPAIGNS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campaignData)
            })
                .then(response => response.json())
                .then(data => {
                    if (scheduledAt) {
                        // Schedule the campaign
                        return fetch(`${CAMPAIGNS_API_URL}/${id}/schedule?scheduledAt=${encodeURIComponent(scheduledAt)}`, {
                            method: 'POST'
                        });
                    }
                    return data;
                })
                .then(() => {
                    loadCampaigns();
                    hideCampaignForm();
                    alert(`Đã ${status === 'Draft' ? 'lưu nháp' : 'lên lịch'} chiến dịch thành công!`);
                })
                .catch(error => {
                    console.error('Lỗi khi cập nhật chiến dịch:', error);
                    alert('Không thể cập nhật chiến dịch. Vui lòng thử lại sau.');
                });
        }

        // Send Campaign
        function sendCampaign(id) {
            // Lấy email người dùng từ localStorage hoặc session
            const userEmail = getUserEmail();

            if (!userEmail) {
                alert('Không thể xác định email người gửi. Vui lòng đăng nhập lại.');
                window.location.href = '/login.html';
                return;
            }

            // Hiển thị thông báo đang gửi
            alert('Đang gửi chiến dịch...');

            fetch(`${CAMPAIGNS_API_URL}/${id}/send?senderEmail=${encodeURIComponent(userEmail)}`, {
                method: 'POST'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    loadCampaigns();
                    hideCampaignForm();
                    alert(`Đã gửi chiến dịch thành công!\n\nĐã gửi: ${data.receivedCount || 0} email.\nThất bại: ${data.bouncedCount || 0} email.`);

                    if (data.receivedCount === 0 && data.bouncedCount === 0) {
                        alert('Lưu ý: Có thể bạn chưa cấu hình server email. Hãy kiểm tra file application.properties và cập nhật thông tin email của bạn.');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi gửi chiến dịch:', error);
                    alert('Không thể gửi chiến dịch. Vui lòng thử lại sau.\n\nLỗi: ' + error.message);
                });
        }

        // Lấy email người dùng đã đăng nhập
        function getUserEmail() {
            // Kiểm tra xem có thông tin người dùng trong localStorage không
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                return userEmail;
            }

            // Nếu không có trong localStorage, lấy từ API
            return getCurrentUserEmail();
        }

        // Lấy email người dùng hiện tại từ API
        function getCurrentUserEmail() {
            // Thực hiện API call để lấy thông tin người dùng hiện tại
            // Đây là mô phỏng, bạn cần thay thế bằng API thực tế
            return prompt('Nhập email của bạn để gửi chiến dịch:', '');
        }

        // Edit Campaign
        function editCampaign(id) {
            fetch(`${CAMPAIGNS_API_URL}/${id}`)
                .then(response => response.json())
                .then(campaign => {
                    document.getElementById('campaignId').value = campaign.id;
                    document.getElementById('campaignTitle').value = campaign.title;
                    $('#campaignContent').summernote('code', campaign.content);
                    document.getElementById('receiverGroupId').value = campaign.receiverGroupId || '';
                    document.getElementById('customerType').value = campaign.customerType || '';

                    if (campaign.scheduledAt) {
                        // Format date for datetime-local input
                        const scheduledDate = new Date(campaign.scheduledAt);
                        const formattedDate = scheduledDate.toISOString().slice(0, 16);
                        document.getElementById('scheduledAt').value = formattedDate;
                    } else {
                        document.getElementById('scheduledAt').value = '';
                    }

                    campaignFormTitle.textContent = 'Chỉnh Sửa Chiến Dịch';
                    showCampaignForm();
                })
                .catch(error => {
                    console.error('Lỗi khi tải thông tin chiến dịch:', error);
                    alert('Không thể tải thông tin chiến dịch. Vui lòng thử lại sau.');
                });
        }

        // Delete Campaign
        function deleteCampaign(id) {
            if (confirm('Bạn có chắc chắn muốn xóa chiến dịch này không?')) {
                fetch(`${CAMPAIGNS_API_URL}/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            loadCampaigns();
                            alert('Đã xóa chiến dịch thành công!');
                        } else {
                            throw new Error('Không thể xóa chiến dịch');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa chiến dịch:', error);
                        alert('Không thể xóa chiến dịch. Vui lòng thử lại sau.');
                    });
            }
        }

        // Load Campaigns
        function loadCampaigns() {
            fetch(CAMPAIGNS_API_URL)
                .then(response => response.json())
                .then(data => {
                    campaignsTableBody.innerHTML = '';
                    data.forEach(campaign => {
                        renderCampaignRow(campaign);
                    });
                })
                .catch(error => {
                    console.error('Lỗi khi tải danh sách chiến dịch:', error);
                    alert('Không thể tải danh sách chiến dịch. Vui lòng thử lại sau.');
                });
        }

        // Render Campaign Row
        function renderCampaignRow(campaign) {
            // Get receiver group name if exists
            let receiverGroupName = campaign.receiverGroupId ? 'Đang tải...' : (campaign.customerType || 'N/A');

            if (campaign.receiverGroupId) {
                fetch(`${RECEIVER_GROUPS_API_URL}/${campaign.receiverGroupId}`)
                    .then(response => response.json())
                    .then(group => {
                        document.getElementById(`group-${campaign.id}`).textContent = group.name;
                    })
                    .catch(() => {
                        document.getElementById(`group-${campaign.id}`).textContent = 'Không tìm thấy';
                    });
            }

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${campaign.title}</td>
            <td id="group-${campaign.id}">${receiverGroupName}</td>
            <td>${campaign.receivedCount || 0}</td>
            <td>${campaign.openCount || 0}</td>
            <td>${campaign.clickCount || 0}</td>
            <td>${campaign.status || 'Draft'}</td>
            <td>${formatDate(campaign.createdAt)}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-warning me-1 btn-edit" data-id="${campaign.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger me-1 btn-delete" data-id="${campaign.id}">
                    <i class="fas fa-trash"></i>
                </button>
                ${campaign.status !== 'Đã gửi' ? `
                <button class="btn btn-sm btn-primary btn-send" data-id="${campaign.id}">
                    <i class="fas fa-paper-plane"></i>
                </button>` : ''}
            </td>
        `;

            campaignsTableBody.appendChild(row);

            // Add event listeners for buttons
            row.querySelector('.btn-edit').addEventListener('click', () => editCampaign(campaign.id));
            row.querySelector('.btn-delete').addEventListener('click', () => deleteCampaign(campaign.id));

            const sendButton = row.querySelector('.btn-send');
            if (sendButton) {
                sendButton.addEventListener('click', () => sendCampaign(campaign.id));
            }
        }

        // RECEIVER GROUPS FUNCTIONALITY //

        // Show New Group Form
        btnNewGroup.addEventListener('click', function () {
            resetGroupForm();
            showGroupForm();
        });

        // Hide Group Form
        btnCloseGroupForm.addEventListener('click', hideGroupForm);

        // Save Group Form
        groupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const groupId = document.getElementById('groupId').value;
            const groupData = {
                name: document.getElementById('groupName').value,
                customerType: document.getElementById('groupCustomerType').value,
                autoSegmented: document.getElementById('autoSegmented').checked,
                customerIds: []
            };

            // If not auto-segmented, get selected customers
            if (!groupData.autoSegmented) {
                const selectedCheckboxes = document.querySelectorAll('#customerSelectionList input[type="checkbox"]:checked');
                groupData.customerIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
            }

            if (groupId) {
                // Update existing group
                updateGroup(groupId, groupData);
            } else {
                // Create new group
                createGroup(groupData);
            }
        });

        // Create Group
        function createGroup(groupData) {
            fetch(RECEIVER_GROUPS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            })
                .then(response => response.json())
                .then(data => {
                    loadGroups();
                    hideGroupForm();
                    alert('Đã tạo nhóm người nhận thành công!');
                })
                .catch(error => {
                    console.error('Lỗi khi tạo nhóm người nhận:', error);
                    alert('Không thể tạo nhóm người nhận. Vui lòng thử lại sau.');
                });
        }

        // Update Group
        function updateGroup(id, groupData) {
            fetch(`${RECEIVER_GROUPS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            })
                .then(response => response.json())
                .then(data => {
                    loadGroups();
                    hideGroupForm();
                    alert('Đã cập nhật nhóm người nhận thành công!');
                })
                .catch(error => {
                    console.error('Lỗi khi cập nhật nhóm người nhận:', error);
                    alert('Không thể cập nhật nhóm người nhận. Vui lòng thử lại sau.');
                });
        }

        // Delete Group
        function deleteGroup(id) {
            if (confirm('Bạn có chắc chắn muốn xóa nhóm người nhận này không?')) {
                fetch(`${RECEIVER_GROUPS_API_URL}/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            loadGroups();
                            alert('Đã xóa nhóm người nhận thành công!');
                        } else {
                            throw new Error('Không thể xóa nhóm người nhận');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa nhóm người nhận:', error);
                        alert('Không thể xóa nhóm người nhận. Vui lòng thử lại sau.');
                    });
            }
        }

        // Edit Group
        function editGroup(id) {
            fetch(`${RECEIVER_GROUPS_API_URL}/${id}`)
                .then(response => response.json())
                .then(group => {
                    document.getElementById('groupId').value = group.id;
                    document.getElementById('groupName').value = group.name;
                    document.getElementById('groupCustomerType').value = group.customerType || '';
                    document.getElementById('autoSegmented').checked = group.autoSegmented;

                    if (group.autoSegmented) {
                        manualCustomerSelection.style.display = 'none';
                    } else {
                        manualCustomerSelection.style.display = 'block';
                        loadCustomersForSelection(group.customerIds);
                    }

                    groupFormTitle.textContent = 'Chỉnh Sửa Nhóm Người Nhận';
                    showGroupForm();
                })
                .catch(error => {
                    console.error('Lỗi khi tải thông tin nhóm người nhận:', error);
                    alert('Không thể tải thông tin nhóm người nhận. Vui lòng thử lại sau.');
                });
        }

        // Load Groups
        function loadGroups() {
            fetch(RECEIVER_GROUPS_API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Thât bại khi tải danh sách nhóm người nhận');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        console.error('Mong Array nhưng trả về:', data);
                        throw new Error('Data không hợp lệ');
                    }
                    groupsTableBody.innerHTML = '';
                    data.forEach(group => {
                        renderGroupRow(group);
                    });

                    // Also update receiver group dropdown in campaign form
                    const receiverGroupSelect = document.getElementById('receiverGroupId');
                    receiverGroupSelect.innerHTML = '<option value="">-- Chọn nhóm người nhận --</option>';

                    data.forEach(group => {
                        const option = document.createElement('option');
                        option.value = group.id;
                        option.textContent = group.name;
                        receiverGroupSelect.appendChild(option);
                    });

                    // Also update filter dropdown
                    const filterReceiverGroup = document.getElementById('filterReceiverGroup');
                    filterReceiverGroup.innerHTML = '<option value="">Tất cả nhóm</option>';

                    data.forEach(group => {
                        const option = document.createElement('option');
                        option.value = group.id;
                        option.textContent = group.name;
                        filterReceiverGroup.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Lỗi khi tải danh sách nhóm người nhận:', error);
                    alert('Không thể tải danh sách nhóm người nhận. Vui lòng thử lại sau.');
                });
        }

        // Render Group Row
        function renderGroupRow(group) {
            const customerCount = group.customerIds ? group.customerIds.length : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${group.name}</td>
            <td>${customerCount}</td>
            <td>${group.customerType || 'N/A'}</td>
            <td>${group.autoSegmented ? 'Có' : 'Không'}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-warning me-1 btn-edit" data-id="${group.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${group.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

            groupsTableBody.appendChild(row);

            // Add event listeners for buttons
            row.querySelector('.btn-edit').addEventListener('click', () => editGroup(group.id));
            row.querySelector('.btn-delete').addEventListener('click', () => deleteGroup(group.id));
        }

        // Show Group Form
        function showGroupForm() {
            groupFormCard.style.display = 'block';
            setTimeout(() => {
                groupFormCard.classList.add('show');
            }, 10);
            window.scrollTo({
                top: groupFormCard.offsetTop - 20,
                behavior: 'smooth'
            });
        }

        // Hide Group Form
        function hideGroupForm() {
            groupFormCard.classList.remove('show');
            setTimeout(() => {
                groupFormCard.style.display = 'none';
            }, 300);
        }

        // Reset Group Form
        function resetGroupForm() {
            document.getElementById('groupId').value = '';
            document.getElementById('groupName').value = '';
            document.getElementById('groupCustomerType').value = '';
            document.getElementById('autoSegmented').checked = false;
            manualCustomerSelection.style.display = 'block';
            groupFormTitle.textContent = 'Tạo Nhóm Người Nhận Mới';

            // Load all customers for selection
            loadCustomersForSelection();
        }

        // Load Customers for Selection
        function loadCustomersForSelection(selectedIds = []) {
            fetch(CUSTOMERS_API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load customers');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        console.error('Mong Array nhưng trả về:', data);
                        throw new Error('Data không hợp lệ');
                    }
                    customerSelectionList.innerHTML = '';
                    data.forEach(customer => {
                        const isSelected = selectedIds.includes(customer.id);

                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>
                            <input type="checkbox" value="${customer.id}" ${isSelected ? 'checked' : ''}>
                        </td>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.type || 'N/A'}</td>
                    `;

                        customerSelectionList.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Lỗi khi tải danh sách khách hàng:', error);
                    alert('Không thể tải danh sách khách hàng. Vui lòng thử lại sau.');
                });
        }

        // Search Customers
        btnSearchCustomers.addEventListener('click', function () {
            const searchTerm = document.getElementById('customerSearch').value.trim().toLowerCase();

            if (!searchTerm) {
                loadCustomersForSelection();
                return;
            }

            const rows = customerSelectionList.querySelectorAll('tr');

            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();

                if (name.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // UTILITY FUNCTIONS //

        // Format Date
        function formatDate(dateString) {
            if (!dateString) return 'N/A';

            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // INITIALIZATION //
        loadCampaigns();
        loadGroups();
        loadCustomersForSelection();
    }
});