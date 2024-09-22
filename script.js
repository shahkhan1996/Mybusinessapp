let loginAttempts = 0;

document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    login(username, password);
});

function login(username, password) {
    const validUsername = 'shahmir.khan';
    const validPassword = '1234';

    const loginMessage = document.getElementById('loginMessage');

    if (loginAttempts >= 3) {
        loginMessage.innerText = 'Your ID is disabled. Please contact the IT team to re-enable access.';
        loginMessage.style.color = 'red';
        loginMessage.style.display = 'block';
        return;
    }

    if (username === validUsername && password === validPassword) {
        loginAttempts = 0; // Reset attempts on successful login
        loginMessage.style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('statusSection').style.display = 'block';
    } else {
        loginAttempts++;
        loginMessage.innerText = `Invalid username or password. Attempts left: ${3 - loginAttempts}`;
        loginMessage.style.color = 'red';
        loginMessage.style.display = 'block';

        if (loginAttempts === 3) {
            loginMessage.innerText = 'Your ID is disabled. Please contact the IT team to re-enable access.';
        }
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('statusSection').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginMessage').style.display = 'none';
    document.getElementById('customerUsername').value = '';
    document.getElementById('statusDisplay').style.display = 'none';
});

document.getElementById('checkStatusBtn').addEventListener('click', () => {
    const username = document.getElementById('customerUsername').value;
    checkCustomerStatus(username);
});

function getRandomStatus() {
    const statuses = ['disabled', 'suspended', 'expired', 'active'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function checkCustomerStatus(username) {
    const status = username === 'shahmir' ? getRandomStatus() : null;

    document.getElementById('statusDisplay').style.display = 'block';
    document.getElementById('status').innerText = status || 'not found';

    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = ''; // Clear previous actions

    const calendarDiv = document.getElementById('calendar');
    calendarDiv.style.display = 'none'; // Hide calendar initially

    const operationMessage = document.getElementById('operationMessage');
    operationMessage.style.display = 'none'; // Hide operation message initially

    if (status === 'disabled') {
        actionDiv.innerHTML = `<button onclick="updateStatus('${username}', 'active')">Activate Account</button>`;
    } else if (status === 'expired') {
        actionDiv.innerHTML = `<p>Extend the expiry date:</p>`;
        calendarDiv.style.display = 'block';
        setMinMaxDates();
    } else if (status === 'suspended') {
        actionDiv.innerHTML = '<p>Inform customer to send an email to the business team.</p>';
    } else if (status === 'active') {
        actionDiv.innerHTML = `
            <button onclick="updateStatus('${username}', 'disabled')">Disable Account</button>
            <p>Inform customer to enter correct credentials.</p>
        `;
    } else {
        actionDiv.innerHTML = '<p>No status found for this username.</p>';
    }
}

function setMinMaxDates() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    
    document.getElementById('extendDate').min = today.toISOString().split('T')[0];
    document.getElementById('extendDate').max = maxDate.toISOString().split('T')[0];
}

function updateStatus(username, newStatus) {
    console.log(`Updating ${username} to ${newStatus}`);
    if (newStatus === 'active') {
        displayOperationMessage(`Account for ${username} has been activated.`);
    } else if (newStatus === 'disabled') {
        displayOperationMessage(`Account for ${username} has been disabled.`);
    }
}

document.getElementById('confirmExtendBtn').addEventListener('click', () => {
    const newExpiryDate = document.getElementById('extendDate').value;
    if (newExpiryDate) {
        console.log(`Extending expiry for shahmir to ${newExpiryDate}`);
        displayOperationMessage(`Expiry date for shahmir has been extended to ${newExpiryDate}.`);
    } else {
        displayOperationMessage('Please select a valid date.', 'red');
    }
});

function displayOperationMessage(message, color = 'green') {
    const operationMessage = document.getElementById('operationMessage');
    operationMessage.innerText = message;
    operationMessage.style.color = color;
    operationMessage.style.display = 'block';
}
