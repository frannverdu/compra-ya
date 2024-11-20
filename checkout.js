import createNavbar from "../components/navbar.js";
createNavbar();

window.onload = function () {
  updateCartButton();
};

function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce(
    (sum, cartItem) => sum + Number(cartItem.quantity),
    0
  );

  const cartButton = document.getElementById("carritoButton");
  if (cartButton) {
    cartButton.innerHTML = `
        Carrito (${totalItems})
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
      `;
  }
}

function renderItemList() {
  const productList = document.getElementById("itemsList");
  productList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("cart") || "[]");

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item product-item my-2 shadow-sm rounded border border-dark-subtle pb-2";
    listItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-2 col-sm-3 mb-2 mb-md-0">
                    <img src="${item.item.image}" alt="${item.item.name}" class="item-image img-fluid rounded shadow-sm ">
                </div>
                <div class="col-lg-5 col-md-4 col-sm-9 mb-2 mb-md-0 p-4">
                    <h5 class="mb-1">${item.item.name}</h5>
                    <p class="price mb-0">Precio: $${item.item.price}</p>
                </div>
                <div class="col-md-3 col-sm-12 mb-2 mb-md-0  px-4">
                    <div class="input-group">
                        <span class="input-group-text">Cantidad</span>
                        <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.item.id}">
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-12 text-md-end text-center px-4">
                    <button class="btn w-100 small btn-sm btn-danger delete-btn block" data-id="${item.item.id}">
                    Eliminar
                    </button>
                </div>
            </div>
        `;
    productList.appendChild(listItem);
  });
}

renderItemList();
