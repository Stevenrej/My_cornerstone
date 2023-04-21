export function deleteAllFromCart() {
    const deleteAllFromCartBtn = document.querySelector('#delete-all-from-cart');

    if (!deleteAllFromCartBtn) {
        return;
    }

    deleteAllFromCartBtn.addEventListener('click', async () => {
        try {
            deleteAllFromCartBtn.disabled = true;
            deleteAllFromCartBtn.textContent = 'Removing...';
            deleteAllFromCartBtn.classList.add('is-deleting');

            const cartResponse = await fetch('https://trial-store-g8.mybigcommerce.com/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
            const cartData = await cartResponse.json();
            const cart = cartData[0];

            if (!cart) {
                return;
            }

            const itemIds = cart.lineItems.physicalItems.map(item => item.id).concat(cart.lineItems.digitalItems.map(item => item.id));

            if (itemIds.length === 0) {
                // console.error('Error: no items to delete from cart.');
                return;
            }

            const deleteItemsPromises = itemIds.map(itemId => {
                const options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                };
                return fetch(`https://trial-store-g8.mybigcommerce.com/api/storefront/carts/${cart.id}/items/${itemId}`, options);
            });

            await Promise.all(deleteItemsPromises);

            if (itemIds.length > 1) {
                const options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                };

                const response = await fetch(`https://trial-store-g8.mybigcommerce.com/api/storefront/carts/${cart.id}`, options);

                if (response.ok) {
                    document.dispatchEvent(new CustomEvent('cart-emptied'));
                } else {
                    // console.error(`Error deleting cart ${cart.id}.`);
                }
            } else {
                document.dispatchEvent(new CustomEvent('cart-emptied'));
            }
        } catch (error) {
            // console.error('Error removing items from cart:', error.message);
        } finally {
            deleteAllFromCartBtn.disabled = false;
            deleteAllFromCartBtn.textContent = 'Delete All from Cart';
            deleteAllFromCartBtn.classList.remove('is-deleting');
        }
    });
}
