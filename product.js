// create a function to access DOM
let returnElement = function (selector) {
  let element = document.querySelectorAll(selector);
  return element;
};

// create a function for remove cart items
let removeItemCard = function (event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
};

// create a function for calculate the effect of number on price
let quantityChanged = function (event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
};

// Create a function for add title,price and image to cart
let addToCartClicked = function (event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("title")[0].innerText;
  let price = shopItem.getElementsByClassName("price")[0].innerText;
  let srcImage = shopItem.getElementsByClassName("product-list-img")[0].src;

  addItemToCart(title, price, srcImage);
  updateCartTotal();
};

// Create a function for delete all items from cart
let purchaseClicked = function(event) {
  alert('Thank you for your purchase!')
    let cartItems = returnElement('.cart-items')[0]
    while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}

// Add an event for a purchase button to delete all items
returnElement(".btn-purchase")[0].addEventListener('click', purchaseClicked)


// Add an event for remove button to remove cart items
let removeCartItems = returnElement(".btn-danger");
for (let removeCartItem of removeCartItems) {
  let button = removeCartItem;
  button.addEventListener("click", removeItemCard);
}

// Add an event for increase/decrease amount of cart items
let quantityInputs = returnElement(".cart-quantity-input");
for (let quantityInput of quantityInputs) {
  let input = quantityInput;
  input.addEventListener("change", quantityChanged);
}

// Add an event for add add items to cart
let addToCartButtons = returnElement(".shop-add-button");
for (let addToCartButton of addToCartButtons) {
  let addButton = addToCartButton;
  addButton.addEventListener("click", addToCartClicked);
}

// create a function for updating price
let updateCartTotal = () => {
  let cartItemParent = returnElement(".cart-items")[0];
  var cartItemRows = returnElement(".cart-row");
  var total = 0;

  for (let cartItemRow of cartItemRows) {
    var cartRow = cartItemRow;
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  returnElement(".cart-total-price")[0].innerText = "$" + total;
};

// Create a function for add items in cart
let addItemToCart = function (title, price, srcImage) {
  let cartRows = document.createElement("div");
  cartRows.classList.add("row");
  cartRows.classList.add("text-center");
  cartRows.classList.add("cart-row");
  let cartItems = returnElement(".cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName(
    "cart-item-content-title"
  );
  for (let cartItemName of cartItemNames) {
    if (cartItemName.innerText == title) {
      alert("There is already added to the cart!");
      return;
    }
  }
  let cartRowContents = `
  <div class="col-md-4">
    <div class="cart-item-content">
      <img
        class="cart-item-content-image"
        src="${srcImage}"
        width="100"
        height="100"
      />
      <span class="cart-item-content-title">${title}</span>
    </div>
  </div>
  <div class="col-md-4" style="margin-top: 50px">
    <span class="cart-price cart-column">${price}</span>
  </div>
  <div class="col-md-4" style="margin-top: 30px">
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" />
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  </div>`;

  cartRows.innerHTML = cartRowContents;
  cartItems.append(cartRows);
  cartRows.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItemCard);
  cartRows.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
};
