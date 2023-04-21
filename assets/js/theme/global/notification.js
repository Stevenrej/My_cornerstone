export default function showNotification(message, timeout = 5000) {
    if (!message || message.trim() === '') {
        return;
    }
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, timeout);
}


document.addEventListener('cart-emptied', () => {
    showNotification('Your cart has been emptied.');
});

document.addEventListener('cart-updated', (event) => {
    const productNames = event.detail;
    const namesString = productNames.join(', ');

    showNotification(`${namesString} has been added to the cart.`);
});
