# Test Cornerstone Theme

[Link to Deployed site](https://trial-store-g8.mybigcommerce.com/?ctk=078ad157-1896-4fd1-af90-dd1830778811)

Preview Code: w0pzp17b1t

This repository contains a modified version of the Cornerstone theme for BigCommerce with added features based on a test task. The theme has been customized to include a new category and a special product. The following features have been implemented:

1. A new category called "Special Items" with a product named "Special Item".
2. Displaying the second image of the "Special Item" on hover.
3. An "Add All To Cart" button on the category page.
4. A "Remove All Items" button on the category page, visible when the cart has at least one item.
5. A banner displaying customer details (name, email, phone) at the top of the category page when a customer is logged in.

## Added and Modified Files

The following files have been added or modified in this repository:

1. `templates/components/products/card.html`: Modified to implement the hover effect for the second image of the "Special Item".
2. `templates/pages/category.html`: Modified to implement the "Add All To Cart" and "Remove All Items" buttons, and the customer details banner.
3. `assets/js/theme/global.js`: Modified to import and call the new functions for the added features.
4. `assets/js/theme/global/add-all-to-cart.js`: New file created to handle the "Add All To Cart" functionality.
5. `assets/js/theme/global/delete-all-from-cart.js`: New file created to handle the "Remove All Items" functionality.
6. `assets/js/theme/global/notification.js`: New file created to handle notifications for the added features.
7. `assets/js/theme/global/show-button.js`: New file created to show the "Remove All Items" button when the cart has at least one item.
8. `assets/scss/components/citadel/cards/_cards.scss`: Modified to add styling for the hover effect on the second image of the "Special Item".
9. `assets/scss/components/foundation/buttons/_buttons.scss`: Modified to add styling for the "Add All To Cart" and "Remove All Items" buttons.
10. `assets/scss/components/stencil/banners/_banners.scss`: Modified to add styling for the customer details banner displayed at the top of the category page.

## Function Descriptions

- `addAllToCart()`: A function in `assets/js/theme/global/add-all-to-cart.js` that adds all products on the category page to the cart when the "Add All To Cart" button is clicked.
- `deleteAllFromCart()`: A function in `assets/js/theme/global/delete-all-from-cart.js` that removes all items from the cart when the "Remove All Items" button is clicked.
- `showRemoveAllButtonIfCartHasItems()`: A function in `assets/js/theme/global/show-button.js` that displays the "Remove All Items" button when the cart has at least one item.
- `showNotification()`: A function in `assets/js/theme/global/notification.js` that displays a notification when a user adds or removes items from the cart.

## How to Use

To use this theme, follow these steps:

1. Clone this repository.
2. Install the Stencil CLI following the [BigCommerce documentation](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil).
3. Navigate to the root directory of this repository and run `stencil init` to set up the theme.
4. Start the theme in your local environment by running `stencil start`.
5. In order to view the theme locally, you'll need to change any instances of the deployed link to your localhost. Simply update the necessary URLs before proceeding to the next step.
6. Open your browser and navigate to the provided localhost address to view the theme.
7. Make any further customizations or modifications as needed.
