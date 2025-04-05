document.addEventListener('DOMContentLoaded', () => {
    const subscriptionForm = document.getElementById('subscriptionForm');
    subscriptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const formData = new URLSearchParams();
        formData.append('email', email);
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwG_Gtf5LHDEhLHYohS9E1C2JdzRRpQ6wZlsCcH1xw2l6WlEEbrRkEpyhuOSR9BbQY/exec', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                mode : 'no-cors'
            });
            const result = await response.json(); // Line 14: Fails here
            console.log('Response:', result);
            if (result.status === 'success') {
                alert('Thank you for subscribing!');
                subscriptionForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            alert('There was an error: ' + error.message);
        }
    });
});