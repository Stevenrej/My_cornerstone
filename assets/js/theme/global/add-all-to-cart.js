import 'regenerator-runtime/runtime';

export default function addAllToCart() {
    const addAllToCartBtn = document.querySelector('#add-all-to-cart');
    if (!addAllToCartBtn) return;

    addAllToCartBtn.addEventListener('click', async () => {
        addAllToCartBtn.disabled = true;
        addAllToCartBtn.textContent = 'Adding...';
        addAllToCartBtn.classList.add('is-adding');

        const productIds = [];
        const productIdList = [];
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const productId = card.querySelector('[data-product-id]').dataset.productId;
            if (productId) {
                productIds.push(productId);
                productIdList.push(productId);
            }
        });

        const cartResponse = await fetch('https://trial-store-g8.mybigcommerce.com/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
        const cartData = await cartResponse.json();
        let cart = cartData[0];

        if (!cart) {
            const lineItems = [{
                quantity: 1,
                productId: productIds[0],
            }];

            const createCartOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lineItems, locale: 'en' }),
            };

            const createCartResponse = await fetch('https://trial-store-g8.mybigcommerce.com/api/storefront/carts', createCartOptions);
            cart = await createCartResponse.json();
            productIds.shift();
        }

        function extractProductNames(newCart, listOfIds) {
            const allItems = [
                ...newCart.physicalItems,
                ...newCart.digitalItems,
                ...newCart.customItems,
                ...newCart.giftCertificates,
            ];

            const matchingItems = allItems.filter(item => listOfIds.includes(item.productId.toString()));

            return matchingItems.map(item => item.name);
        }

        try {
            if (productIds.length) {
                const lineItemsToAdd = productIds.map(productId => ({
                    quantity: 1,
                    productId,
                    variantId: null,
                    optionSelections: [],
                }));

                const optionsAdd = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lineItems: lineItemsToAdd, locale: 'en' }),
                };

                await fetch(`https://trial-store-g8.mybigcommerce.com/api/storefront/carts/${cart.id}/items`, optionsAdd);
            }

            const updatedCartResponse = await fetch('https://trial-store-g8.mybigcommerce.com/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
            const updatedCartData = await updatedCartResponse.json();
            const updatedCart = updatedCartData[0].lineItems;
            const productNames = extractProductNames(updatedCart, productIdList);

            if (productNames.length) {
                document.dispatchEvent(new CustomEvent('cart-updated', { detail: productNames }));
            }
        } catch (error) {
            // console.error(error);
        }

        addAllToCartBtn.disabled = false;
        addAllToCartBtn.textContent = 'Add All to Cart';
        addAllToCartBtn.classList.remove('is-adding');
    });
}
