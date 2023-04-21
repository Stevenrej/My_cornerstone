import 'regenerator-runtime/runtime';

export default function addAllToCart() {
    const addAllToCartBtn = document.querySelector('#add-all-to-cart');

    addAllToCartBtn.addEventListener('click', async () => {
        const productIds = [];
        const productIdList = [];
        const cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            const productId = card.querySelector('[data-product-id]').dataset.productId;
            if (productId) {
                productIds.push(productId);
                productIdList.push(productId);
            }
        });

        console.log('Product IDs to add:', productIds);

        const cartResponse = await fetch('http://localhost:3001/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
        const cartData = await cartResponse.json();
        let cart = cartData[0];

        if (!cart) {
            const lineItems = [{
                quantity: 1,
                productId: productIds[0],
            }];

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lineItems, locale: 'en' }),
            };

            const createCartResponse = await fetch('http://localhost:3001/api/storefront/carts', options);
            cart = await createCartResponse.json();

            console.log('Cart created:', cart);

            productIds.shift(); // Remove the first product from the array
        } else {
            console.log('Cart found:', cart);
        }

        console.log('Remaining productIds to add:', productIds);

        const addProductsToCart = async (ids) => {
            const requests = ids.map((productId) => {
                const lineItemsAdd = [{
                    quantity: 1,
                    productId,
                    variantId: null,
                    optionSelections: [],
                }];

                const optionsAdd = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lineItems: lineItemsAdd, locale: 'en' }),
                };

                console.log(`Adding item ${productId} to cart...`);

                return fetch(`http://localhost:3001/api/storefront/carts/${cart.id}/items`, optionsAdd);
            });

            const results = await Promise.all(requests);

            results.forEach((response, index) => {
                if (!response.ok) {
                    throw new Error('Error adding item to cart');
                }
                console.log(`Item ${ids[index]} added to cart successfully.`);
                document.dispatchEvent(new CustomEvent('cart-item-add'));
            });
        };
        function extractProductNames(newCart, listOfIds) {
            const allItems = [
                ...newCart.physicalItems,
                ...newCart.digitalItems,
                ...newCart.customItems,
                ...newCart.giftCertificates,
            ];

            console.log(allItems, 'allItems');
            console.log(listOfIds, 'listOfIds');

            const matchingItems = allItems.filter(item => listOfIds.includes(item.productId.toString()));

            return matchingItems.map(item => item.name);
        }


        try {
            await addProductsToCart(productIds);

            console.log(productIdList);

            // Fetch the updated cart
            const updatedCartResponse = await fetch('http://localhost:3001/api/storefront/carts?include=lineItems.physicalItems.options,lineItems.digitalItems.options');
            const updatedCartData = await updatedCartResponse.json();
            const updatedCart = updatedCartData[0].lineItems;

            console.log(updatedCart, 'updatedCart');


            const productNames = extractProductNames(updatedCart, productIdList);

            console.log(productNames, 'productNames');


            if (productNames) {
                document.dispatchEvent(new CustomEvent('cart-updated', { detail: productNames }));
            }

            console.log('Attempted to add all items to cart.');
        } catch (error) {
            console.error('Error adding items to cart:', error.message);
        }
    });
}
