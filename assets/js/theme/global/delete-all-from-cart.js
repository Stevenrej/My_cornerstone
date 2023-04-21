export function deleteAllFromCart() {
    const deleteAllFromCartBtn = document.querySelector('#delete-all-from-cart');

    deleteAllFromCartBtn.addEventListener('click', async () => {
        // Fetch the current cart
        const cartResponse = await fetch('http://localhost:3001/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
        const cartData = await cartResponse.json();
        const cart = cartData[0];

        if (!cart) {
            return;
        }

        const itemIds = cart.lineItems.physicalItems.map(item => item.id).concat(cart.lineItems.digitalItems.map(item => item.id));

        // Delete all items from the cart
        const deleteItemsPromises = itemIds.map(itemId => {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            return fetch(`http://localhost:3001/api/storefront/carts/${cart.id}/items/${itemId}`, options);
        });

        await Promise.all(deleteItemsPromises);

        // Delete the cart itself
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:3001/api/storefront/carts/${cart.id}`, options);

        if (response.ok) {
            document.dispatchEvent(new CustomEvent('cart-emptied'));
        } else {
            console.error(`Error deleting cart ${cart.id}.`);
        }
    });
}
