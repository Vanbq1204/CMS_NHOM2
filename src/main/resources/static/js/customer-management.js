document.addEventListener('DOMContentLoaded', function () {
                const apiBaseUrl = '/api/customer-info';

                // Fetch all customers and render them in the table
                function fetchCustomers() {
                    fetch(apiBaseUrl)
                        .then(response => response.json())
                        .then(data => renderCustomerTable(data))
                        .catch(error => console.error('Error fetching customers:', error));
                }

                // Render customer data in the table
                function renderCustomerTable(customers) {
                    const tableBody = document.getElementById('customer-table-body');
                    tableBody.innerHTML = ''; // Clear existing rows

                    customers.forEach(customer => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${customer.id}</td>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.phone}</td>
                            <td>${customer.company || ''}</td>
                            <td>${customer.projectType || ''}</td>
                            <td>${customer.budget || ''}</td>
                            <td>${customer.payment || ''}</td>
                            <td>${customer.progress || ''}%</td>
                            <td>${customer.deadline || ''}</td>
                            <td><span class="status ${customer.status}">${customer.status}</span></td>
                            <td class="actions">
                                <button class="edit" data-id="${customer.id}"><i class="fas fa-edit"></i> Sửa</button>
                                <button class="delete" data-id="${customer.id}"><i class="fas fa-trash"></i> Xóa</button>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });

                    // Attach event listeners to edit and delete buttons
                    document.querySelectorAll('.edit').forEach(button => {
                        button.addEventListener('click', handleEditCustomer);
                    });
                    document.querySelectorAll('.delete').forEach(button => {
                        button.addEventListener('click', handleDeleteCustomer);
                    });
                }

                // Handle adding a new customer
                function addCustomer(customerData) {
                    fetch(apiBaseUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(customerData),
                    })
                        .then(response => response.json())
                        .then(() => fetchCustomers())
                        .catch(error => console.error('Error adding customer:', error));
                }

                // Handle editing a customer
                function handleEditCustomer(event) {
                    const customerId = event.target.dataset.id;
                    fetch(`${apiBaseUrl}/${customerId}`)
                        .then(response => response.json())
                        .then(customer => {
                            // Populate the edit form with customer data
                            document.getElementById('edit-name').value = customer.name;
                            document.getElementById('edit-email').value = customer.email;
                            document.getElementById('edit-phone').value = customer.phone;
                            document.getElementById('edit-id').value = customer.id;
                            // Show the edit modal or form
                            document.querySelector('.edit-customer-container').classList.add('active');
                        })
                        .catch(error => console.error('Error fetching customer:', error));
                }

                // Save edited customer
                document.getElementById('edit-customer-form').addEventListener('submit', function (event) {
                    event.preventDefault();
                    const customerId = document.getElementById('edit-id').value;
                    const updatedCustomer = {
                        name: document.getElementById('edit-name').value,
                        email: document.getElementById('edit-email').value,
                        phone: document.getElementById('edit-phone').value,
                    };

                    fetch(`${apiBaseUrl}/${customerId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedCustomer),
                    })
                        .then(() => {
                            fetchCustomers();
                            document.querySelector('.edit-customer-container').classList.remove('active');
                        })
                        .catch(error => console.error('Error updating customer:', error));
                });

                // Handle deleting a customer
                function handleDeleteCustomer(event) {
                    const customerId = event.target.dataset.id;
                    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
                        fetch(`${apiBaseUrl}/${customerId}`, { method: 'DELETE' })
                            .then(() => fetchCustomers())
                            .catch(error => console.error('Error deleting customer:', error));
                    }
                }

                // Initial fetch of customers
                fetchCustomers();
            });