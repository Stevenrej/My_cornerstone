export default async function showRemoveAllButtonIfCartHasItems() {
    const deleteAllFromCartBtn = document.querySelector('#delete-all-from-cart');

    if (!deleteAllFromCartBtn) {
        return;
    }

    try {
        const cartResponse = await fetch('https://trial-store-g8.mybigcommerce.com/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
        const cartData = await cartResponse.json();
        const cart = cartData[0];

        if (cart && (cart.lineItems.physicalItems.length > 0 || cart.lineItems.digitalItems.length > 0 || cart.lineItems.customItems.length > 0 || cart.lineItems.giftCertificates.length > 0)) {
            deleteAllFromCartBtn.classList.remove('hidden');
        } else {
            deleteAllFromCartBtn.classList.add('hidden');
        }
    } catch (error) {
        // console.error('Error showing remove all button:', error);
    }
}

document.addEventListener('cart-updated', showRemoveAllButtonIfCartHasItems);
document.addEventListener('cart-emptied', showRemoveAllButtonIfCartHasItems);
