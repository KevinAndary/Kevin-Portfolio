document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, subject, message }),
  });

  if (response.ok) {
    document.getElementById('form-message-success').style.display = 'block';
    document.getElementById('form-message-warning').style.display = 'none';
  } else {
    document.getElementById('form-message-warning').style.display = 'block';
    document.getElementById('form-message-success').style.display = 'none';
  }
});
