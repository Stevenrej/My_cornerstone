export default async function showRemoveAllButtonIfCartHasItems() {
    const deleteAllFromCartBtn = document.querySelector('#delete-all-from-cart');

    try {
        const cartResponse = await fetch('http://localhost:3001/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
        const cartData = await cartResponse.json();
        const cart = cartData[0];

        if (cart && (cart.lineItems.physicalItems.length > 0 || cart.lineItems.digitalItems.length > 0)) {
            deleteAllFromCartBtn.classList.remove('hidden');
        } else {
            deleteAllFromCartBtn.classList.add('hidden');
        }
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('cart-updated', showRemoveAllButtonIfCartHasItems);
document.addEventListener('cart-emptied', showRemoveAllButtonIfCartHasItems);
