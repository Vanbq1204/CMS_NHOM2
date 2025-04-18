document.addEventListener('DOMContentLoaded', function () {
                    // Tab handling
                    const tabButtons = document.querySelectorAll('.tab-button');
                    const tabContents = document.querySelectorAll('.tab-content');

                    tabButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            tabButtons.forEach(btn => btn.classList.remove('active'));
                            tabContents.forEach(content => content.classList.remove('active'));

                            this.classList.add('active');
                            const tabId = this.getAttribute('data-tab');
                            document.getElementById(tabId).classList.add('active');

                            // Load data for specific tabs
                            if (tabId === 'email-lists') loadEmailLists();
                            if (tabId === 'campaign-stats') loadCampaignStats();
                        });
                    });

                    // Utility function for fetch error handling
                    function handleFetchError(response) {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    }

                    // Load email lists
                    function loadEmailLists() {
                        fetch('/api/email-campaigns', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                            .then(handleFetchError)
                            .then(data => {
                                const container = document.querySelector('#email-lists tbody');
                                if (!data || data.length === 0) {
                                    container.innerHTML = '<tr><td colspan="6">No campaigns found.</td></tr>';
                                    return;
                                }
                                container.innerHTML = data.map(campaign => `
                                    <tr>
                                        <td>${campaign.id}</td>
                                        <td>${campaign.title}</td>
                                        <td>${campaign.status}</td>
                                        <td>${campaign.createdAt || 'N/A'}</td>
                                        <td>${campaign.scheduledAt || 'N/A'}</td>
                                        <td class="actions">
                                            <button class="edit" data-id="${campaign.id}"><i class="fas fa-edit"></i></button>
                                            <button class="delete" data-id="${campaign.id}"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                `).join('');
                                attachCampaignActions();
                            })
                            .catch(error => console.error('Error loading email campaigns:', error));
                    }

                    // Load campaign stats
                    function loadCampaignStats() {
                        fetch('/api/email-campaigns', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                            .then(handleFetchError)
                            .then(data => {
                                const container = document.querySelector('#campaign-stats tbody');
                                if (!data || data.length === 0) {
                                    container.innerHTML = '<tr><td colspan="9">No campaign stats available.</td></tr>';
                                    return;
                                }
                                container.innerHTML = data.map(campaign => `
                                    <tr>
                                        <td>${campaign.id}</td>
                                        <td>${campaign.title}</td>
                                        <td>${campaign.createdAt || 'N/A'}</td>
                                        <td>${campaign.scheduledAt || 'N/A'}</td>
                                        <td>${campaign.sendCount || 0}</td>
                                        <td>${campaign.openCount || 0}</td>
                                        <td>${campaign.clickCount || 0}</td>
                                        <td>${campaign.status}</td>
                                        <td class="actions">
                                            <button class="view"><i class="fas fa-eye"></i></button>
                                            <button class="edit"><i class="fas fa-edit"></i></button>
                                            <button class="delete"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                `).join('');
                            })
                            .catch(error => console.error('Error loading campaign stats:', error));
                    }

                    // Attach event listeners to campaign actions
                    function attachCampaignActions() {
                        document.querySelectorAll('#email-lists .edit').forEach(button => {
                            button.addEventListener('click', function () {
                                const campaignId = this.getAttribute('data-id');
                                // Fetch campaign details and open the modal
                                fetch(`/api/email-campaigns/${campaignId}`)
                                    .then(response => {
                                        if (!response.ok) throw new Error('Failed to fetch campaign details');
                                        return response.json();
                                    })
                                    .then(campaign => openUpdateModal(campaign)) // Call the modal function
                                    .catch(error => console.error('Error fetching campaign details:', error));
                            });
                        });

                        document.querySelectorAll('#email-lists .delete').forEach(button => {
                            button.addEventListener('click', function () {
                                const campaignId = this.getAttribute('data-id');
                                if (confirm('Are you sure you want to delete this campaign?')) {
                                    deleteEmailCampaign(campaignId);
                                }
                            });
                        });
                    }

                    // Delete an email campaign
                    function deleteEmailCampaign(campaignId) {
                        fetch(`/api/email-campaigns/${campaignId}`, { method: 'DELETE' })
                            .then(handleFetchError)
                            .then(() => {
                                alert('Email campaign deleted successfully');
                                loadEmailLists(); // Refresh the list
                            })
                            .catch(error => console.error('Error deleting email campaign:', error));
                    }

                    // Create a new email campaign
                    function createEmailCampaign() {
                        const campaign = {
                            title: document.getElementById('campaign-name').value.trim(),
                            content: document.getElementById('email-content').value.trim(),
                            status: document.getElementById('campaign-status').value,
                            scheduledAt: document.getElementById('campaign-schedule').value,
                            receiverGroupId: document.getElementById('receiver-group-id').value.trim()
                        };

                        if (!campaign.title || !campaign.content || !campaign.status) {
                            alert('Please fill in all required fields.');
                            return;
                        }

                        fetch('/api/email-campaigns', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(campaign)
                        })
                            .then(handleFetchError)
                            .then(data => {
                                alert(`Email campaign created: ${data.title}`);
                                loadCampaignStats(); // Refresh campaign stats
                            })
                            .catch(error => console.error('Error creating email campaign:', error));
                    }

                    // Attach event listeners to buttons
                    const saveDraftButton = document.getElementById('save-draft');
                    if (saveDraftButton) {
                        saveDraftButton.addEventListener('click', createEmailCampaign);
                    }

    const updateModal = document.getElementById('update-campaign-modal');
    const closeButton = updateModal.querySelector('.close-button');
    const saveButton = document.getElementById('update-campaign-save');
    let currentCampaignId = null;

    // Open the modal and populate fields
    function openUpdateModal(campaign) {
        currentCampaignId = campaign.id;
        document.getElementById('update-campaign-name').value = campaign.title;
        document.getElementById('update-campaign-subject').value = campaign.subject || '';
        document.getElementById('update-campaign-status').value = campaign.status;
        document.getElementById('update-campaign-schedule').value = campaign.scheduledAt || '';
        document.getElementById('update-email-content').value = campaign.content || '';
        updateModal.style.display = 'block';
    }

    // Close the modal
    closeButton.addEventListener('click', function () {
        updateModal.style.display = 'none';
    });

    // Save updated campaign
    saveButton.addEventListener('click', function () {
        const updatedCampaign = {
            title: document.getElementById('update-campaign-name').value.trim(),
            subject: document.getElementById('update-campaign-subject').value.trim(),
            status: document.getElementById('update-campaign-status').value,
            scheduledAt: document.getElementById('update-campaign-schedule').value,
            content: document.getElementById('update-email-content').value.trim()
        };

        fetch(`/api/email-campaigns/${currentCampaignId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCampaign)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to update campaign');
                return response.json();
            })
            .then(data => {
                alert(`Campaign updated successfully: ${data.title}`);
                updateModal.style.display = 'none';
                loadEmailLists(); // Refresh the email list
            })
            .catch(error => console.error('Error updating campaign:', error));
    });
});