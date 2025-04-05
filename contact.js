document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const data = { name, email, phone, message };
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwG_Gtf5LHDEhLHYohS9E1C2JdzRRpQ6wZlsCcH1xw2l6WlEEbrRkEpyhuOSR9BbQY/exec', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors'
            });
            const result = await response.json();
            console.log('Response:', result);
            if (result.status === 'success') {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            alert('There was an error. Please try again.');
        }
    });
});