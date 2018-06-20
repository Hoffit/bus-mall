'use strict';
/**
 * This program is created as a part of a training exercise. It's Bus Mall, and
 * tracks and shares information about user clicks on product images.
 * Each iteration displays 3 distint products for the user to select from.
 */

//The set of products from which the user can view and select
var product = [];

//The number of clicks required to complete the survey
var numberOfRequiredProductSelections = 25;

//The current click count
var clickCount = 0;

//The set of three products currently displayed
var currentlyDisplayedProductIndex = [];

//The set of three products previously displayed.
var previouslyDisplayedProductIndex = [];

//Get the DOM section object where the product choices are displayed
var productChoicePanel = document.getElementById('product-choices');

//Get the DOM section object where the results of this survey should display
var surveyResultCanvas = document.getElementById('survey-result');

/**
 * Product Object with constructor and methods.
 */
function Product(productName, productImagePath) {
  this.productName = productName;
  this.productImagePath = productImagePath;
  this.displayCount = 0;
  this.selectCount = 0;
}

/**
 * Increment the product display count
 */
Product.prototype.incrementDisplayCount = function () {
  this.displayCount++;
};

/**
 * Increment the product select count
 */
Product.prototype.incrementSelectCount = function () {
  this.selectCount++;
};

/**
 * Randomly chooses 3 distinct product instances, which were not selected
 * in the immediate prior iteration.
 * Hard coded to 3 products at a time for this exercise.
 */
function selectNextProductSet() {
  //move current product set to previous (hard code size 3)
  previouslyDisplayedProductIndex[0] = currentlyDisplayedProductIndex.pop();
  previouslyDisplayedProductIndex[1] = currentlyDisplayedProductIndex.pop();
  previouslyDisplayedProductIndex[2] = currentlyDisplayedProductIndex.pop();
  do {
    var aRandomArrayIndex = Math.floor(Math.random() * product.length);//random product
    if (!previouslyDisplayedProductIndex.includes(aRandomArrayIndex) &&
      !currentlyDisplayedProductIndex.includes(aRandomArrayIndex)) {
      currentlyDisplayedProductIndex.push(aRandomArrayIndex);
    }
  } while (currentlyDisplayedProductIndex.length < 3);
}

//Enable shop instance to populate table row with their hourly sales projections
function rendorProductChoice() {

  //Have the the instances to be displayed, update their display count
  product[currentlyDisplayedProductIndex[0]].incrementDisplayCount();
  product[currentlyDisplayedProductIndex[1]].incrementDisplayCount();
  product[currentlyDisplayedProductIndex[2]].incrementDisplayCount();

  //Place the 3 product images in the product choice panel
  document.getElementById('first-product').setAttribute('src', product[currentlyDisplayedProductIndex[0]].productImagePath);
  document.getElementById('second-product').setAttribute('src', product[currentlyDisplayedProductIndex[1]].productImagePath);
  document.getElementById('third-product').setAttribute('src', product[currentlyDisplayedProductIndex[2]].productImagePath);
}

/**
 * Convenience method to initialize product array with instances.
 */
function initializeProductSet() {
  product.push(new Product('bag', '../img/bag.jpg'));
  product.push(new Product('banana', '../img/banana.jpg'));
  product.push(new Product('bathroom', '../img/bathroom.jpg'));
  product.push(new Product('boots', '../img/boots.jpg'));
  product.push(new Product('breakfast', '../img/breakfast.jpg'));
  product.push(new Product('bubblegum', '../img/bubblegum.jpg'));
  product.push(new Product('chair', '../img/chair.jpg'));
  product.push(new Product('cthulhu', '../img/cthulhu.jpg'));
  product.push(new Product('dog-duck', '../img/dog-duck.jpg'));
  product.push(new Product('dragon', '../img/dragon.jpg'));
  product.push(new Product('pen', '../img/pen.jpg'));
  product.push(new Product('pet-sweep', '../img/pet-sweep.jpg'));
  product.push(new Product('scissors', '../img/scissors.jpg'));
  product.push(new Product('shark', '../img/shark.jpg'));
  product.push(new Product('sweep', '../img/sweep.png'));
  product.push(new Product('tauntaun', '../img/tauntaun.jpg'));
  product.push(new Product('unicorn', '../img/unicorn.jpg'));
  product.push(new Product('usb', '../img/usb.gif'));
  product.push(new Product('water-can', '../img/water-can.jpg'));
  product.push(new Product('wine-glass', '../img/wine-glass.jpg'));
}

function processUserProductChoice(event) {
  // always put this first, it will prevent the default behavior of the browser,
  //which is to refresh the page when the form is submitted
  event.preventDefault();

  //Determine which product was selected
  clickCount++;
  var selectedProductImageId = event.target.id;
  var index = -1;
  if (selectedProductImageId === 'first-product') {
    index = 0;
  }
  else if (selectedProductImageId === 'second-product') {
    index = 1;
  }
  else if (selectedProductImageId === 'third-product') {
    index = 2;
  }

  //tell the instance to update itself
  product[currentlyDisplayedProductIndex[index]].incrementSelectCount();

  //Until required number of selections has occured, determine next display
  //set and show to user
  if (clickCount < numberOfRequiredProductSelections) {
    selectNextProductSet();
    rendorProductChoice();
  }
  else {//stop listening for event and show results
    productChoicePanel.removeEventListener('click', processUserProductChoice);
    renderProductSurveyResults();
  }
}

//Render the results using chart js
function renderProductSurveyResults() {

  //Create the label and data sets for the chart, based on our product instance data
  var labels = [];
  var votes = [];
  for(var i=0; i<product.length; i++) {
    labels.push(product[i].productName);
    votes.push(product[i].selectCount);
  }

  var productSurveyResultChart = new Chart(surveyResultCanvas, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Product Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Add the event listener to the image panel
productChoicePanel.addEventListener('click', processUserProductChoice);

//Instantiate product objects
initializeProductSet();

//Initialize first set of 3 products to display
selectNextProductSet();

//Render the initial set of products for the user to view/choose
rendorProductChoice();