// Function to display avatar preview when avatar URL is entered
document.getElementById('avatar-url').addEventListener('input', function() {
    const avatarUrl = document.getElementById('avatar-url').value;
    const profilePreview = document.getElementById('profile-preview');

    if (avatarUrl) {
        profilePreview.src = avatarUrl;
        profilePreview.style.display = 'block';
    } else {
        profilePreview.style.display = 'none';
    }
});

document.getElementById('webhook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const webhookUrl = document.getElementById('webhook-url').value;
    const username = document.getElementById('username').value;
    const avatarUrl = document.getElementById('avatar-url').value;  // Avatar URL from the form
    const message = document.getElementById('message').value;
    const numMessages = document.getElementById('num-messages').value;  // Number of messages to send (user-defined)

    if (!webhookUrl) {
        alert("Please provide a webhook URL.");
        return;
    }

    if (numMessages <= 0) {
        alert("Please provide a valid number of messages.");
        return;
    }

    // Function to send the message
    let sendMessage = () => {
        const payload = {
            username: username || "Webhook Spammer",  // Username for the bot
            content: message,  // The message content
            avatar_url: avatarUrl || null  // Use avatar URL if provided
        };

        // Send the payload to the webhook
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                console.log('Message sent!');
            } else {
                console.log('Error sending message.');
            }
        }).catch(error => {
            console.error('Error sending message:', error);
        });
    };

    // Loop to send the number of messages specified by the user
    for (let i = 0; i < numMessages; i++) {
        setTimeout(sendMessage, i * 100);  // Delay between messages (100ms)
    }

    alert('Messages are being sent.');
});

// Clear the webhook URL field
document.getElementById('delete-webhook').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete the webhook?')) {
        document.getElementById('webhook-url').value = '';
        alert('Webhook deleted.');
    }
});
