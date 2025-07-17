fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_items_sale2 = document.getElementById("swiper_items_sale2");
    const swiper_items_sale3 = document.getElementById("swiper_items_sale3");
    const swiper_items_sale4 = document.getElementById("swiper_items_sale4");

    data.forEach((product) => {
      if (product.old_price) {
        const isincart = cart.some((cartitem) => cartitem.id === product.id);

        const percent_sale = Math.floor(
          ((product.old_price - product.price) / product.old_price) * 100
        );
        swiper_items_sale.innerHTML += `
            <div class="swiper-slide product">
              <span class="sale-percent">${percent_sale}%</span>
              <div class="product-img">
                <img src="${product.img}" alt="" />
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="name-product">
                <a href="">${product.name}</a>
              </p>
              <div class="price">
                <p >$${product.price}</p>
                <span class="old-price">$${product.old_price}</span>
              </div>
              <div class="reacts">
                <button class="add-cart ${isincart ? "active" : ""}" data-id="${
          product.id
        }">
                  <i class="fa-solid fa-cart-shopping"></i>
                  ${isincart ? "Item in cart" : "add to cart"}
                </button>
                <a href=""><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
`;
      }
    });
    data.forEach((product) => {
      if (product.category == "electronics") {
        const isincart = cart.some((cartitem) => cartitem.id === product.id);
        const old_price_p = product.old_price
          ? `<span class="old-price" >$${product.old_price}</span>`
          : "";

        const percent_sale_div = product.old_price
          ? ` <span class="sale-percent">${Math.floor(
              ((product.old_price - product.price) / product.old_price) * 100
            )}%</span>`
          : "";

        swiper_items_sale2.innerHTML += `
            <div class="swiper-slide product">
              ${percent_sale_div}
              <div class="product-img">
                <img src="${product.img}" alt="" />
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="name-product">
                <a href="">${product.name}</a>
              </p>
              <div class="price">
                <p >$${product.price}</p>
                ${old_price_p}
              </div>
              <div class="reacts">
                <button class="add-cart ${isincart ? "active" : ""}" data-id="${
          product.id
        }">
                  <i class="fa-solid fa-cart-shopping"></i>
                  ${isincart ? "Item in cart" : "add to cart"}
                </button>
                <a href=""><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
`;
      }
    });
    data.forEach((product) => {
      if (product.category == "appliances") {
        const isincart = cart.some((cartitem) => cartitem.id === product.id);
        const old_price_p = product.old_price
          ? `<span class="old-price" >$${product.old_price}</span>`
          : "";

        const percent_sale_div = product.old_price
          ? ` <span class="sale-percent">${Math.floor(
              ((product.old_price - product.price) / product.old_price) * 100
            )}%</span>`
          : "";

        swiper_items_sale3.innerHTML += `
            <div class="swiper-slide product">
              ${percent_sale_div}
              <div class="product-img">
                <img src="${product.img}" alt="" />
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="name-product">
                <a href="">${product.name}</a>
              </p>
              <div class="price">
                <p >$${product.price}</p>
                ${old_price_p}
              </div>
              <div class="reacts">
                <button class="add-cart ${isincart ? "active" : ""}" data-id="${
          product.id
        }">
                  <i class="fa-solid fa-cart-shopping"></i>
                  ${isincart ? "Item in cart" : "add to cart"}
                </button>
                <a href=""><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
`;
      }
    });
    data.forEach((product) => {
      if (product.category == "mobiles") {
        const isincart = cart.some((cartitem) => cartitem.id === product.id);
        const old_price_p = product.old_price
          ? `<span class="old-price" >$${product.old_price}</span>`
          : "";

        const percent_sale_div = product.old_price
          ? ` <span class="sale-percent">${Math.floor(
              ((product.old_price - product.price) / product.old_price) * 100
            )}%</span>`
          : "";

        swiper_items_sale4.innerHTML += `
            <div class="swiper-slide product">
              ${percent_sale_div}
              <div class="product-img">
                <img src="${product.img}" alt="" />
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="name-product">
                <a href="">${product.name}</a>
              </p>
              <div class="price">
                <p >$${product.price}</p>
                ${old_price_p}
              </div>
              <div class="reacts">
                <button class="add-cart ${isincart ? "active" : ""}" data-id="${
          product.id
        }">
                  <i class="fa-solid fa-cart-shopping"></i>
                  ${isincart ? "Item in cart" : "add to cart"}
                </button>
                <a href=""><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
`;
      }
    });
  });
