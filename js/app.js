'use strict';
/**
 * This program is created as a part of a training exercise. It's Bus Mall, and
 * tracks and shares information about user clicks on product images.
 */

//The set of products
var products = [];

/**
 * Product Object with constructor and methods.
 */
function Product(productName, productImage) {
  this.productName = productName;
  this.productImage = productImage;
}

function initializeProductSet() {
  products.push(new Product());
}

//Instantiate product objects
initializeProductSet();