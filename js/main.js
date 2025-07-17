let categorylist = document.querySelector(".category_nav_list");
function open_categ_list() {
  categorylist.classList.toggle("active");
}

let cart = document.getElementById("cart");
function open_cart() {
  cart.classList.toggle("active");
}
let nav_links = document.querySelector(".nav-links");
function open_Menu() {
  nav_links.classList.toggle("active");
}

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const addtocartBtns = document.querySelectorAll(".add-cart");

    addtocartBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const product_id = event.target.getAttribute("data-id");
        const selectedproduct = data.find(
          (product) => product.id == product_id
        );
        addToCart(selectedproduct);

        btn.classList.add("active");
        btn.innerHTML = `                  <i class="fa-solid fa-cart-shopping"></i>
                  Item In Cart`;
      });
    });
  });
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));

  UpdateCart();
}
function UpdateCart() {
  let cartItemsContainer = document.getElementById("cart_items");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  const checkout_items = document.getElementById("checkout-items");

  let items_input = document.getElementById("items");
  let total_price_input = document.getElementById("total_price");
  let count_items_input = document.getElementById("count_items");

  if (checkout_items) {
    checkout_items.innerHTML = "";

    items_input.value = "";
    total_price_input.value = "";
    count_items_input.value = "";
  }
  var total_price = 0;
  var total_count = 0;
  cart.forEach((item, index) => {
    let total_price_item = item.price * item.quantity;

    total_price += total_price_item;

    total_count += item.quantity;

    if (checkout_items) {
      items_input.value +=
        item.name +
        "     ------   " +
        "price : " +
        total_price_item +
        "  ---- " +
        "count : " +
        item.quantity +
        "\n";
      total_price_input.value = total_price + 20;
      count_items_input.value = total_count;
    }
    cartItemsContainer.innerHTML += `        <div class="product-cart">
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
            </div></div>
            <button class="delete" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
          
        </div>`;
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
            </div></div>
            <button class="delete" datza-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
          
        </div>
          `;
    }
  });



  let total_product_num = document.querySelector(".total_product_num");

  let total_cart_price = document.querySelector(".total_price");

  let cartcount = document.querySelector(".span-2");

  total_product_num.innerHTML = total_count;

  total_cart_price.innerHTML = `$${total_price}`;

  cartcount.innerHTML = total_count;
  if (checkout_items) {
    let subtotal_checkout = document.querySelector(".subtotal_checkout");
    let total_checkout = document.querySelector(".total_checkout");
    subtotal_checkout.innerHTML = `$ ${total_price}`;
    total_checkout.innerHTML = `$ ${total_price + 20}`;
  }
  let product_cart = document.querySelector(".product-cart");
  let checkout_btn = document.getElementById("checkout-btn");
  let shop_now = document.querySelector(".shopnow");
  if (product_cart) {
    checkout_btn.style.display = "block";
    shop_now.classList.remove("active");
  } else {
    checkout_btn.style.display = "none";
    shop_now.classList.add("active");
  }
  
  let plus = document.querySelectorAll(".plus");

  let minus = document.querySelectorAll(".minus");

  plus.forEach((plus) => {
    plus.addEventListener("click", (e) => {
      let itemindex = e.target.getAttribute(`data-index`);

      increasequantity(itemindex);
    });
  });
  minus.forEach((minus) => {
    minus.addEventListener("click", (e) => {
      let itemindex = e.target.getAttribute(`data-index`);

      decreasequantity(itemindex);
    });
  });
  let deleteproduct = document.querySelectorAll(".delete");

  deleteproduct.forEach((del) => {
    del.addEventListener("click", (e) => {
      const itemindex = e.target.closest("button").getAttribute("data-index");

      removefromcart(itemindex);
    });
  });
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
  let allmatchingbutton = document.querySelectorAll(
    `.add-cart[data-id="${productid}"]`
  );

  allmatchingbutton.forEach((btns) => {
    btns.classList.remove("active");

    btns.innerHTML = ` <i class="fa-solid fa-cart-shopping"></i>
                  add to cart`;
  });
}
UpdateCart();
