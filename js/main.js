// DOM Elements
const categorylist = document.querySelector(".category_nav_list");
const cart = document.getElementById("cart");
const nav_links = document.querySelector(".nav-links");


// Toggle Functions
function open_categ_list() {
  categorylist.classList.toggle("active");
}

function open_cart() {
  cart.classList.toggle("active");
}

function open_Menu() {
  nav_links.classList.toggle("active");
}

// Cart Functions
function hide_Checkout() {
  const product_cart = document.querySelector(".product-cart");
  const checkout_btn = document.getElementById("checkout-btn");
  const shop_now = document.querySelector(".shopnow");
  
  if (!checkout_btn || !shop_now) return;
  
  if (product_cart) {
    checkout_btn.style.display = "block";
    shop_now.classList.remove("active");
  } else {
    checkout_btn.style.display = "none";
    shop_now.classList.add("active");
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  UpdateCart();
}

function increasequantity(dataindex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[dataindex].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  UpdateCart();
}

function decreasequantity(dataindex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[dataindex].quantity > 1) {
    cart[dataindex].quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  UpdateCart();
}

function removefromcart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let removeproduct = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  UpdateCart();
  updateButtonState(removeproduct.id);
}

function updateButtonState(productid) {
  const allmatchingbutton = document.querySelectorAll(`.add-cart[data-id="${productid}"]`);
  allmatchingbutton.forEach((btns) => {
    btns.classList.remove("active");
    btns.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`;
  });
}

function UpdateCart() {
  const cartItemsContainer = document.getElementById("cart_items");
  const checkout_items = document.getElementById("checkout-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cartItemsContainer.innerHTML = "";
  
  // Checkout form elements
  const items_input = document.getElementById("items");
  const total_price_input = document.getElementById("total_price");
  const count_items_input = document.getElementById("count_items");

  if (checkout_items) {
    checkout_items.innerHTML = "";
    items_input.value = "";
    total_price_input.value = "";
    count_items_input.value = "";
  }

  let total_price = 0;
  let total_count = 0;

  cart.forEach((item, index) => {
    const total_price_item = item.price * item.quantity;
    total_price += total_price_item;
    total_count += item.quantity;

    // Update cart items display
    cartItemsContainer.innerHTML += `
      <div class="product-cart">
        <div class="product-cart-img">
          <img src="${item.img}" alt="" />
        </div>
        <div class="product-details">
          <div class="product-content">
            <p>${item.name}</p>
            <span class="product-price">$${total_price_item}</span>
            <div class="add-product">
              <span class="minus" data-index="${index}">-</span>
              <span class="count">${item.quantity}</span>
              <span class="plus" data-index="${index}">+</span>
            </div>
          </div>
          <button class="delete" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;

    // Update checkout page if exists
    if (checkout_items) {
      checkout_items.innerHTML += `
        <div class="product-cart">
          <div class="product-cart-img">
            <img src="${item.img}" alt="" />
          </div>
          <div class="product-details">
            <div class="product-content">
              <p>${item.name}</p>
              <span class="product-price">$${total_price_item}</span>
              <div class="add-product">
                <span class="minus" data-index="${index}">-</span>
                <span class="count">${item.quantity}</span>
                <span class="plus" data-index="${index}">+</span>
              </div>
            </div>
            <button class="delete" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
      
      items_input.value += `${item.name} ------ price: ${total_price_item} ---- count: ${item.quantity}\n`;
      total_price_input.value = total_price + 20;
      count_items_input.value = total_count;
    }
  });

  // Update cart summary
  const total_product_num = document.querySelector(".total_product_num");
  const total_cart_price = document.querySelector(".total_price");
  const cartcount = document.querySelector(".span-2");

  if (total_product_num) total_product_num.innerHTML = total_count;
  if (total_cart_price) total_cart_price.innerHTML = `$${total_price}`;
  if (cartcount) cartcount.innerHTML = total_count;

  // Update checkout summary if exists
  if (checkout_items) {
    const subtotal_checkout = document.querySelector(".subtotal_checkout");
    const total_checkout = document.querySelector(".total_checkout");
    if (subtotal_checkout) subtotal_checkout.innerHTML = `$ ${total_price}`;
    if (total_checkout) total_checkout.innerHTML = `$ ${total_price + 20}`;
  }

  // Add event listeners to new elements
  document.querySelectorAll(".plus").forEach((plus) => {
    plus.addEventListener("click", (e) => {
      increasequantity(e.target.getAttribute("data-index"));
    });
  });

  document.querySelectorAll(".minus").forEach((minus) => {
    minus.addEventListener("click", (e) => {
      decreasequantity(e.target.getAttribute("data-index"));
    });
  });

  document.querySelectorAll(".delete").forEach((del) => {
    del.addEventListener("click", (e) => {
      removefromcart(e.target.closest("button").getAttribute("data-index"));
    });
  });

  // Update checkout button visibility
  hide_Checkout();
}

// Initialize
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    document.querySelectorAll(".add-cart").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const product_id = event.target.getAttribute("data-id");
        const selectedproduct = data.find((product) => product.id == product_id);
        if (selectedproduct) {
          addToCart(selectedproduct);
          btn.classList.add("active");
          btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`;
        }
      });
    });
  })
  .catch((error) => console.error("Error loading products:", error));

// Initial cart update
UpdateCart();
